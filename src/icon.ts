import type { ReactSVGElement } from 'react'

import { createElement, forwardRef } from 'react'

import type { IconNode, IconProps } from './types.js'

import defaultAttributes from './default_attributes.js'
import { mergeClasses } from './utils.js'

interface IconComponentProps extends IconProps {
  iconNode: IconNode[]
}

/**
 * Icon component that renders SVG nodes with configurable properties.
 */
const Icon = forwardRef<SVGSVGElement, IconComponentProps>(
  (
    { children, color, primaryColor, secondaryColor, iconNode, size = 24, className, ...rest },
    ref
  ) => {
    return createElement(
      'svg',
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        color: primaryColor || color || 'currentColor',
        stroke: secondaryColor || color || 'currentColor',
        className: mergeClasses('icon', className),
        ...rest,
      },
      [...iconNode.map(renderIconSvg), ...(Array.isArray(children) ? children : [children])]
    )
  }
)

/**
 * Renders an individual node from the icon structure.
 *
 * @param node - The icon node to transform.
 * @returns A rendered SVG element corresponding to the node.
 */
function renderIconSvg(node: IconNode): ReactSVGElement {
  const { elementName, children, ...attrs } = node

  return createElement(elementName, attrs, children?.map(renderIconSvg))
}

export default Icon
