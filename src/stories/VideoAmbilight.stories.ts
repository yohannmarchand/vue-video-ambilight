import type { Meta, StoryObj } from '@storybook/vue3'
import VideoAmbilight from '../components/VideoAmbilight.vue'

const SAMPLE_VIDEO = 'https://ak.picdn.net/shutterstock/videos/1053720152/preview/stock-footage-speed-of-digital-lights-neon-glowing-rays-in-motion-into-digital-technologic-tunnels-d-render.webm'

const meta: Meta<typeof VideoAmbilight> = {
  title: 'Components/VideoAmbilight',
  component: VideoAmbilight,
  tags: ['autodocs'],
  args: {
    intensity: 40,
    spread: 40,
    opacity: 0.8,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof VideoAmbilight>

export const Default: Story = {
  render: (args) => ({
    components: { VideoAmbilight },
    setup() { return { args, src: SAMPLE_VIDEO } },
    template: `
      <div style="width: 100%; display: flex; align-items: center; justify-content: center; background: #111;">
        <VideoAmbilight>
          <video :src="src" autoplay width="600" loop />
        </VideoAmbilight>
      </div>
    `,
  }),
}
