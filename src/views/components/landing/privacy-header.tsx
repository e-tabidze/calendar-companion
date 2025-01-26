import Image from 'next/image'



export const PrivacyHeader = () => {
    return (
        <div className="landing-container">
            <div className="header align-center flex justify-between">
                <a href="/">
                    {/*<Image src={logo} alt="logo" />*/}
                </a>
                <a href='/auth/login' className="btn header-btn">Sign in</a>
            </div>
        </div>
    )
}