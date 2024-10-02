import Image from 'next/image'

// import '../assets/scss/privacy.scss'

const Header = () => {
  return (
    <div className='landing-container'>
      <div className='header align-center flex justify-between'>
        <a href='/'>
          <Image src='/images/logo.svg' alt='logo' width={147} height={37} />
        </a>
        <a href='/auth/login' className='btn header-btn'>
          Sign in
        </a>
      </div>
    </div>
  )
}

export default Header
