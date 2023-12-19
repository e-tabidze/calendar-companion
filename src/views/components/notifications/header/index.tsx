import Typography from 'src/views/components/typography'

const Header = () => {
  return (
    <div className='flex justify-between items-center pb-4'>
      <Typography type='h3' className='font-bold md:font-normal text-2sm md:text-2lg'>
        შეტყობინებები
      </Typography>
      <button className='text-sm md:text-2sm text-black ml-10 whitespace-normal'>ყველას წაკითხულად მონიშვნა</button>
    </div>
  )
}

export default Header
