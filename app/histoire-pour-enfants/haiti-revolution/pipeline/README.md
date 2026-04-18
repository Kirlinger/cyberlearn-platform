# Haitian Revolution Documentary Pipeline (10–12 min)

Production-ready Node.js + FFmpeg pipeline for a serious historical reconstruction of the Haitian Revolution (1791–1804).

## What this delivers

- 70-scene storyboard at **9–10 seconds each** (~10m 54s total).
- Strict chronological progression from pre-1791 conditions to 1804 independence.
- Scene-level metadata:
  - title
  - narration text
  - visual prompt
  - character prompt
  - environment prompt
  - transition instructions
  - duration estimate
- Placeholder mapping for generated clips and local assets.
- SRT caption generation.
- Narration timing alignment (per-scene audio padded/truncated to scene duration).
- Final FFmpeg assembly:
  - concatenates all scene clips
  - mixes narration + ducked music
  - muxes subtitle track into final MP4

## Folder structure

```text
app/histoire-pour-enfants/haiti-revolution/pipeline/
  assets/
    generated/
      scenes/           # scene-001.mp4 ... scene-070.mp4 (generated clips)
      voiceover/        # per-scene narration wav + full-narration.wav
      captions/         # generated .srt captions
      temp/             # ffmpeg intermediates
    local/
      images/           # fallback stills (optional)
      broll/            # optional inserts
      music/
        haiti-score.wav # background score placeholder
  docs/
    historical-research.md
  output/
    haitian-revolution-final.mp4
  scripts/
    buildStoryboard.js
    validateStoryboard.js
    exportScenePackets.js
    generateCaptions.js
    buildNarrationTrack.js
    assembleFinalVideo.js
    config.js
  storyboard/
    haitian-revolution.storyboard.json
```

## Quick start

```bash
cd app/histoire-pour-enfants/haiti-revolution/pipeline
npm run pipeline:all
```

This builds and validates storyboard data, exports scene prompt packets, and writes captions.

## Full production run

1. Generate scene clips externally (AI video or live-action edit pipeline) using `output/scene-generation-packets.json`.
2. Place clips at:
   - `assets/generated/scenes/scene-001.mp4`
   - ...
   - `assets/generated/scenes/scene-070.mp4`
3. Render narration per scene into:
   - `assets/generated/voiceover/scene-001.wav`
   - ...
4. Add background score file:
   - `assets/local/music/haiti-score.wav`
5. Build narration master track:

```bash
npm run narration:build
```

6. Assemble final film:

```bash
npm run video:assemble
```

Final output:
- `output/haitian-revolution-final.mp4`

## Website integration

- UI page: `/histoire-pour-enfants`
- Status API: `/api/histoire-pour-enfants/haiti-revolution/status`
- Build API: `/api/histoire-pour-enfants/haiti-revolution/build`
- Download API: `/api/histoire-pour-enfants/haiti-revolution/download`

## Historical tone guardrails

- Documentary seriousness only.
- No cartoon visuals.
- No fantasy effects.
- No modern military equipment.
- Maintain consistent character design for:
  - Toussaint Louverture
  - Jean-Jacques Dessalines
  - Henri Christophe
