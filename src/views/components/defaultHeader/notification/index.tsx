import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";
import Typography from "../../typography";
import Icon from "../../../app/Icon";

const Notification = () => {
    return (
        <Menu as='div' className='hidden md:flex relative'>
            <Menu.Button>
               <div className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-grey-100 transition-all">
                   <Icon svgPath='bell' width={25} height={24}  className='rounded-full'/>
                      <span
                          className="absolute right-0 top-0 mt-1 mr-1 w-3 h-3 flex items-center justify-center orange-100 rounded-full text-white text-[10px] font-medium">
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
                <Menu.Items className='w-[348px] border border-raisin-10 absolute z-2 top-full left-1/2 -translate-x-1/2 mt-5 bg-white rounded-2xl shadow-[0px_6px_18px_#000000/10]'>
                    <div className="border-b-1 border-raisin-10 p-4 text-md font-bold text-raisin-100">
                        შეტყობინებები
                    </div>
                    <ul className="py-6">
                        <li>
                                <a href="#"
                                   className="px-4 flex items-center py-2 relative">
                                    <span className="w-1 h-1 rounded-full bg-orange-100 absolute left-[6px] top-1/2 -translate-y-1/2"></span>
                                     <span className="w-10 h-10 bg-grey-100 rounded-xl mr-4 flex items-center justify-center shrink-0">
                                          <Icon
                                              svgPath='notification'
                                              width={24}
                                              height={24}
                                              className="fill-raisin-100"
                                          />
                                     </span>
                                    <div className="flex flex-col">
                                           <Typography type='h5' className='text-2sm font-medium text-raisin-100'>
                                               შემოსულია ახალი ჯავშანი
                                           </Typography>
                                           <Typography type='subtitle' className='text-sm font-normal text-raisin-30'>
                                               2 დღის წინ
                                           </Typography>
                                       </div>

                                </a>
                            </li>
                        <li>
                            <a href="#"
                               className="px-4 flex items-center py-2 relative">
                                <span className="w-1 h-1 rounded-full bg-orange-100 absolute left-[6px] top-1/2 -translate-y-1/2"></span>
                                <span className="w-10 h-10 bg-yellow-10 rounded-xl mr-4 flex items-center justify-center shrink-0">
                                          <Icon
                                              svgPath='notification'
                                              width={24}
                                              height={24}
                                              className="fill-yellow-110"
                                          />
                                     </span>
                                <div className="flex flex-col">
                                    <Typography type='h5' className='text-2sm font-medium text-raisin-100'>
                                        შემოსულია ახალი ჯავშანი
                                    </Typography>
                                    <Typography type='subtitle' className='text-sm font-normal text-raisin-30'>
                                        2 დღის წინ
                                    </Typography>
                                </div>

                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="px-4 flex items-center py-2 relative">
                                <span className="w-1 h-1 rounded-full bg-orange-100 absolute left-[6px] top-1/2 -translate-y-1/2"></span>
                                <span className="w-10 h-10 bg-orange-10 rounded-xl mr-4 flex items-center justify-center shrink-0">
                                      <Icon
                                          svgPath='info'
                                          width={24}
                                          height={24}
                                          className="fill-orange-100"
                                      />
                                     </span>
                                <div className="flex flex-col">
                                    <Typography type='h5' className='text-2sm font-medium text-raisin-100'>
                                        იყავი ყურადღებით
                                    </Typography>
                                    <Typography type='subtitle' className='text-sm font-normal text-raisin-30'>
                                        2 დღის წინ
                                    </Typography>
                                </div>

                            </a>
                        </li>
                    </ul>
                    <div className="flex justify-center border-t-1 border-raisin-10 p-4 text-2sm font-medium text-raisin-100">
                        ნახე ყველა
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default Notification