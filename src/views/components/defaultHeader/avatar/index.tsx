import Image from '../../image'
import Typography from '../../typography'
import { AvatarContainer, AvatarInnerContainer, AvatarResponsiveContainer } from './styles'
import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";

const Avatar = () => {
  return (
    <Menu as='div' className='relative text-left hidden md:flex'>
        <Menu.Button>
            <AvatarContainer>
                <AvatarInnerContainer>
                    <Image src='/images/avatar.png' className='rounded-full' alt='avatar' />
                </AvatarInnerContainer>
                <AvatarResponsiveContainer>
                    <Typography type='button' color='dark' weight='normal' className="text-[#272A37] text-[14px] font-medium text-nowrap">
                        name
                    </Typography>
                    <Image src='/icons/chevron.svg' alt='img' className="flex ml-[8px] transition-all" />
                </AvatarResponsiveContainer>
            </AvatarContainer>
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
            <Menu.Items className='absolute z-2 top-full mt-[20px] right-0 bg-[#ffffff] rounded-[16px] shadow-[0px_6px_18px_#000000/10]'>
                <div className="overflow-hidden rounded-[16px]">
                    <div className="flex border-b-[1px] border-[#E9EAEB] px-[24px] py-[16px]">
                        <span
                        className="w-[40px] h-[40px] mr-[12px] relative flex items-center justify-center rounded-full overflow-hidden">
                        <Image src='/images/avatar.png' className='rounded-full' alt='avatar' />
                    </span>
                        <div className="flex flex-col "><span
                            className="text-[14px] text-[#272A37] overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] inline-block">
                                            namename@gmail.com
                                      </span><span className="flex text-[14px] text-[#272A37]">
                                            ID: 146797
                                      </span></div>
                    </div>
                    <ul className="py-[8px]">
                        <li><a href="#"
                               className="px-[24px] flex whitespace-nowrap text-[14px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all">ჩემი
                            განცხადებები</a></li>
                        <li><a href="#"
                               className="px-[24px] flex whitespace-nowrap text-[14px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all">ბალანსის
                            შევსება</a></li>
                        <li><a href="#"
                               className="px-[24px] flex whitespace-nowrap text-[14px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all">რჩეულები</a>
                        </li>
                        <li><a href="#"
                               className="px-[24px] flex items justify-between whitespace-nowrap text-[14px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all"><span> შეტყობინებები</span></a>
                        </li>
                        <li><a href="https://www.myauto.ge/ka/mypage/profile"
                               className="px-[24px] flex whitespace-nowrap text-[14px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all">მონაცემების
                            რედაქტირება</a></li>
                    </ul>
                    <div className="border-t-[1px] border-[#E9EAEB] py-[8px]"><a
                        className="flex text-[14px] text-[#272A37] cursor-pointer py-[8px] px-[24px] hover:bg-[#F2F3F6] transition-all"
                       href="#">გასვლა</a>
                    </div>
                </div>
            </Menu.Items>
        </Transition>
    </Menu>
  )
}

export default Avatar
