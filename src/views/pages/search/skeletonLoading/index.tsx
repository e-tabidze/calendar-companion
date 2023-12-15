const SkeletonLoading = () => {
  return (
    <div className='border border-raisin-10 rounded-2xl md:px-8 p-4'>
      <div className='grid sm:grid-cols-2 gap-6 lg:grid-cols-4 2xl:grid-cols-5'>
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className='animate-pulse relative border-b-1 border-raisin-10 last:border-none'>
            <div className='flex flex-col px-2 py-4 md:w-full justify-between gap-6 md:px-0 md:flex-row md:items-center'>
              <div className='flex gap-6 2xl:gap-6'>
                <div className='w-[64px] md:w-[150px] lg:w-[200px]'>
                  <div className='aspect-w-16 aspect-h-9 bg-gray-300 rounded-lg overflow-hidden' />
                </div>
                <div className='pr-6 md:pr-0'>
                  <div className='w-20 h-4 bg-gray-300 rounded-md mb-2' />
                  <div className='w-40 h-6 bg-gray-300 rounded-md mb-4' />

                  {/* ... Other placeholders for user details ... */}

                  <div className='flex items-center gap-10 md:mt-10'>
                    <div className='w-20 h-4 bg-gray-300 rounded-md' />
                    <div className='w-16 h-6 bg-gray-300 rounded-md' />
                  </div>
                </div>
              </div>
              <div className='hidden md:flex gap-4'>
                {[1, 2, 3].map(actionId => (
                  <div key={actionId} className='w-20 h-8 bg-gray-300 rounded-md' />
                ))}
              </div>
            </div>
            <div className='w-4 h-14 absolute right-5 top-5 md:hidden bg-gray-300 rounded-md' />
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className='mt-4'>
        <div className='w-16 h-8 bg-gray-300 rounded-md' />
      </div>
    </div>
  )
}
export default SkeletonLoading
