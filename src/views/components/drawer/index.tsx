const DrawerBottom = ({ children, isOpen, title, setIsOpen, onBack, showBack }: any) => {
  return (
    <main
      className={
        ' fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
        (isOpen
          ? ' transition-opacity opacity-100 duration-300 translate-y-0  '
          : ' transition-all delay-200 opacity-0 translate-y-full  ')
      }
    >
      <section
        className={
          'rounded-t-3xl w-screen h-max max-h-4/5 overflow-auto bottom-[75px] absolute rounded-t-large bg-white  shadow-xl delay-200 duration-300 ease-in-out transition-all transform  ' +
          (isOpen ? ' translate-y-0 ' : ' translate-y-full ')
        }
      >
        <header className='flex items-center justify-center p-4 font-bold text-3md text-center'>
          {showBack && (
            <img
              className='absolute left-4'
              src='/icons/eva_arrow-leftl.svg'
              width={27}
              onClick={() => {
                onBack()
              }}
              alt='back'
            />
          )}
          <span>{title}</span>
          <img
            className='absolute right-4 top-4 z-40'
            src='/icons/close.svg'
            onClick={() => {
              setIsOpen(false)
            }}
            alt='close'
          />
        </header>
        <article className='relative w-screen px-5 h-full flex flex-col  overflow-y-scroll pb-8'>{children}</article>
      </section>
      <section
        className=' w-screen h-4/5 cursor-pointer '
        onClick={() => {
          setIsOpen(false)
        }}
      ></section>
    </main>
  )
}

export default DrawerBottom
