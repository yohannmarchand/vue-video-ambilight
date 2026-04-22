# vue-video-ambilight

A Vue 3 component that adds an ambilight glow effect around a video element. The effect mirrors the video's colors onto a blurred canvas placed behind the video, creating an ambient lighting illusion.

## Installation

```bash
npm install vue-video-ambilight
```

## Usage

```vue
<script setup>
import { VideoAmbilight } from 'vue-video-ambilight'
</script>

<template>
  <VideoAmbilight :intensity="40" :spread="40" :opacity="0.8">
    <video src="/my-video.mp4" controls autoplay loop />
  </VideoAmbilight>
</template>
```

## Props

| Prop        | Type      | Default | Description                                  |
|-------------|-----------|---------|----------------------------------------------|
| `intensity` | `number`  | `40`    | Blur radius of the ambilight canvas (px)     |
| `spread`    | `number`  | `40`    | How far the glow extends beyond the video (px) |
| `opacity`   | `number`  | `0.8`   | Opacity of the ambilight effect (0–1)        |
| `disabled`  | `boolean` | `false` | Disables the effect                          |

## Development

```bash
npm install
npm run dev          # Storybook on http://localhost:6006
npm run build        # Build the library
npm run build:storybook  # Build Storybook as static site
npm run type-check   # TypeScript type checking
```

## License

MIT
