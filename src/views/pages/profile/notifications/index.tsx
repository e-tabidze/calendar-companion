import Typography from 'src/views/components/typography'
import Icon from "../../../app/Icon";
import Image from "../../../components/image";

const Notifications = () => {
    return (
        <>
            <div className='border border-raisin-10 rounded-[16px] md:rounded-[24px] p-[24px] md:py-[40px] md:px-[32px] mx-[16px] lg:mx-0'>
                <div className='flex justify-between items-center pb-[16px]'>
                    <Typography type='h3' className="font-bold md:font-normal text-[16px] md:text-[24px]">შეტყობინებები</Typography>
                    <button className="text-[12px] md:text-[14px] text-black ml-[40px] whitespace-normal">ყველას წაკითხულად მონიშვნა</button>
                </div>
                <ul>
                    <li>
                        <div
                            className="py-[16px] flex items-center justify-between border-t-1 border-raisin-10 relative">
                            <span className="w-[8px] h-[8px] rounded-full bg-orange-100 absolute left-[-17px] top-[32px]"></span>
                            <div className="flex">
                             <span className="w-[40px] h-[40px] bg-grey-100 rounded-[12px] mr-[16px] flex items-center justify-center shrink-0">
                                  <Icon
                                      svgPath='approved'
                                      width={24}
                                      height={24}
                                  />
                            </span>
                                <div className="flex flex-col">
                                    <Typography type='h5' className='text-[16px] font-medium text-raisin-100'>
                                        შემოსულია ახალი ჯავშანი
                                    </Typography>
                                    <Typography type='subtitle' className='text-[14px] font-normal text-raisin-100'>
                                        მართვის მოწმობის თეორიული და პრაქტიკული (მეორე ეტაპი) გამოცდის ჯავშანი. სატრასპორტო
                                    </Typography>
                                    <Typography type='subtitle' className='text-[12px] font-normal text-raisin-30'>
                                        2 დღის წინ
                                    </Typography>
                                </div>
                            </div>
                            <button className="hidden sm:flex w-[40px] h-[40px] bg-grey-100 rounded-full ml-[16px] items-center justify-center shrink-0">
                                <Image src='/icons/chevron-right.svg' alt='chevron' />
                            </button>

                        </div>
                    </li>
                    <li>
                        <div
                            className="py-[16px] flex items-center justify-between border-t-1 border-raisin-10 relative">
                            <span className="w-[8px] h-[8px] rounded-full bg-orange-100 absolute left-[-17px] top-[32px]"></span>
                            <div className="flex">
                             <span className="w-[40px] h-[40px] bg-grey-100 rounded-[12px] mr-[16px] flex items-center justify-center shrink-0">
                                  <Icon
                                      svgPath='canceled'
                                      width={24}
                                      height={24}
                                  />
                            </span>
                                <div className="flex flex-col">
                                    <Typography type='h5' className='text-[16px] font-medium text-raisin-100'>
                                        შემოსულია ახალი ჯავშანი
                                    </Typography>
                                    <Typography type='subtitle' className='text-[14px] font-normal text-raisin-100'>
                                        მართვის მოწმობის თეორიული და პრაქტიკული (მეორე ეტაპი) გამოცდის ჯავშანი. სატრასპორტო
                                    </Typography>
                                    <Typography type='subtitle' className='text-[12px] font-normal text-raisin-30'>
                                        2 დღის წინ
                                    </Typography>
                                </div>
                            </div>
                            <button className="hidden sm:flex w-[40px] h-[40px] bg-grey-100 rounded-full ml-[16px] items-center justify-center shrink-0">
                                <Image src='/icons/chevron-right.svg' alt='chevron' />
                            </button>

                        </div>
                    </li>
                    <li>
                        <div
                            className="py-[16px] flex items-center justify-between border-t-1 border-raisin-10 relative">
                            <span className="w-[8px] h-[8px] rounded-full bg-orange-100 absolute left-[-17px] top-[32px]"></span>
                            <div className="flex">
                             <span className="w-[40px] h-[40px] bg-grey-100 rounded-[12px] mr-[16px] flex items-center justify-center shrink-0">
                                  <Icon
                                      svgPath='ads'
                                      width={24}
                                      height={24}
                                  />
                            </span>
                                <div className="flex flex-col">
                                    <Typography type='h5' className='text-[16px] font-medium text-raisin-100'>
                                        შემოსულია ახალი ჯავშანი
                                    </Typography>
                                    <Typography type='subtitle' className='text-[14px] font-normal text-raisin-100'>
                                        მართვის მოწმობის თეორიული და პრაქტიკული (მეორე ეტაპი) გამოცდის ჯავშანი. სატრასპორტო
                                    </Typography>
                                    <Typography type='subtitle' className='text-[12px] font-normal text-raisin-30'>
                                        2 დღის წინ
                                    </Typography>
                                </div>
                            </div>
                            <button className="hidden sm:flex w-[40px] h-[40px] bg-grey-100 rounded-full ml-[16px] items-center justify-center shrink-0">
                                <Image src='/icons/chevron-right.svg' alt='chevron' />
                            </button>

                        </div>
                    </li>
                    <li>
                        <div
                            className="py-[16px] flex items-center justify-between border-t-1 border-raisin-10 relative">
                            <span className="w-[8px] h-[8px] rounded-full bg-orange-100 absolute left-[-17px] top-[32px]"></span>
                            <div className="flex">
                             <span className="w-[40px] h-[40px] bg-grey-100 rounded-[12px] mr-[16px] flex items-center justify-center shrink-0">
                                  <Icon
                                      svgPath='notification'
                                      width={24}
                                      height={24}
                                  />
                            </span>
                                <div className="flex flex-col">
                                    <Typography type='h5' className='text-[16px] font-medium text-raisin-100'>
                                        შემოსულია ახალი ჯავშანი
                                    </Typography>
                                    <Typography type='subtitle' className='text-[14px] font-normal text-raisin-100'>
                                        მართვის მოწმობის თეორიული და პრაქტიკული (მეორე ეტაპი) გამოცდის ჯავშანი. სატრასპორტო
                                    </Typography>
                                    <Typography type='subtitle' className='text-[12px] font-normal text-raisin-30'>
                                        2 დღის წინ
                                    </Typography>
                                </div>
                            </div>
                            <button className="hidden sm:flex w-[40px] h-[40px] bg-grey-100 rounded-full ml-[16px] items-center justify-center shrink-0">
                                <Image src='/icons/chevron-right.svg' alt='chevron' />
                            </button>

                        </div>
                    </li>
                    <li>
                        <div
                            className="py-[16px] flex items-center justify-between border-t-1 border-raisin-10 relative">
                            <span className="w-[8px] h-[8px] rounded-full bg-orange-100 absolute left-[-17px] top-[32px]"></span>
                            <div className="flex">
                             <span className="w-[40px] h-[40px] bg-grey-100 rounded-[12px] mr-[16px] flex items-center justify-center shrink-0">
                                  <Icon
                                      svgPath='info'
                                      width={24}
                                      height={24}
                                  />
                            </span>
                                <div className="flex flex-col">
                                    <Typography type='h5' className='text-[16px] font-medium text-raisin-100'>
                                        შემოსულია ახალი ჯავშანი
                                    </Typography>
                                    <Typography type='subtitle' className='text-[14px] font-normal text-raisin-100'>
                                        მართვის მოწმობის თეორიული და პრაქტიკული (მეორე ეტაპი) გამოცდის ჯავშანი. სატრასპორტო
                                    </Typography>
                                    <Typography type='subtitle' className='text-[12px] font-normal text-raisin-30'>
                                        2 დღის წინ
                                    </Typography>
                                </div>
                            </div>
                            <button className="hidden sm:flex w-[40px] h-[40px] bg-grey-100 rounded-full ml-[16px] items-center justify-center shrink-0">
                                <Image src='/icons/chevron-right.svg' alt='chevron' />
                            </button>

                        </div>
                    </li>
                </ul>
            </div>

            {/*TODO: Notifications detail page*/}
            <div className='border border-raisin-10 rounded-[16px] md:rounded-[24px] p-[24px] md:py-[40px] md:px-[32px] mx-[16px] lg:mx-0'>
                <div className='flex items-center mb-[48px]'>
                    <button className="flex w-[40px] h-[40px] bg-grey-100 rounded-full mr-[16px] items-center justify-center shrink-0">
                        <Image src='/icons/chevron-right.svg' alt='chevron' className="rotate rotate-180" />
                    </button>
                    <Typography type='h3' className="font-bold md:font-normal text-[14px]">შეტყობინებები</Typography>
                </div>
                <div
                    className="">
                    <div className="flex items-center">
                        <span className="w-[56px] h-[56px] bg-grey-100 rounded-[12px] mr-[24px] flex items-center justify-center shrink-0">
                          <Icon
                              svgPath='approved'
                              width={24}
                              height={24}
                          />
                        </span>
                        <div className="flex flex-col">
                            <Typography type='subtitle' className='text-[12px] font-normal text-raisin-30'>
                                2 დღის წინ
                            </Typography>
                            <Typography type='h5' className='text-[16px] font-medium text-raisin-100'>
                                შემოსულია ახალი ჯავშანი - Jeep Wrangler
                            </Typography>
                        </div>
                    </div>
                    <div className="pl-[80px]">
                        <Typography type='body' className=' text-[14px] font-normal text-raisin-100'>
                            თუ სტუმრობისას პრობლემა შეგექმნებათ, საშუალება გექნებათ, სთხოვოთ მასპინძელს მისი მოგვარება, თანხის ნაწილობრივ დაბრუნება ან ჯავშნის გაუქმება თანხის სრულად დაბრუნებით. მოთხოვნის გადაგზავნა აუცილებელია პრობლემის აღმოჩენიდან 24 საათის განმავლობაში, რის შემდეგაც მასპინძელს გამოხმაურებისთვის 1 საათი ექნება. თუ მასპინძელი უარყოფს მოთხოვნას, ან არ გამოგეხმაურებათ, დახმარებისთვის შეძლებთ Airbnb‑ს მიმართოთ.

                            გადადით სტუმრობებზე და აირჩიეთ სტუმრობა, რომლის გაუქმებაც გსურთ
                            დაწკაპუნებით აირჩიეთ სტუმრობის სხვა გეგმები, შემდეგ კი — დეტალურად
                            დაწკაპუნებით აირჩიეთ შეცვლა ან გაუქმება
                            დაწკაპუნებით აირჩიეთ ჯავშნის გაუქმება

                            თუ სტუმრობისას პრობლემა შეგექმნებათ, საშუალება გექნებათ, სთხოვოთ მასპინძელს მისი მოგვარება, თანხის ნაწილობრივ დაბრუნება ან ჯავშნის გაუქმება თანხის სრულად დაბრუნებით. მოთხოვნის გადაგზავნა აუცილებელია პრობლემის აღმოჩენიდან 24 საათის განმავლობაში, რის შემდეგაც მასპინძელს გამოხმაურებისთვის 1 საათი ექნება. თუ მასპინძელი უარყოფს მოთხოვნას, ან არ გამოგეხმაურებათ, დახმარებისთვის შეძლებთ Airbnb‑ს მიმართოთ.

                            გადადით სტუმრობებზე და აირჩიეთ სტუმრობა, რომლის გაუქმებაც გსურთ
                            დაწკაპუნებით აირჩიეთ სტუმრობის სხვა გეგმები, შემდეგ კი — დეტალურად
                            დაწკაპუნებით აირჩიეთ შეცვლა ან გაუქმება
                            დაწკაპუნებით აირჩიეთ ჯავშნის გაუქმება

                        </Typography>
                        <button className="mt-[40px] flex px-[32px] h-[52px] bg-green-100 text-white text-[14px] rounded-[12px] items-center justify-center">
                            ჯავშნის ნახვა
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notifications
