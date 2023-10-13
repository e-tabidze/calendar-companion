import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Image from '../../image'
import Typography from '../../typography'

const Tnet = () => {
    return (
        <Menu as='div' className='relative text-left hidden md:flex'>
                <Menu.Button className='bg-transparent border-[#E9EAEB] hover:border-[#3c74ff] relative rounded-full border w-[40px] h-[40px] flex items-center justify-center ml-[16px] transition-all'>
                    <Image src='/icons/tnet/tnet.svg' alt='img'/>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <Menu.Items className='w-[376px] px-[12px] pt-[20px] pb-[12px] absolute z-2 top-full mt-[20px] right-0 bg-[#ffffff] rounded-[16px] shadow-[0px_6px_18px_#000000/10]'>

                        <div className="px-[16px]">

                            <Typography type='h5' weight='normal' className='font-bold text-[18px] text-[#000000] mb-[8px]'>TNET</Typography>

                            <Typography type='body' className='font-medium text-[12px] text-[#7D7F87] mb-[16px]'>
                            ყველაზე დიდი ტექნოლოგიური ეკოსისტემა, რომელიც აერთიანებს 11 პლატფორმას:
                            </Typography>
                        </div>
                        <div className="grid gap-4 grid-cols-3">
                        <a className="icon-h-24px h-[80px] py-[24px]  px-[16px] flex items-center justify-center bg-[#F5F5F8] hover:bg-[#F5F5F8] rounded-[8px] transition-all"
                           href="https://www.myauto.ge/ka/" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/myauto.svg' alt='img'/>
                        </a>
                        <a className="icon-h-24px h-[80px] py-[24px]  px-[16px] flex items-center justify-center hover:bg-[#F5F5F8] rounded-[8px] transition-all"
                           href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/myhome.svg' alt='img'/>
                        </a>
                        <a className="icon-h-24px h-[80px] py-[24px]  px-[16px] flex items-center justify-center hover:bg-[#F5F5F8] rounded-[8px] transition-all"
                           href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/mymarket.svg' alt='img'/>
                        </a>
                        <a className="icon-h-24px h-[80px] py-[24px]  px-[16px] flex items-center justify-center hover:bg-[#F5F5F8] rounded-[8px] transition-all"
                           href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/myparts.svg' alt='img'/>
                        </a>
                        <a className="icon-h-24px h-[80px] py-[24px]  px-[16px] flex items-center justify-center hover:bg-[#F5F5F8] rounded-[8px] transition-all"
                           href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/vendoo.svg' alt='img'/>
                        </a>
                        <a className="icon-h-24px h-[80px] py-[24px]  px-[16px] flex items-center justify-center hover:bg-[#F5F5F8] rounded-[8px] transition-all"
                           href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/swoop.svg' alt='img'/>
                        </a>
                        <a className="icon-h-24px h-[80px] py-[24px]  px-[16px] flex items-center justify-center hover:bg-[#F5F5F8] rounded-[8px] transition-all"
                           href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/tkt.svg' alt='img'/>
                        </a>
                        <a className="icon-h-24px h-[80px] py-[24px]  px-[16px] flex items-center justify-center hover:bg-[#F5F5F8] rounded-[8px] transition-all"
                           href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/livo.svg' alt='img'/>
                        </a>
                        <a className="icon-h-24px h-[80px] py-[24px]  px-[16px] flex items-center justify-center hover:bg-[#F5F5F8] rounded-[8px] transition-all"
                           href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/saba.png' alt='img'/>
                        </a>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
    )
}

export default Tnet
