import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Image from '../../image'
import Typography from '../../typography'

const Tnet = () => {
    return (
        <Menu as='div' className='relative text-left hidden md:flex'>
                <Menu.Button className='bg-transparent border-raisin-10 hover:border-[#3c74ff] relative rounded-full border w-10 h-10 flex items-center justify-center ml-4 transition-all'>
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
                    <Menu.Items className='w-[376px] px-3 pt-5 pb-3 absolute z-2 top-full mt-5 right-0 bg-white rounded-2xl shadow-sm'>

                        <div className="px-4">

                            <Typography type='h5' weight='normal' className='font-bold text-2md text-black mb-2'>TNET</Typography>

                            <Typography type='body' className='font-medium text-sm text-raisin-60 mb-4'>
                            ყველაზე დიდი ტექნოლოგიური ეკოსისტემა, რომელიც აერთიანებს 11 პლატფორმას:
                            </Typography>
                        </div>
                        <div className="grid gap-1 grid-cols-3">
                        <a className="h-20 py-6 px-4 flex items-center justify-center bg-grey-80 hover:bg-grey-80 rounded-lg transition-all"
                           href="https://www.myauto.ge/ka/" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/myauto.svg' alt='img' width={80} height={24}/>
                        </a>
                        <a className="h-20 py-6 px-4 flex items-center justify-center hover:bg-grey-80 rounded-lg transition-all"
                           href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/myhome.svg' alt='img' width={80} height={24}/>
                        </a>
                        <a className="h-20 py-6 px-4 flex items-center justify-center hover:bg-grey-80 rounded-lg transition-all"
                           href="https://www.mymarket.ge/ka/" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/mymarket.svg' alt='img' width={83} height={24}/>
                        </a>
                        <a className="h-20 py-6 px-4 flex items-center justify-center hover:bg-grey-80 rounded-lg transition-all"
                           href="https://www.myparts.ge/ka/" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/myparts.svg' alt='img' width={82} height={24}/>
                        </a>
                        <a className="h-20 py-6 px-4 flex items-center justify-center hover:bg-grey-80 rounded-lg transition-all"
                           href="https://www.vendoo.ge" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/vendoo.svg' alt='img' width={64} height={14}/>
                        </a>
                        <a className="h-20 py-6 px-4 flex items-center justify-center hover:bg-grey-80 rounded-lg transition-all"
                           href="https://www.swoop.ge" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/swoop.svg' alt='img' width={83} height={24}/>
                        </a>
                        <a className="h-20 py-6 px-4 flex items-center justify-center hover:bg-grey-80 rounded-lg transition-all"
                           href="https://www.tkt.ge" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/tkt.svg' alt='img' width={80} height={19}/>
                        </a>
                        <a className="h-20 py-6 px-4 flex items-center justify-center hover:bg-grey-80 rounded-lg transition-all"
                           href="https://www.livo.ge" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/livo.svg' alt='img' width={59} height={20}/>
                        </a>
                        <a className="h-20 py-6 px-4 flex items-center justify-center hover:bg-grey-80 rounded-lg transition-all"
                           href="https://www.saba.com.ge" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/saba.png' alt='img' width={52} height={24}/>
                        </a>
                        <a className="h-20 py-6 px-4 flex items-center justify-center hover:bg-grey-80 rounded-lg transition-all"
                           href="https://www.myshop.ge" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/myshop.svg' alt='img' width={69} height={12}/>
                        </a>
                        <a className="h-20 py-6 px-4 flex items-center justify-center hover:bg-grey-80 rounded-lg transition-all"
                           href="https://superapp.tnet.ge" target="_blank" rel="noreferrer">
                            <Image src='/icons/tnet/super-app.svg' alt='img' width={65} height={20}/>
                        </a>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
    )
}

export default Tnet
