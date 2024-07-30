import { useTranslation } from 'react-i18next'
import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import Icon from 'src/views/app/Icon'
import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'

const VerifyEmailPage = () => {
  const { t } = useTranslation()

  return (
    <UnauthorizedLayout>
      <div className='flex flex-col items-center gap-8 text-center'>
        <Typography type='h1'>
          {t('verifyEmail')}
        </Typography>

        <Icon svgPath='emailSentBot' width={136} height={120} />

        <div className='text-sm text-secondary-2'>
          {t('verifyEmailCaption1')}{' '}
          <a href='' className='text-link'>
            email value
          </a>{' '}
          {t('verifyEmailCaption2')}
        </div>
      </div>

      <div className='mt-8 flex flex-col items-center'>
        <div className='flex w-full flex-col gap-3 text-center lg:w-96'>
          <DefaultButton text={t('resend')} bg='bg-purple-100' className='p-4 rounded-lg' />
        </div>
      </div>
    </UnauthorizedLayout>
  )
}

export default VerifyEmailPage
