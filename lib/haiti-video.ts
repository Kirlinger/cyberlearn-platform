import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const pipelineDir = path.resolve(process.cwd(), 'app/histoire-pour-enfants/haiti-revolution/pipeline');
const storyboardPath = path.join(pipelineDir, 'storyboard', 'haitian-revolution.storyboard.json');
const finalVideoPath = path.join(pipelineDir, 'output', 'haitian-revolution-final.mp4');

export type BuildMode = 'prepare' | 'full';

export function getPipelinePaths() {
  return { pipelineDir, storyboardPath, finalVideoPath };
}

export function getPipelineStatus() {
  const storyboard = JSON.parse(fs.readFileSync(storyboardPath, 'utf8')) as {
    scenes: Array<{ id: string; assetPlaceholders: { generatedClip: string; narrationAudio: string } }>;
    project: { targetDurationSec: number; sceneCount: number };
  };

  const missingSceneClips = storyboard.scenes
    .map((scene) => path.join(pipelineDir, scene.assetPlaceholders.generatedClip))
    .filter((clipPath) => !fs.existsSync(clipPath))
    .map((clipPath) => path.relative(pipelineDir, clipPath));

  const missingNarrations = storyboard.scenes
    .map((scene) => path.join(pipelineDir, scene.assetPlaceholders.narrationAudio))
    .filter((audioPath) => !fs.existsSync(audioPath))
    .map((audioPath) => path.relative(pipelineDir, audioPath));

  return {
    sceneCount: storyboard.project.sceneCount,
    targetDurationSec: storyboard.project.targetDurationSec,
    finalVideoExists: fs.existsSync(finalVideoPath),
    missingSceneClips,
    missingNarrations,
    finalVideoPath: path.relative(process.cwd(), finalVideoPath),
  };
}

function runNpmScript(script: string) {
  return new Promise<string>((resolve, reject) => {
    const child = spawn('npm', ['run', script], { cwd: pipelineDir, env: process.env });
    let log = '';

    child.stdout.on('data', (buf) => {
      const text = buf.toString();
      log += text;
    });
    child.stderr.on('data', (buf) => {
      const text = buf.toString();
      log += text;
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve(log);
      } else {
        reject(new Error(log || `npm run ${script} failed with code ${code}`));
      }
    });
  });
}

export async function runPipelineBuild(mode: BuildMode) {
  const logs: Record<string, string> = {};
  logs.pipelineAll = await runNpmScript('pipeline:all');

  if (mode === 'full') {
    logs.narrationBuild = await runNpmScript('narration:build');
    logs.videoAssemble = await runNpmScript('video:assemble');
  }

  return logs;
}
