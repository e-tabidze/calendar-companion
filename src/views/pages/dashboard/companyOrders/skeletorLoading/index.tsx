interface Props {
  filters: any[]
}
const SkeletonLoading: React.FC<Props> = ({ filters }) => {
  return (
    <div className='animate-pulse'>
      <div className='h-12 mb-4 bg-gray-300 rounded-2xl' />

      <div className='hidden lg:flex gap-3 p-2 md:p-8'>
        {Array.from({ length: filters.length }).map((_, index) => (
          <div key={index} className='w-20 h-10 bg-gray-300 rounded-xl' />
        ))}
      </div>

      <div className='px-none md:px-6 2xl:px-8'>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className='mb-4'>
            <div className='h-12 bg-gray-300 rounded-xl' />
          </div>
        ))}
      </div>

      <div className='flex justify-center mt-4'>
        <div className='w-16 h-8 bg-gray-300 rounded-md' />
      </div>
    </div>
  )
}

export default SkeletonLoading
