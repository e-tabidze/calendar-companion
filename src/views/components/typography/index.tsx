// ** Tailwind Styled
import tw from 'tailwind-styled-components'

// ** Typography Component that implements the types in Figma spec.
// Different type variants can be set using props (Heading 1, 2, 3... = h1, h2, h3...)

type TypographyProps = (
  | {
      type: 'h1' | 'h2' | 'h3' | 'subtitle'
      weight?: never
      color?: 'dark' | 'light'
    }
  | {
      type: 'h4' | 'button'
      weight?: 'medium' | 'normal'
      color: 'dark' | 'light'
    }
  | {
      type: 'h5'
      weight?: 'medium' | 'normal'
      color?: never
    }
  | {
      type: 'body'
      color: 'dark' | 'light'
      weight?: never
    }
  | {
      type: 'body'
      color?: 'dark' | 'light'
      weight?: never
    }
) & {
  children: any
  className?: string
  onClick?: () => void
}

const Typography = ({ type, weight, color, children, className, onClick }: TypographyProps) => {
  switch (type) {
    case 'h1':
      return (
        <H1Typography className={className} onClick={onClick}>
          {children}
        </H1Typography>
      )
    case 'h2':
      return (
        <H2Typography className={className} onClick={onClick}>
          {children}
        </H2Typography>
      )
    case 'h3':
      return (
        <H3Typography className={className} onClick={onClick}>
          {children}
        </H3Typography>
      )
    case 'h4':
      return (
        <H4Typography weight={weight} color={color} className={className} onClick={onClick}>
          {children}
        </H4Typography>
      )
    case 'h5':
      return (
        <H5Typography weight={weight} className={className} onClick={onClick}>
          {children}
        </H5Typography>
      )
    case 'subtitle':
      return (
        <SubtitleTypography color={color} className={className} onClick={onClick}>
          {children}
        </SubtitleTypography>
      )
    case 'body':
      return (
        <BodyTypography color={color} className={className} onClick={onClick}>
          {children}
        </BodyTypography>
      )
    case 'button':
      return (
        <ButtonTypography weight={weight} color={color} className={className} onClick={onClick}>
          {children}
        </ButtonTypography>
      )
  }
}

interface TextComponent extends React.HTMLAttributes<HTMLElement> {
  children: any
  weight?: 'medium' | 'normal'
  color?: 'dark' | 'light'
  className?: string
}

const H1Typography = tw.h1<TextComponent>`${(props: any) =>
  props.className ? props.className : ''} font-bold text-2xl text-secondary-title-100`

const H2Typography = tw.h2<TextComponent>`${(props: any) =>
  props.className ? props.className : ''} font-bold text-3lg text-secondary-title-100`

const H3Typography = tw.h3<TextComponent>`${(props: any) =>
  props.className ? props.className : ''}font-normal text-2lg text-base-100`

const H4Typography = tw.h4<TextComponent>`
${(props: any) => (props.className ? props.className : '')}
${(props: any) => (props.weight === 'medium' ? 'font-medium' : 'font-normal')}
${(props: any) => (props.color === 'light' ? 'text-white' : 'text-secondary-title-100')}
text-3md
`
const H5Typography = tw.h5<TextComponent>`
${(props: any) => (props.className ? props.className : '')}
${(props: any) => (props.className ? props.className : '')}
${(props: any) => (props.weight === 'medium' ? 'font-medium' : 'font-normal')}
text-base-100
text-md
`

const SubtitleTypography = tw.p<TextComponent>`
${(props: any) => (props.className ? props.className : '')}
${(props: any) => (props.color === 'light' ? 'text-raisin-50' : 'text-raisin-130')}
font-normal text-2sm`

const BodyTypography = tw.p<TextComponent>`whitespace-normal font-normal text-sm 
${(props: any) => (props.color === 'light' ? 'text-raisin-50' : 'text-raisin-130')}
${(props: any) => (props.className ? props.className : '')}
`

const ButtonTypography = tw.span<TextComponent>`
${(props: any) => (props.className ? props.className : '')}
${(props: any) => (props.weight === 'normal' ? 'font-normal' : 'font-light')}
${(props: any) => (props.color === 'light' ? 'text-white' : 'text-raisin-100')}
text-2sm
`

export default Typography
