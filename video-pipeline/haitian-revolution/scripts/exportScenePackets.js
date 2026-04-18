#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { storyboardFile, outputDir } = require('./config');

const storyboard = JSON.parse(fs.readFileSync(storyboardFile, 'utf8'));
fs.mkdirSync(outputDir, { recursive: true });

const packets = storyboard.scenes.map((scene) => ({
  sceneId: scene.id,
  title: scene.title,
  durationSec: scene.estimatedDurationSec,
  prompts: {
    visual: scene.visualPrompt,
    character: scene.characterPrompt,
    environment: scene.environmentPrompt,
  },
  transition: scene.transitionInstructions,
  narrationText: scene.narrationText,
  expectedOutputClip: scene.assetPlaceholders.generatedClip,
}));

const jsonPath = path.join(outputDir, 'scene-generation-packets.json');
const jsonlPath = path.join(outputDir, 'scene-generation-packets.jsonl');

fs.writeFileSync(jsonPath, JSON.stringify(packets, null, 2));
fs.writeFileSync(jsonlPath, packets.map((p) => JSON.stringify(p)).join('\n'));

console.log(`Wrote ${packets.length} packets:`);
console.log(`- ${jsonPath}`);
console.log(`- ${jsonlPath}`);
