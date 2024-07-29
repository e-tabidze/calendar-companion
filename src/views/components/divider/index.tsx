interface Props {
    className?: string
    vertical?: boolean
  }
  const Divider: React.FC<Props> = ({ className, vertical = false }) => {
    return <div className={`${vertical ? 'w-px h-full ' : 'w-full h-px'}  bg-raisin-10 ${className}`} />
  }
  
  export default Divider
  