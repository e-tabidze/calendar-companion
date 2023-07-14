// components/Breadcrumb.tsx
import Link from 'next/link'

interface Props {
  items: any[]
  onClick: () => void
}

const Breadcrumb: React.FC<Props> = ({ items, onClick }) => {
  return (
    <nav className='text-gray-500'>
      {items.map((item, index) => (
        <span key={index} className='mx-2'>
          {index < items.length - 1 ? (
            <>
              <Link href={item.path} onClick={onClick}>
                {item.label}
              </Link>
              <span className='mx-2'>/</span>
            </>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumb
