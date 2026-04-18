#!/usr/bin/env node
const fs = require('fs');
const { storyboardFile } = require('./config');

const requiredFields = [
  'id',
  'title',
  'narrationText',
  'visualPrompt',
  'characterPrompt',
  'environmentPrompt',
  'transitionInstructions',
  'estimatedDurationSec',
];

const data = JSON.parse(fs.readFileSync(storyboardFile, 'utf8'));
const errors = [];

if (!Array.isArray(data.scenes) || data.scenes.length === 0) {
  errors.push('Storyboard has no scenes.');
}

let total = 0;
for (const [index, scene] of data.scenes.entries()) {
  for (const field of requiredFields) {
    if (!(field in scene)) {
      errors.push(`Scene ${index + 1} missing field: ${field}`);
    }
  }
  const d = scene.estimatedDurationSec;
  if (typeof d !== 'number' || d < 5 || d > 10) {
    errors.push(`Scene ${scene.id || index + 1} duration must be 5-10 sec, got ${d}`);
  }
  total += d;
}

if (total < 600 || total > 720) {
  errors.push(`Total duration must be 600-720 sec (10-12 min), got ${total} sec`);
}

if (errors.length) {
  console.error('Storyboard validation failed:\n- ' + errors.join('\n- '));
  process.exit(1);
}

console.log(`Storyboard valid: ${data.scenes.length} scenes, ${total}s (${(total / 60).toFixed(2)} min).`);
