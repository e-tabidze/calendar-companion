import { MaxWidthContainer, NewListingHeaderContainer } from 'src/styled/styles'
import { DefaultButton } from 'src/views/components/button'
import Image from 'next/image'
import ProgressBar from 'src/views/components/progressBar'
import NewListingSelect from 'src/views/pages/newListing/newListingSelect'
import { useRouter } from 'next/router'

interface Props {
  children?: any
  options: any[]
  onChange: (option: any) => void
  onClose: () => void
  selectedOption: any
  onNextStep: () => void
  onPrevStep: () => void
}

const NewListingLayout: React.FC<Props> = ({
  children,
  options,
  onChange,
  selectedOption,
  onNextStep,
  onPrevStep,
  onClose
}) => {
  const router = useRouter()

  const onClickLogo = () => {
    router.push('/')
  }

  return (
    <MaxWidthContainer className='absolute w-full min-h-screen top-0 left-0 bg-white'>
      <NewListingHeaderContainer>
        <div className='flex justify-between items-center py-5 px-2 relative'>
          <Image src='/images/logo-rent.svg' alt='' onClick={onClickLogo} height={40} width={131} />
          <NewListingSelect options={options} onChange={onChange} selectedOption={selectedOption} />
          <Image src='/icons/close.svg' alt='' onClick={onClose} height={40} width={40} />
        </div>
        <ProgressBar color='green-100' progress={selectedOption.step / options.length} className='large:mt-2' />
      </NewListingHeaderContainer>
      <div
        className='max-w-[850px] m-auto p-5 laptop:w-10/12 laptop:p-5 laptop:px-0 2xl:p-0'
        style={{ maxWidth: '850px' }}
      >
        <div className='pt-20 pb-20'>{children}</div>
      </div>
      <div className='sticky bottom-0 bg-white py-5 border border-t-raisin-10 z-10'>
        <div
          className='max-w-[850px] m-auto flex justify-between px-5 laptop:w-10/12 laptop:px-0 2xl:px-0'
          style={{ maxWidth: '850px' }}
        >
          {selectedOption.step !== 1 ? <DefaultButton text='უკან' onClick={onPrevStep}></DefaultButton> : <div></div>}
          {selectedOption.step !== 7 && (
            <DefaultButton bg='bg-green-100' text='შემდეგი' textColor='text-white' onClick={onNextStep}></DefaultButton>
          )}
        </div>
      </div>
    </MaxWidthContainer>
  )
}

export default NewListingLayout
