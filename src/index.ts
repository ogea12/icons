import { kebabCase } from 'change-case'
import { createElement, forwardRef } from 'react'

import type { Icon as IconComponent, IconNode, IconProps } from './types.js'

import Icon from './icon.js'
import { mergeClasses } from './utils.js'

/**
 * Creates an icon component.
 *
 * @param iconName - The name of the icon.
 * @param iconNode - The array of nodes defining the icon's structure.
 * @returns A React component that renders the icon.
 */
export function createIcon(iconName: string, iconNode: IconNode[]): IconComponent {
  const Component = forwardRef<SVGSVGElement, IconProps>(({ className, ...rest }, ref) => {
    return createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`icon-${kebabCase(iconName)}`, className),
      ...rest,
    })
  })

  Component.displayName = `${iconName}`

  return Component
}
