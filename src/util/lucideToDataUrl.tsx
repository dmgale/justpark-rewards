import { type LucideIcon } from 'lucide-react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'

/**
 * Converts a Lucide React icon to a data URL for use in deck.gl IconLayer
 * @param Icon - Lucide icon component
 * @param color - Stroke/fill color for the icon
 * @param size - Icon size in pixels
 * @param strokeWidth - Stroke width (default: 2)
 * @param fill - Whether to fill the icon (default: false)
 * @returns Data URL string
 */
export function lucideToDataURL(
  Icon: LucideIcon,
  color: string = '#000000',
  size: number = 24,
  strokeWidth: number = 2,
  fill: boolean = false
): string {
  const svg = renderToStaticMarkup(
    createElement(Icon, { 
      size, 
      color, 
      strokeWidth,
      fill: fill ? color : 'none'
    })
  )
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}