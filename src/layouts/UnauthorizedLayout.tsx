import AuthSideWrapper from './AuthSideWrapper'

interface Props {
  children: any
}

const UnauthorizedLayout: React.FC<Props> = ({ children }) => {
  return (
    <AuthSideWrapper>
      <div className='mx-4 flex w-10/12 max-w-[520px] min-w-[55%] flex-1 flex-col justify-between my-12 overflow-auto lg:mx-0 hide-scrollbar'>
        {children}
      </div>
    </AuthSideWrapper>
  )
}

export default UnauthorizedLayout
