interface Props {
  color: string
  progress: number
  className?: string
}
const ProgressBar: React.FC<Props> = ({ color, className, progress }) => {
  console.log(Math.floor(progress * 100))

  return (
    <div className={`h-[3px] bg-transparent w-full ${className}`}>
      <div className={`h-full z-20  bg-${color}`} style={{ width: `${Math.floor(progress * 100)}%` }}></div>
      <div className='-m-px z-0 w-full h-px bg-raisin-30'></div>
    </div>
  )
}

export default ProgressBar
