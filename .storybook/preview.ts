import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /.*color.*$/i,
        number: /.*size.*$/i,
      },
    },
    layout: 'centered',
  },
}

export default preview
