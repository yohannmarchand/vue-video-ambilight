<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  intensity?: number
  spread?: number
  opacity?: number
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  intensity: 40,
  spread: 40,
  opacity: 0.8,
})

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const videoRef = computed<HTMLVideoElement | null>(() => containerRef.value?.getElementsByTagName('video')[0] ?? null)

let rafId: number | null = null

const canvasInset = computed(() => `-${props.spread}px`)
const canvasSize = computed(() => `calc(100% + ${props.spread * 2}px)`)
const canvasBlur = computed(() => `blur(${props.intensity}px)`)
const canvasOpacity = computed(() => props.opacity)

const drawFrame = () =>  {
  const video = videoRef.value
  const canvas = canvasRef.value
  if (!video || !canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx || canvas.width === 0 || canvas.height === 0) return
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
}

const loop = () => {
  drawFrame()
  rafId = requestAnimationFrame(loop)
}

const startLoop = () => {
  if (props.disabled) return
  stopLoop()
  loop()
}

function stopLoop() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

onMounted(startLoop)
onUnmounted(stopLoop)
</script>

<template>
  <div ref="containerRef" class="va-wrapper">
    <div class="va-slot">
      <slot />
    </div>
    <canvas
        v-if="!disabled"
        ref="canvasRef"
        class="va-canvas"
        :width="videoRef?.clientWidth"
        :height="videoRef?.clientHeight"
    />
  </div>
</template>

<style scoped>
.va-wrapper {
  position: relative;
  display: inline-block;
  overflow: visible;
}

.va-slot {
  position: relative;
  z-index: 1;
}

.va-canvas {
  position: absolute;
  inset: v-bind(canvasInset);
  width: v-bind(canvasSize);
  height: v-bind(canvasSize);
  filter: v-bind(canvasBlur);
  opacity: v-bind(canvasOpacity);
  z-index: 0;
  pointer-events: none;
}
</style>