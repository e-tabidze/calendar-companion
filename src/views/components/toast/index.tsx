import Link from 'next/link'
import Typography from '../typography'

interface Props {
  type: 'success' | 'warning' | 'error' | 'info'
  title: string | any
  description?: string
  path?: string
  permalink?: string
  onClose?: () => void
  className?: string
}

const Toast: React.FC<Props> = ({ type, title, description, path, permalink, className }) => {
  return (
    <div
      className={`${
        type === 'success'
          ? 'bg-green-10 border border-green-100'
          : type === 'warning'
          ? 'bg-yellow-10 border border-yellow-100'
          : type === 'error'
          ? 'bg-red-10 border border-red-100'
          : type === 'info'
          ? 'bg-blue-10 border border-blue-100'
          : ''
      } px-6 py-4 rounded ${className}`}
    >
      <Typography type='subtitle' className='text-raisin-100 text-2sm mb-2'>
        {title}
      </Typography>
      <Typography type='body' className='text-raisin-100 text-sm mb-2'>
        {description}
      </Typography>
      {path && (
        <Link href={path} className='text-raisin-100 text-2sm underline'>
          {permalink}
        </Link>
      )}
    </div>
  )
}

export default Toast
