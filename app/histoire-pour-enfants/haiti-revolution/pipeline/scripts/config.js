const path = require('path');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
  rootDir,
  storyboardFile: path.join(rootDir, 'storyboard', 'haitian-revolution.storyboard.json'),
  scenesDir: path.join(rootDir, 'assets', 'generated', 'scenes'),
  narrationDir: path.join(rootDir, 'assets', 'generated', 'voiceover'),
  captionsDir: path.join(rootDir, 'assets', 'generated', 'captions'),
  musicFile: path.join(rootDir, 'assets', 'local', 'music', 'haiti-score.wav'),
  outputDir: path.join(rootDir, 'output'),
  tempDir: path.join(rootDir, 'assets', 'generated', 'temp'),
  fps: 24,
};
