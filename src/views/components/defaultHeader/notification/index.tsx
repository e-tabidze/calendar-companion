import Image from '../../image'
import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";

const Notification = () => {
    return (
        <Menu as='div' className='hidden md:flex relative'>
            <Menu.Button>
               <div className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#F2F3F6] transition-all">
                   <Image src='/icons/bell.svg' className='rounded-full' alt='notification' />
                      <span
                          className="absolute right-0 top-0 mt-[4px] mr-[4px] w-[12px] h-[12px] flex items-center justify-center bg-[#FD4100] rounded-full text-[#ffffff] text-[10px] font-medium">
                     3
                    </span>
               </div>
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
                <Menu.Items className='absolute z-2 top-full left-1/2 -translate-x-1/2 mt-[20px] bg-[#ffffff] rounded-[16px] shadow-[0px_6px_18px_#000000/10]'>
                        <ul className="py-[8px]">
                            <li><a href="#"
                                   className="px-[24px] flex whitespace-nowrap text-[14px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all">
                                სიახლე 1</a></li>
                            <li><a href="#"
                                   className="px-[24px] flex whitespace-nowrap text-[14px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all">
                                სიახლე 2</a></li>
                            <li><a href="#"
                                   className="px-[24px] flex whitespace-nowrap text-[14px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all">
                                სიახლე 3</a>
                            </li>
                            <li><a href="#"
                                   className="px-[24px] flex items justify-between whitespace-nowrap text-[14px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all"><span> შეტყობინებები</span></a>
                            </li>
                        </ul>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default Notification