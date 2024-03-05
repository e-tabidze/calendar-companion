import Typography from 'src/views/components/typography'
import { InsuranceList, InsuranceListItem } from './styles'
import Icon from "src/views/app/Icon";
import {useTranslation} from "next-i18next";

interface Props {
  selected?: boolean
  handleClick?: any
}

const InsuranceCard = ({ selected, handleClick }: Props) => {
  const {t} = useTranslation()

  return (
    <div
      onClick={handleClick}
      className={`${
        selected ? 'border-2 border-green-100 bg-green-10' : 'border border-px  border-grey-100'
      }  rounded-3xl px-9 pt-10 pb-5 cursor-pointer`}
    >
      <Typography type='h5' weight='normal'>
        {t('road_insurance')}
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
          <Icon svgPath='tick' width={11} height={7} />
          <Typography type='body' color='dark'>
            5 მგზავრი
          </Typography>
        </InsuranceListItem>
        <InsuranceListItem>
          <Icon svgPath='tick' width={11} height={7} />
          <Typography type='body' color='dark'>
            2 ჩემოდანი
          </Typography>
        </InsuranceListItem>
        <InsuranceListItem>
          <Icon svgPath='minus' width={10} height={1} className='fill-transparent'/>
          <Typography type='body' color='light'>
            კონდიციონერი
          </Typography>
        </InsuranceListItem>
        <InsuranceListItem>
          <Icon svgPath='minus' width={10} height={1} className='fill-transparent'/>
          <Typography type='body' color='light'>
            ბენზინი
          </Typography>
        </InsuranceListItem>
        <InsuranceListItem>
          <Icon svgPath='minus' width={10} height={1} className='fill-transparent'/>
          <Typography type='body' color='light'>
            5 ლიტრი / 100კმ
          </Typography>
        </InsuranceListItem>
        <div className='flex justify-end mt-4'>
          <Icon svgPath={selected?'selected':'unselected'} width={32} height={32} className='fill-transparent'/>
        </div>
      </InsuranceList>
    </div>
  )
}

export default InsuranceCard
