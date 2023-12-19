import React from 'react'

const OrderDetailsSkeleton = () => (
  <div className='p-4 bg-white border border-raisin-10 rounded-md shadow-md'>
    {/* Header Skeleton */}
    <div className='animate-pulse mb-6'>
      <div className='w-24 h-4 bg-gray-300 rounded-md mb-2' />
      <div className='w-1/3 h-6 bg-gray-300 rounded-md' />
    </div>

    {/* Rental Details Skeleton */}
    <div className='animate-pulse mb-6'>
      <div className='flex items-center justify-between'>
        <div className='w-1/3 h-4 bg-gray-300 rounded-md' />
        <div className='w-1/3 h-4 bg-gray-300 rounded-md' />
      </div>
    </div>

    {/* Price Details Skeleton */}
    <div className='animate-pulse mb-6'>
      <div className='flex items-center justify-between'>
        <div className='w-7/12'>
          <div className='font-bold text-2xl h-8 bg-gray-300 rounded-md mb-2' />
          <div className='text-lg h-6 bg-gray-300 rounded-md mb-4' />

          {/* ... Other placeholders for user details ... */}

          {/* Take Away Info Skeleton */}
          <div className='flex flex-col mb-4'>
            <div className='flex items-center mb-2'>
              <div className='w-1/3 h-4 bg-gray-300 rounded-md' />
              <div className='w-2/3 h-4 bg-gray-300 rounded-md' />
            </div>
            <div className='w-full lg:w-6/12 h-4 bg-gray-300 rounded-md mb-2' />

            {/* ... Repeat for other Take Away Info elements ... */}
          </div>

          {/* Price Details Wrapper Skeleton */}
          <div>{/* ... Placeholder for Price Details ... */}</div>
        </div>

        <div className='w-5/12 flex flex-col items-center shrink-0 pl-6'>
          <div className='w-40 h-24 mb-4'>
            <div className='aspect-w-16 aspect-h-9 bg-gray-300 rounded-lg' />
          </div>

          {/* ... Placeholder for Manufacturer and Model ... */}

          {/* ... Placeholder for Status ... */}

          {/* Buttons Skeleton */}
          <div className='flex gap-2'>
            <div className='w-16 h-8 bg-gray-300 rounded-md' />
            <div className='w-16 h-8 bg-gray-300 rounded-md' />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default OrderDetailsSkeleton
