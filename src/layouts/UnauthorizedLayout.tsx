import AuthSideWrapper from './AuthSideWrapper'

interface Props {
  children: any
}

const UnauthorizedLayout: React.FC<Props> = ({ children }) => {
  return (
    <AuthSideWrapper>
      <div className='mx-4 mb-12 mt-16 flex w-10/12 max-w-[520px] min-w-[55%] flex-1 flex-col justify-between lg:mx-0 lg:mt-28'>
        {children}
      </div>
    </AuthSideWrapper>
  )
}

export default UnauthorizedLayout
