import { useTranslation } from 'react-i18next'
import Icon from 'src/views/app/Icon'

interface Props {
  children: any
}

const AuthSideWrapper: React.FC<Props> = ({ children }: Props) => {
  const { t } = useTranslation()

  return (
    <div className='flex min-h-full flex-1 overflow-y-auto h-screen'>
      <div className="fixed hidden h-full flex-col items-start justify-between gap-5 overflow-y-visible bg-purple-100 bg-[url('/icons/authBgPattern.svg')] bg-cover p-8 lg:flex lg:w-[506px]">
        <button className='flex items-center gap-4 rounded-[30px] bg-[#00000042] px-6 py-4 font-semibold text-white backdrop-blur-2xl'>
          <Icon svgPath='linearArrowLeft' className='fill-transparent' width={20} height={20} />
          <div>{t('backToHome')}</div>
        </button>

        <div className='rounded-3xl bg-[#00000042] p-8 pr-10 backdrop-blur-2xl'>
          <div className='text-[42px] font-bold leading-[110%] text-white'>
            {t('getMore.get')} <span className='text-[#FFCA0C]'>{t('getMore.more')}</span> {t('getMore.meetings')}
          </div>

          <div className='py-8'>
            <div className='border-t border-dashed border-t-[#ffffff66]' />
          </div>

          <div className='flex flex-col gap-8 text-base font-medium text-white'>
            <div className='flex items-center gap-4'>
              <Icon svgPath='attachCircle' width={24} height={24} className='fill-yellow-100' />
              <div> {t('uploadAndShare')}</div>
            </div>

            <div className='flex items-center gap-4'>
              <Icon svgPath='video' width={24} height={24} className='fill-yellow-100' />
              <div> {t('automaticallyRecord')}</div>
            </div>

            <div className='flex items-center gap-4'>
              <Icon svgPath='calendarEdit' width={24} height={24} className='fill-yellow-100' />
              <div> {t('manageSchedule')}</div>
            </div>

            <div className='flex items-center gap-4'>
              <Icon svgPath='documentText' width={24} height={24} className='fill-yellow-100' />
              <div> {t('workTogether')}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full max-w-full flex-1 items-center justify-center lg:ml-[506px]'>
        <div className='flex h-full w-full max-w-full flex-col items-center justify-center'>{children}</div>
      </div>
    </div>
  )
}

export function getStaticProps({ locale }: { locale: string }) {
  console.log(locale)

  return {
    props: {}
  }
}

export default AuthSideWrapper
