const SkeletonLoading = () => {
  return (
    <div className='grid sm:grid-cols-2 gap-6 lg:grid-cols-4 2xl:grid-cols-4 sm:gap-4 xl:gap-6'>
      {Array.from({ length: 12 }, (_, index) => (
        <div key={index} className='animate-pulse relative last:border-none'>
          <div className='flex flex-col px-2 py-4 md:w-full justify-between gap-6 md:px-0 md:py-0 md:flex-row md:items-center'>
            <div className='flex w-full flex-col border-1 border-raisin-10 rounded-tl-3xl rounded-tr-3xl'>
              <div className='w-full '>
                <div className='aspect-w-16 aspect-h-9 bg-gray-300 rounded-tl-3xl rounded-tr-3xl  overflow-hidden' />
              </div>
              <div className='pr-6 md:pr-0 m-5'>
                <div className='w-30 h-6 bg-gray-300 rounded-md mb-4' />

                {/* ... Other placeholders for user details ... */}

                <div className='flex items-center justify-between gap-10 md:mt-5'>
                  <div className='w-14 h-6 bg-gray-300 rounded-md' />
                  <div className='w-20 h-6 bg-gray-300 rounded-md' />
                </div>
              </div>
            </div>
            <div className='hidden gap-4'>
              {[1, 2, 3].map(actionId => (
                <div key={actionId} className='w-20 h-8 bg-gray-300 rounded-md' />
              ))}
            </div>
          </div>
          <div className='w-4 h-14 absolute right-5 top-5 md:hidden bg-gray-300 rounded-md' />
        </div>
      ))}
    </div>
  )
}
export default SkeletonLoading
