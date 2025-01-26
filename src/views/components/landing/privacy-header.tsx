import Link from "next/link"

export const PrivacyHeader = () => {
  return (
    <div className='landing-container'>
      <div className='header align-center flex justify-between'>
        <Link href='/'>{/*<Image src={logo} alt="logo" />*/}</Link>
        <Link href='/auth/login' className='btn header-btn'>
          Sign in
        </Link>
      </div>
    </div>
  )
}
