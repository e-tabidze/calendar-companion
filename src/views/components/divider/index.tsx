interface Props {
  className?: string
}
const Divider = ({ className }: Props) => {
  return <div className={`w-full h-px bg-raisin-10 ${className}`} />
}

export default Divider
