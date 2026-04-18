#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { storyboardFile, captionsDir } = require('./config');

function formatTime(seconds) {
  const ms = Math.floor((seconds % 1) * 1000);
  const total = Math.floor(seconds);
  const s = total % 60;
  const m = Math.floor(total / 60) % 60;
  const h = Math.floor(total / 3600);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
}

function wrapText(text, maxLen = 52) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxLen) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur += ` ${w}`;
    }
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines.slice(0, 2).join('\n');
}

const storyboard = JSON.parse(fs.readFileSync(storyboardFile, 'utf8'));
fs.mkdirSync(captionsDir, { recursive: true });

let t = 0;
const entries = [];
storyboard.scenes.forEach((scene, i) => {
  const start = t;
  const end = t + scene.estimatedDurationSec;
  entries.push(`${i + 1}\n${formatTime(start)} --> ${formatTime(end)}\n${wrapText(scene.narrationText)}\n`);
  t = end;
});

const srt = entries.join('\n');
const out = path.join(captionsDir, 'haitian-revolution.srt');
fs.writeFileSync(out, srt);
console.log(`Captions written: ${out}`);
