import Icon from "src/views/app/Icon";

const DrawerBottom = ({ children, isOpen, title, setIsOpen, onBack, showBack }: any) => {
  return (
    <main
      className={
        ' fixed bottom-0 overflow-hidden z-[111] bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
        (isOpen
          ? ' transition-opacity opacity-100 duration-300 translate-y-0  '
          : ' transition-all delay-200 opacity-0 translate-y-full  ')
      }
    >
      <section
        className={
          'rounded-t-3xl w-screen h-max max-h-4/5 overflow-auto absolute rounded-t-large bg-white  shadow-xl delay-200 duration-300 ease-in-out transition-all transform  ' +
          (isOpen ? ' bottom-0 translate-y-0 ' : ' bottom-[74px] translate-y-full ')
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
          <Icon
            className='absolute right-4 top-4 z-40'
            svgPath='close'
            width={40}
            height={40}
            onClick={() => {
              setIsOpen(false)
            }}
          />
        </header>
        <article className='border-b-1 border-raisin-10 relative w-screen px-5 pb-10 h-full flex flex-col overflow-y-scroll'>{children}</article>
      </section>
      <section
        className='w-screen h-4/5 cursor-pointer '
        onClick={() => {
          setIsOpen(false)
        }}
      ></section>
    </main>
  )
}

export default DrawerBottom
