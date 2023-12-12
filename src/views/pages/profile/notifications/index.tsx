import Typography from 'src/views/components/typography'
import Icon from "../../../app/Icon";

const Notifications = () => {
    return (
        <>
            <div className='border border-raisin-10 rounded-2xl md:rounded-3xl p-6 md:py-10 md:px-8 mx-4 lg:mx-0'>
                <div className='flex justify-between items-center pb-4'>
                    <Typography type='h3' className="font-bold md:font-normal text-md md:text-2lg">შეტყობინებები</Typography>
                    <button className="text-sm md:text-2sm text-black ml-10 whitespace-normal">ყველას წაკითხულად მონიშვნა</button>
                </div>
                <ul>
                    <li>
                        <div
                            className="py-4 flex items-center justify-between border-t-1 border-raisin-10 relative">
                            <span className="w-2 h-2 rounded-full bg-orange-100 absolute left-[-17px] top-8"></span>
                            <div className="flex">
                             <span className="w-10 h-10 bg-grey-100 rounded-xl mr-4 flex items-center justify-center shrink-0">
                                  <Icon
                                      svgPath='approved'
                                      width={24}
                                      height={24}
                                  />
                            </span>
                                <div className="flex flex-col">
                                    <Typography type='h5' className='text-md font-medium text-raisin-100'>
                                        შემოსულია ახალი ჯავშანი
                                    </Typography>
                                    <Typography type='subtitle' className='text-2sm font-normal text-raisin-100'>
                                        მართვის მოწმობის თეორიული და პრაქტიკული (მეორე ეტაპი) გამოცდის ჯავშანი. სატრასპორტო
                                    </Typography>
                                    <Typography type='subtitle' className='text-sm font-normal text-raisin-30'>
                                        2 დღის წინ
                                    </Typography>
                                </div>
                            </div>
                            <button className="hidden sm:flex w-10 h-10 bg-grey-100 rounded-full ml-4 items-center justify-center shrink-0">
                                <Icon svgPath='chevron-right' width={20} height={20} className='fill-transparent'/>
                            </button>

                        </div>
                    </li>
                    <li>
                        <div
                            className="py-4 flex items-center justify-between border-t-1 border-raisin-10 relative">
                            <span className="w-2 h-2 rounded-full bg-orange-100 absolute left-[-17px] top-8"></span>
                            <div className="flex">
                             <span className="w-10 h-10 bg-grey-100 rounded-xl mr-4 flex items-center justify-center shrink-0">
                                  <Icon
                                      svgPath='canceled'
                                      width={24}
                                      height={24}
                                  />
                            </span>
                                <div className="flex flex-col">
                                    <Typography type='h5' className='text-md font-medium text-raisin-100'>
                                        შემოსულია ახალი ჯავშანი
                                    </Typography>
                                    <Typography type='subtitle' className='text-2sm font-normal text-raisin-100'>
                                        მართვის მოწმობის თეორიული და პრაქტიკული (მეორე ეტაპი) გამოცდის ჯავშანი. სატრასპორტო
                                    </Typography>
                                    <Typography type='subtitle' className='text-sm font-normal text-raisin-30'>
                                        2 დღის წინ
                                    </Typography>
                                </div>
                            </div>
                            <button className="hidden sm:flex w-10 h-10 bg-grey-100 rounded-full ml-4 items-center justify-center shrink-0">
                                <Icon svgPath='chevron-right' width={20} height={20} className='fill-transparent'/>
                            </button>

                        </div>
                    </li>
                    <li>
                        <div
                            className="py-4 flex items-center justify-between border-t-1 border-raisin-10 relative">
                            <span className="w-2 h-2 rounded-full bg-orange-100 absolute left-[-17px] top-8"></span>
                            <div className="flex">
                             <span className="w-10 h-10 bg-grey-100 rounded-xl mr-4 flex items-center justify-center shrink-0">
                                  <Icon
                                      svgPath='ads'
                                      width={24}
                                      height={24}
                                  />
                            </span>
                                <div className="flex flex-col">
                                    <Typography type='h5' className='text-md font-medium text-raisin-100'>
                                        შემოსულია ახალი ჯავშანი
                                    </Typography>
                                    <Typography type='subtitle' className='text-2sm font-normal text-raisin-100'>
                                        მართვის მოწმობის თეორიული და პრაქტიკული (მეორე ეტაპი) გამოცდის ჯავშანი. სატრასპორტო
                                    </Typography>
                                    <Typography type='subtitle' className='text-sm font-normal text-raisin-30'>
                                        2 დღის წინ
                                    </Typography>
                                </div>
                            </div>
                            <button className="hidden sm:flex w-10 h-10 bg-grey-100 rounded-full ml-4 items-center justify-center shrink-0">
                                <Icon svgPath='chevron-right' width={20} height={20} className='fill-transparent'/>
                            </button>

                        </div>
                    </li>
                    <li>
                        <div
                            className="py-4 flex items-center justify-between border-t-1 border-raisin-10 relative">
                            <span className="w-2 h-2 rounded-full bg-orange-100 absolute left-[-17px] top-8"></span>
                            <div className="flex">
                             <span className="w-10 h-10 bg-grey-100 rounded-xl mr-4 flex items-center justify-center shrink-0">
                                  <Icon
                                      svgPath='notification'
                                      width={24}
                                      height={24}
                                  />
                            </span>
                                <div className="flex flex-col">
                                    <Typography type='h5' className='text-md font-medium text-raisin-100'>
                                        შემოსულია ახალი ჯავშანი
                                    </Typography>
                                    <Typography type='subtitle' className='text-2sm font-normal text-raisin-100'>
                                        მართვის მოწმობის თეორიული და პრაქტიკული (მეორე ეტაპი) გამოცდის ჯავშანი. სატრასპორტო
                                    </Typography>
                                    <Typography type='subtitle' className='text-sm font-normal text-raisin-30'>
                                        2 დღის წინ
                                    </Typography>
                                </div>
                            </div>
                            <button className="hidden sm:flex w-10 h-10 bg-grey-100 rounded-full ml-4 items-center justify-center shrink-0">
                                <Icon svgPath='chevron-right' width={20} height={20} className='fill-transparent'/>
                            </button>

                        </div>
                    </li>
                    <li>
                        <div
                            className="py-4 flex items-center justify-between border-t-1 border-raisin-10 relative">
                            <span className="w-2 h-2 rounded-full bg-orange-100 absolute left-[-17px] top-8"></span>
                            <div className="flex">
                             <span className="w-10 h-10 bg-grey-100 rounded-xl mr-4 flex items-center justify-center shrink-0">
                                  <Icon
                                      svgPath='info'
                                      width={24}
                                      height={24}
                                  />
                            </span>
                                <div className="flex flex-col">
                                    <Typography type='h5' className='text-md font-medium text-raisin-100'>
                                        შემოსულია ახალი ჯავშანი
                                    </Typography>
                                    <Typography type='subtitle' className='text-2sm font-normal text-raisin-100'>
                                        მართვის მოწმობის თეორიული და პრაქტიკული (მეორე ეტაპი) გამოცდის ჯავშანი. სატრასპორტო
                                    </Typography>
                                    <Typography type='subtitle' className='text-sm font-normal text-raisin-30'>
                                        2 დღის წინ
                                    </Typography>
                                </div>
                            </div>
                            <button className="hidden sm:flex w-10 h-10 bg-grey-100 rounded-full ml-4 items-center justify-center shrink-0">
                                <Icon svgPath='chevron-right' width={20} height={20} className='fill-transparent'/>
                            </button>

                        </div>
                    </li>
                </ul>
            </div>

            {/*TODO: Notifications detail page*/}
            <div className='border border-raisin-10 rounded-2xl md:rounded-3xl p-6 md:py-10 md:px-8 mx-4 lg:mx-0'>
                <div className='flex items-center mb-12'>
                    <button className="flex w-10 h-10 bg-grey-100 rounded-full mr-4 items-center justify-center shrink-0">
                        <Icon svgPath='chevron-right' width={20} height={20} className='fill-transparent'/>
                    </button>
                    <Typography type='h3' className="font-bold md:font-normal text-2sm">შეტყობინებები</Typography>
                </div>
                <div
                    className="">
                    <div className="flex items-center">
                        <span className="w-14 h-14 bg-grey-100 rounded-xl mr-6 flex items-center justify-center shrink-0">
                          <Icon
                              svgPath='approved'
                              width={24}
                              height={24}
                          />
                        </span>
                        <div className="flex flex-col">
                            <Typography type='subtitle' className='text-sm font-normal text-raisin-30'>
                                2 დღის წინ
                            </Typography>
                            <Typography type='h5' className='text-md font-medium text-raisin-100'>
                                შემოსულია ახალი ჯავშანი - Jeep Wrangler
                            </Typography>
                        </div>
                    </div>
                    <div className="pl-20">
                        <Typography type='body' className=' text-2sm font-normal text-raisin-100'>
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
                        <button className="mt-10 flex px-8 h-13 bg-green-100 text-white text-2sm rounded-xl items-center justify-center">
                            ჯავშნის ნახვა
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notifications
