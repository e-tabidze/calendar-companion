import { Popover } from '@headlessui/react'
import Typography from 'src/views/components/typography'
import Icon from "src/views/app/Icon";

interface Props {
  label: string
  children: any
  maxWidth: string
  className?: string
}

const PopoverDropdown: React.FC<Props> = ({ label, children, maxWidth, className }) => {
  return (
    <div className='block'>
      <Popover className='relative'>
        <Popover.Button
          className={`flex items-center w-max h-10 border border-gray-90 rounded-xl gap-3 px-4 cursor-pointer ${className}`}
        >
          <Typography type='body'>{label}</Typography>
          <Icon svgPath='chevron' width={8} height={6} className='fill-transparent'/>

        </Popover.Button>

        <Popover.Panel
          className={`min-w-[340px] absolute z-50 w-max mt-4 p-5 h-fit rounded-2xl shadow-2xl bg-white header-shadow text-xs top-100 left-0 right-0 ${maxWidth}`}
        >
          {children}
        </Popover.Panel>
      </Popover>
    </div>
  )
}

export default PopoverDropdown
