import type {
  ClassAttributes,
  ForwardRefExoticComponent,
  Key,
  ReactSVG,
  SVGAttributes as ReactSVGAttributes,
  RefAttributes,
  SVGProps,
} from 'react'

/**
 * Represents a node in the SVG icon structure. A key is required to
 * uniquely identify this node in the React component tree.
 */
export interface IconNode extends Omit<NodeAttributes, 'children'> {
  elementName: keyof ReactSVG
  children?: IconNode[]
  key: Key
}

/**
 * Represents a partial set of SVG properties that can be applied to
 * an SVG element.
 */
type SVGAttributes = Partial<SVGProps<SVGSVGElement>>

/**
 * Combines reference attributes with SVG attributes.
 */
type ElementAttributes = RefAttributes<SVGSVGElement> & SVGAttributes

/**
 * Defines the base attributes that can be applied to any SVG element.
 */
type NodeAttributes = ClassAttributes<SVGElement> & ReactSVGAttributes<SVGElement>

/**
 * Defines the properties that can be passed to an icon component.
 */
export interface IconProps extends ElementAttributes {
  size?: string | number
}

/**
 * Represents a fully-typed icon component with forwarded refs.
 * Ensures that icon components can properly receive refs while
 * maintaining type safety.
 */
export type Icon = ForwardRefExoticComponent<Omit<IconProps, 'ref'> & RefAttributes<SVGSVGElement>>
