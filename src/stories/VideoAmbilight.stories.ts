import type { Meta, StoryObj } from '@storybook/vue3'
import VideoAmbilight from '../components/VideoAmbilight.vue'

const SAMPLE_VIDEO = 'https://ak.picdn.net/shutterstock/videos/1053720152/preview/stock-footage-speed-of-digital-lights-neon-glowing-rays-in-motion-into-digital-technologic-tunnels-d-render.webm'

const meta: Meta<typeof VideoAmbilight> = {
  title: 'Components/VideoAmbilight',
  component: VideoAmbilight,
  argTypes: {
    intensity: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    spread: { control: { type: 'range', min: 0, max: 120, step: 4 } },
    opacity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    src: { control: 'text', description: 'Video URL' },
  },
  args: {
    intensity: 40,
    spread: 40,
    opacity: 0.8,
    disabled: false,
    src: SAMPLE_VIDEO,
  },
}

export default meta
type Story = StoryObj<typeof VideoAmbilight & { src: string }>

export const Default: Story = {
  args: {
    intensity: 43,
    opacity: 0.1,
    spread: 64,
  },
  render: (args) => ({
    components: { VideoAmbilight },
    setup() { return { args } },
    template: `
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #111;">
        <VideoAmbilight v-bind="args">
          <video :src="args.src" autoplay controls width="600" loop />
        </VideoAmbilight>
      </div>
    `,
  }),
}
