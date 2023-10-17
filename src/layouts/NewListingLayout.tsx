import { MaxWidthContainer, NewListingHeaderContainer } from 'src/styled/styles'
import { DefaultButton } from 'src/views/components/button'
import Image from 'next/image'
import ProgressBar from 'src/views/components/progressBar'
import { useRouter } from 'next/router'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import NewListingSelect from 'src/views/components/newListingSelect'

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

  return (
    <MaxWidthContainer>
      <NewListingHeaderContainer style={{ position: 'sticky', maxWidth: "1470px" }}>
        <div className='flex justify-between items-center py-3 px-2 relative'>
          <Image src='/images/logo-rent.svg' alt='' onClick={onClickLogo} height={40} width={131} />
          {width > 781 && renderNewListingSelect()}
          <Image src='/icons/close.svg' alt='' onClick={onClose} height={40} width={40} />
        </div>
        <ProgressBar color='green-100' progress={selectedOption.step / options.length} />
      </NewListingHeaderContainer>
      {width < 780 && (
        <div className='w-full flex justify-center top-20 bg-white z-[111]' style={{ position: 'sticky' }}>
          {renderNewListingSelect()}
        </div>
      )}

      <div
        className='max-w-[850px] pb-32 m-auto px-4 lg:w-10/12 lg:p-5 lg:px-0 2xl:p-0'
        style={{ maxWidth: '850px' }}
      >
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
