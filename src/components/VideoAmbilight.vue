<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, watch, onBeforeMount} from 'vue'

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
  disabled: false,
})

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const videoRef = computed<HTMLVideoElement | null>(() => containerRef.value?.getElementsByTagName('video')[0] ?? null)

let rafId: number | null = null
let resizeObserver: ResizeObserver | null = null

function syncCanvasSize() {
  const video = videoRef.value
  const canvas = canvasRef.value
  if (!video || !canvas) return
  const w = video.clientWidth
  const h = video.clientHeight
  if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
    canvas.width = w
    canvas.height = h
  }
}

function drawFrame() {
  const video = videoRef.value
  const canvas = canvasRef.value
  if (!video || !canvas) return
  syncCanvasSize()
  const ctx = canvas.getContext('2d')
  if (!ctx || canvas.width === 0 || canvas.height === 0) return
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
}

function loop() {
  drawFrame()
  rafId = requestAnimationFrame(loop)
}

function startLoop() {
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
onBeforeMount(stopLoop)

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) {
      stopLoop()
    } else if (videoRef.value && !videoRef.value.paused) {
      startLoop()
    }
  },
)

onMounted(() => {
  if (videoRef.value) {
    resizeObserver = new ResizeObserver(syncCanvasSize)
    resizeObserver.observe(videoRef.value)
  }
})

onUnmounted(() => {
  stopLoop()
  resizeObserver?.disconnect()
})

const canvasStyle = computed(() => ({
  position: 'absolute' as const,
  inset: `-${props.spread}px`,
  width: `calc(100% + ${props.spread * 2}px)`,
  height: `calc(100% + ${props.spread * 2}px)`,
  filter: `blur(${props.intensity}px)`,
  opacity: props.opacity,
  zIndex: 0,
  pointerEvents: 'none' as const,
}))
</script>

<template>
  <div
      ref="containerRef"
      style="position: relative; display: inline-block; overflow: visible;"
  >
    <div style="position: relative; z-index: 1;">
      <slot />
    </div>
    <canvas v-if="!disabled" ref="canvasRef" :style="canvasStyle" />
  </div>
</template>
