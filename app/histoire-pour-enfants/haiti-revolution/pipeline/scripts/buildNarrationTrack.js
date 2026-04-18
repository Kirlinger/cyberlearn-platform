#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const config = require('./config');

function probeDuration(file) {
  const out = execSync(
    `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${file}"`,
  )
    .toString()
    .trim();
  return Number(out);
}

const storyboard = JSON.parse(fs.readFileSync(config.storyboardFile, 'utf8'));
fs.mkdirSync(config.tempDir, { recursive: true });
fs.mkdirSync(config.narrationDir, { recursive: true });

const normalizedFiles = [];

for (const scene of storyboard.scenes) {
  const raw = path.join(config.rootDir, scene.assetPlaceholders.narrationAudio);
  if (!fs.existsSync(raw)) {
    throw new Error(`Missing narration audio for ${scene.id}: ${raw}`);
  }

  const durationTarget = scene.estimatedDurationSec;
  const rawDuration = probeDuration(raw);
  const out = path.join(config.tempDir, `${scene.id}-narration-aligned.wav`);

  if (rawDuration >= durationTarget) {
    execSync(`ffmpeg -y -i "${raw}" -t ${durationTarget} -ar 48000 -ac 2 "${out}"`, { stdio: 'inherit' });
  } else {
    const pad = (durationTarget - rawDuration).toFixed(3);
    execSync(
      `ffmpeg -y -i "${raw}" -f lavfi -t ${pad} -i anullsrc=r=48000:cl=stereo ` +
        `-filter_complex "[0:a][1:a]concat=n=2:v=0:a=1[a]" -map "[a]" "${out}"`,
      { stdio: 'inherit' },
    );
  }

  normalizedFiles.push(out);
}

const listFile = path.join(config.tempDir, 'narration-list.txt');
fs.writeFileSync(listFile, normalizedFiles.map((f) => `file '${f}'`).join('\n'));

const fullNarration = path.join(config.narrationDir, 'full-narration.wav');
execSync(`ffmpeg -y -f concat -safe 0 -i "${listFile}" -c copy "${fullNarration}"`, { stdio: 'inherit' });

console.log(`Built narration master track: ${fullNarration}`);
