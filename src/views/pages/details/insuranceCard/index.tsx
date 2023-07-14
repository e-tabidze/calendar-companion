import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import { InsuranceList, InsuranceListItem } from './styles'

interface Props {
  selected?: boolean
  handleClick?: any
}

const InsuranceCard = ({ selected, handleClick }: Props) => {
  return (
    <div
      onClick={handleClick}
      className={`${
        selected ? 'border-2 border-green-100 bg-green-10' : 'border border-px  border-grey-100'
      }  rounded-3xl px-9 pt-10 pb-5 cursor-pointer`}
    >
      <Typography type='h5' weight='normal'>
        გზის დაზღვევა
      </Typography>
      <Typography type='subtitle'>0.00$</Typography>

      <Typography type='body' color='dark' className='mt-7'>
        The 2012 Subaru Forester is a five-passenger compact SUV that comes standard with full-time all-wheel drive. It
        has a functional interior that features what Subaru calls a “twin cockpit” design, that’s supposed to embrace
        its occupants. The Forester 2.5X comes standard with 16-inch steel wheels, It has a panoramic moon roof, and a
        roof rack. There are 7 Subaru Forester in our Company.
      </Typography>
      <InsuranceList>
        <InsuranceListItem>
          <Image src='/icons/tick.svg' alt="" />
          <Typography type='body' color='dark'>
            5 მგზავრი
          </Typography>
        </InsuranceListItem>
        <InsuranceListItem>
          <Image src='/icons/tick.svg' alt="" />
          <Typography type='body' color='dark'>
            2 ჩემოდანი
          </Typography>
        </InsuranceListItem>
        <InsuranceListItem>
          <Image src='/icons/minus.svg' alt="" />
          <Typography type='body' color='light'>
            კონდიციონერი
          </Typography>
        </InsuranceListItem>
        <InsuranceListItem>
          <Image src='/icons/minus.svg' alt="" />
          <Typography type='body' color='light'>
            ბენზინი
          </Typography>
        </InsuranceListItem>
        <InsuranceListItem>
          <Image src='/icons/minus.svg' alt="" />
          <Typography type='body' color='light'>
            5 ლიტრი / 100კმ
          </Typography>
        </InsuranceListItem>
        <div className='flex justify-end mt-4'>
          <Image src={selected ? '/icons/selected.svg' : '/icons/unselected.svg'} alt="" />
        </div>
      </InsuranceList>
    </div>
  )
}

export default InsuranceCard
