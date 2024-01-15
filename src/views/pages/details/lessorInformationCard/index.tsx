import Divider from 'src/views/components/divider'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import Icon from "src/views/app/Icon";

interface Props {
  id?: string
  lessor: string
  description: string
  count: number
}

const LessorInformationCard: React.FC<Props> = ({ id, lessor, description, count }) => {
  return (
    <div className='bg-raisin-5 rounded-3xl pt-12 px-6 md:pl-11 pb-11 md:pr-20 mt-20' id={id}>
      <Typography type='h3' className='mb-5 hidden lg:block'>
        ინფორმაცია გამქირავებელზე
      </Typography>
      
      {/* <div className='flex gap-3 items-center mb-9 lg:hidden'>
        <Review review={4.89} size='normal' />
        <Typography type='subtitle'>206 შეფასება</Typography>
      </div> */}
      <Divider />

      <div className='flex gap-20 my-6 items-center'>
        <div className='flex items-center gap-4'>
            <div className="flex h-16 w-16 shrink-0 rounded-xl overflow-hidden">
                <Image src='/images/avatar.png' alt='' className='w-full h-full object-cover' />
            </div>
          <div>
            <div className='flex items-center gap-3'>
              <Typography type='h5' weight='normal'>
                {lessor}
              </Typography>
                <Icon svgPath='verify' width={24} height={24} className='fill-transparent'/>
            </div>
            <Typography type='body' color='light'>
              {count} განცხადება
            </Typography>
          </div>
        </div>

        {/* <div className='hidden lg:flex gap-3 items-center'>
          <Review review={4.89} size='normal' />
          <Typography type='subtitle'>206 შეფასება</Typography>
        </div> */}
      </div>
      <Typography type='subtitle'>{description}</Typography>
    </div>
  )
}

export default LessorInformationCard
