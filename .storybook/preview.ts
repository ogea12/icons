import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    controls: {
      expanded: true,
    },
    layout: 'centered',
  },
  argTypes: {
    size: {
      description: 'The size of the icon.',
      control: 'number',
    },
    color: {
      description: 'The color of the icon.',
      control: 'color',
    },
    primaryColor: {
      description: 'The primary color of the icon only if `color` is not set.',
      control: 'color',
      if: { arg: 'color', exists: false },
    },
    secondaryColor: {
      description: 'The secondary color of the icon only if `color` is not set.',
      control: 'color',
      if: { arg: 'color', exists: false },
    },
  },
}

export default preview
