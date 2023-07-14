import Image from 'next/image'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { IconButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'

interface Props {
  toggleDetails: () => void
}

const ListComponent: React.FC<Props> = ({ toggleDetails }) => {
  const { width } = useWindowDimensions()
  
  return (
    <div className='' onClick={toggleDetails}>
      <div className='flex items-center px-2 py-4 large:w-full gap-6 large:px-4'>
        <Image src='/images/car.png' alt='' height={37} width={50} className='rounded-lg' />
        <div className='flex flex-col items-baseline large:flex-row large:items-center justify-between w-none large:w-full'>
          <div className=''>
            <Typography type='subtitle'>Mercedes E Class 2022</Typography>
            <Typography type='body' color='light'>
              ივნ 22, 2022 - 14:00 - ივლ 17, 2022 - 16:00
            </Typography>
          </div>
          <div className='flex w-full gap-2 large:w-max large:gap-10 large:justify-between'>
            <Typography type='subtitle'>435$</Typography>
            <Typography type='subtitle' className='text-green-100'>
              აქტიური
            </Typography>
          </div>
          {width > 779 && <IconButton icon='/icons/chevronWithBg.svg' height={38} width={38} onClick={toggleDetails} />}
        </div>
      </div>
      <Divider />
    </div>
  )
}

export default ListComponent
