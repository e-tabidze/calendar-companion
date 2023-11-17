import { MaxWidthContainer } from 'src/styled/styles'
import { DefaultButton } from 'src/views/components/button'
import ProgressBar from 'src/views/components/progressBar'
import { useRouter } from 'next/router'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import NewListingSelect from 'src/views/components/newListingSelect'
import HeaderWrapper from 'src/views/components/headerWrapper'
import { InnerContainer } from '../views/components/defaultHeader/styles'
import Image from '../views/components/image'
import useProfile from 'src/hooks/useProfile'
import { useEffect } from 'react'

interface Props {
  children: any
  options: any[]
  selectedOption: any
  onClose: () => void
  onChange: (option: any) => void
  onNextStep: () => void
  onPrevStep: () => void
  onSubmit: any
}

const NewListingLayout: React.FC<Props> = ({
  children,
  options,
  onChange,
  selectedOption,
  onNextStep,
  onPrevStep,
  onClose,
  onSubmit
}) => {
  const router = useRouter()

  const { width } = useWindowDimensions()

  const onClickLogo = () => router.push('/')

  const renderNewListingSelect = () => (
    <NewListingSelect options={options} onChange={onChange} selectedOption={selectedOption} />
  )

  const { isAuthenticated, activeCompany } = useProfile()

  useEffect(() => {
    if (isAuthenticated !== false) {
      if (!!activeCompany && router?.pathname.includes('profile')) {
        router.push(`/dashboard/dashboard`)
      } else if (activeCompany === null && router?.pathname.includes('dashboard')) {
        router.push('/profile/orders')
      }
    } else if (isAuthenticated === false) {
      if (router?.pathname.includes('profile') || router?.pathname.includes('dashboard')) {
        router.push('/')
      }
    }
  }, [!!activeCompany, isAuthenticated])

  return (
    <MaxWidthContainer>
      <HeaderWrapper fullWidth>
        <InnerContainer>
          <Image src='/images/logo-rent.svg' alt='' onClick={onClickLogo} className='w-24 md:w-32 cursor-pointer' />
          {width > 781 && renderNewListingSelect()}
          <Image src='/icons/close.svg' alt='' onClick={onClose} height={40} width={40} />
        </InnerContainer>
        <ProgressBar color='green-100' progress={selectedOption.step / options.length} className='md:mt-2' />
      </HeaderWrapper>
      {width < 780 && (
        <div className='w-full flex justify-center top-20 bg-white z-[11]' style={{ position: 'sticky' }}>
          {renderNewListingSelect()}
        </div>
      )}

      <div className='max-w-[850px] pb-32 m-auto px-4 lg:w-10/12 lg:p-5 lg:px-0 2xl:p-0' style={{ maxWidth: '850px' }}>
        <div className='mt-20 pb-20 h-full'>{children}</div>
      </div>
      <div className='fixed w-full bottom-0 bg-white py-5 border border-t-raisin-10 z-10'>
        <div
          className='max-w-[850px] m-auto flex justify-between px-4 lg:w-10/12 lg:px-0 2xl:px-0'
          style={{ maxWidth: '850px' }}
        >
          {selectedOption.step !== 1 ? <DefaultButton text='უკან' onClick={onPrevStep}></DefaultButton> : <div></div>}
          <DefaultButton
            bg='bg-green-100'
            type={selectedOption.step === options.length ? 'submit' : 'button'}
            text='შემდეგი'
            textColor='text-white'
            onClick={selectedOption.step === options.length ? onSubmit : onNextStep}
          ></DefaultButton>
        </div>
      </div>
    </MaxWidthContainer>
  )
}

export default NewListingLayout
