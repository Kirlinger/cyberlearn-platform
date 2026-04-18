#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const config = require('./config');

function mustExist(file, message) {
  if (!fs.existsSync(file)) {
    throw new Error(`${message}: ${file}`);
  }
}

function run(cmd) {
  console.log(`\n$ ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

const storyboard = JSON.parse(fs.readFileSync(config.storyboardFile, 'utf8'));
fs.mkdirSync(config.outputDir, { recursive: true });
fs.mkdirSync(config.tempDir, { recursive: true });

const listPath = path.join(config.tempDir, 'scene-list.txt');
const lines = [];

for (const scene of storyboard.scenes) {
  const clip = path.join(config.rootDir, scene.assetPlaceholders.generatedClip);
  if (!fs.existsSync(clip)) {
    throw new Error(`Missing generated clip for ${scene.id}: ${clip}`);
  }
  lines.push(`file '${clip.replace(/'/g, "'\\''")}'`);
}

fs.writeFileSync(listPath, lines.join('\n'));

const concatOutput = path.join(config.tempDir, 'concatenated-scenes.mp4');
run(`ffmpeg -y -f concat -safe 0 -i "${listPath}" -c copy "${concatOutput}"`);

const narrationTrack = path.join(config.narrationDir, 'full-narration.wav');
const musicTrack = config.musicFile;
const captionsFile = path.join(config.captionsDir, 'haitian-revolution.srt');

mustExist(narrationTrack, 'Missing narration track');
mustExist(musicTrack, 'Missing background music');
mustExist(captionsFile, 'Missing captions file');

const mixedAudio = path.join(config.tempDir, 'mixed-audio.wav');
run(
  `ffmpeg -y -i "${narrationTrack}" -i "${musicTrack}" ` +
    `-filter_complex "[1:a]volume=0.20,aloop=loop=-1:size=2e+09[m];[m][0:a]sidechaincompress=threshold=0.03:ratio=12:attack=20:release=400[bgduck];[0:a][bgduck]amix=inputs=2:weights=1 0.6:normalize=0[a]" ` +
    `-map "[a]" -c:a pcm_s16le "${mixedAudio}"`,
);

const finalOutput = path.join(config.outputDir, 'haitian-revolution-final.mp4');
run(
  `ffmpeg -y -i "${concatOutput}" -i "${mixedAudio}" -i "${captionsFile}" ` +
    `-map 0:v:0 -map 1:a:0 -map 2:0 -c:v copy -c:a aac -b:a 192k -c:s mov_text ` +
    `-shortest "${finalOutput}"`,
);

console.log(`\nFinal documentary build complete: ${finalOutput}`);
