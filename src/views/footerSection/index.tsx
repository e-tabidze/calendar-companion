import Image from 'next/image'
import Link from 'next/link'



 const FooterSection = () => {
  return (
    <footer>
      <div className="footer-section-container">
        <h3 className="mb-25">Stay tuned for whats coming next!</h3>
        <p>
          Exciting updates are on the horizon! We are just getting started on
          this journey, and our mission is to craft an outstanding product
          designed to enhance your day-to-day work life. Our vision is to turn
          meetings into enjoyable and productive experiences, and we cannot wait
          to unveil more awesome features soon.
        </p>
        <div className="footer-btn-container flex justify-center gap-16">
          <Link href='https://app.companyon.ai/auth/register' className="footer-btn">✨ Join now</Link>
          <Link href='https://app.companyon.ai/auth/login' className="footer-btn footer-btn-light">👀 Sign in</Link>
        </div>
        <div className="footer align-center flex">
          <Image src="/images/footer-logo.svg" alt="footerlogo" width={147} height={37} />
          <p>© 2023 Companyon.AI. All Rights Reserved. </p>
          <div>
            <Link href="/terms">Terms of service /</Link> {' '}
            <Link href="/privacy">Privacy policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection