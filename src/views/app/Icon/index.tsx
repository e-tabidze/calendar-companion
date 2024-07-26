import React, { useState, useEffect } from 'react'

type SvgProps = {
  svgPath: string
  width?: number | string
  height?: number | string
  color?: string
  className?: string
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
}

const Icon: React.FC<SvgProps> = ({ svgPath, width = 'auto', height = 'auto', className, color, onClick }) => {
  const [SvgComponent, setSvgComponent] = useState<React.FC<React.SVGProps<SVGSVGElement>> | null>(null)

  useEffect(() => {
    import(`public/icons/${svgPath}.svg`)
      .then(module => {
        setSvgComponent(() => module.default)
      })
      .catch(error => {
        console.error('Error loading SVG:', error)
      })
  }, [svgPath])

  if (!SvgComponent) {
    return null
  }

  return <SvgComponent width={width} height={height} className={className} fill={color} onClick={onClick} />
}

export default Icon
