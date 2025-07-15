import { camelCase, pascalCase, snakeCase } from 'change-case'
import { randomUUID } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { EOL } from 'node:os'
import { basename, join } from 'node:path'
import { parse } from 'svg-parser'

import defaultAttributes from '../src/default_attributes.js'

const iconsPath = join('icons')
const compiledIconsPath = join('src', iconsPath)

const icons = readdirSync(iconsPath).filter((icon) => icon.endsWith('.svg'))
const iconsIndex = []

icons.forEach((icon) => {
  const name = basename(icon, '.svg')
  const snakeCaseName = snakeCase(name)
  const pascalCaseName = pascalCase(name)

  const content = readFileSync(join(iconsPath, icon), 'utf-8')
  const base64 = Buffer.from(content).toString('base64')

  const parsedContent = parse(content)
  const parsedIcon = []

  parsedContent.children[0].children.forEach((child) => {
    parsedIcon.push(renderIconNode(child))
  })

  writeFileSync(
    join(compiledIconsPath, `${snakeCaseName}.ts`),
    `
    import { createIcon } from '..'

    /**
     * @component @name ${pascalCaseName}
     * @description SVG icon component, renders SVG Element with children.
     *
     * @preview ![img](data:image/svg+xml;base64,${base64})
     *
     * @param props - Icons props and any valid SVG attribute
     * @returns JSX Element
     */
    const ${pascalCaseName} = createIcon('${pascalCaseName}', ${JSON.stringify(parsedIcon)})

    export { ${pascalCaseName} as ${pascalCaseName}Icon }
    `
  )

  writeFileSync(
    join(compiledIconsPath, `${snakeCaseName}.stories.ts`),
    `
    import type { Meta, StoryObj } from '@storybook/react-vite'
    
    import { ${pascalCaseName}Icon } from './${snakeCaseName}'

    const meta = {
      title: 'Icons/${pascalCaseName}Icon',
      component: ${pascalCaseName}Icon,
      argTypes: {
        color: {
          control: 'color',
        },
        primaryColor: {
          control: 'color',
          if: { arg: 'color', exists: false },
        },
        secondaryColor: {
          control: 'color',
          if: { arg: 'color', exists: false },
        },
      },
    } satisfies Meta<typeof ${pascalCaseName}Icon>

    export const Default: StoryObj<typeof meta> = {
      args: {
        size: 100,
        color: '#181818',
      },
    }

    export default meta
    `
  )

  iconsIndex.push(`export * from './${snakeCaseName}'`)
})

// Generate index file that exports all icon components
writeFileSync(join(compiledIconsPath, 'index.ts'), iconsIndex.join(EOL))

/**
 * Transforms an SVG node into a standardized format for the icon component.
 *
 * @param {import('svg-parser').Node} node - The SVG node to transform.
 * @returns A transformed node with standardized properties.
 */
function renderIconNode(node) {
  const {
    tagName,
    children,
    properties: { stroke, ...properties },
  } = node

  const parsedProperties = Object.entries(properties).reduce((acc, [key, value]) => {
    const name = camelCase(key)

    // Filtering out default attributes to minimize output size and improve
    // efficiency. Only including attributes that differ from default values.
    if (!defaultAttributes[name] || defaultAttributes[name] !== value) {
      acc[name] = value
    }

    return acc
  }, {})

  return {
    elementName: tagName,
    stroke: stroke === '#181818' ? 'currentColor' : undefined,
    children: children.length ? children.map((child) => renderIconNode(child)) : undefined,
    ...parsedProperties,
    key: randomUUID(),
  }
}
