import AuthSideWrapper from './AuthSideWrapper'

interface Props {
  children: any
}

const UnauthorizedLayout: React.FC<Props> = ({ children }) => {
  return (
    <AuthSideWrapper>
      <div className='mx-3 mb-20 mt-16 flex max-w-[520px] flex-1 flex-col justify-between lg:mx-0 lg:mt-28'>
        {children}
      </div>
    </AuthSideWrapper>
  )
}

export default UnauthorizedLayout
