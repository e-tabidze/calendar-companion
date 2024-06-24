import { useWatch } from 'react-hook-form'
import useProfile from 'src/hooks/useProfile'
import Icon from 'src/views/app/Icon'
import { DefaultButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import { registerLocale } from 'react-datepicker'

import ka from 'date-fns/locale/ka'
import { useTranslation } from 'next-i18next'
import useCurrency from 'src/hooks/useCurrency'
import Toast from 'src/views/components/toast'
import { removeExtraDecimalDigits } from 'src/utils/priceFormat'
import { Discount } from 'src/types/Product'

registerLocale('ka', ka)

interface Props {
  price: number
  days: number | null | undefined
  className?: string
  onClick: () => void
  handleDateChange?: () => void
  disabled: boolean
  changeDates: boolean
  services?: any
  image?: string
  year?: number
  manufacturer?: string
  model?: string
  companyId: number
  control: any
  startDate: any
  endDate: any
  isBooking: boolean
  carDeliveryPrice?: any
  carReturnPrice?: any
  isGelOnly: boolean
  deposit_amount?: number
  deposit_currency?: string
  discounts: any[]
}

const PriceCalcCard: React.FC<Props> = ({
  price,
  days,
  className,
  onClick,
  handleDateChange,
  disabled,
  changeDates = true,
  services,
  image,
  year,
  manufacturer,
  model,
  companyId,
  control,
  startDate,
  endDate,
  isBooking = false,
  carDeliveryPrice,
  carReturnPrice,
  isGelOnly = false,
  deposit_amount,
  deposit_currency,
  discounts
}) => {
  const { userInfo, activeCompanyId } = useProfile()

  const formState = useWatch({ control })
  const { t } = useTranslation()

  const { currency, exchangeRate } = useCurrency()

  const transformDiscountsArrayIntoDays = () => {
    discounts?.forEach((obj: Discount) => {
      if (obj.period === 'კვირა') {
        obj.period = 'დღე'
        obj.number *= 7
      }
    })

    return discounts?.sort((a, b) => b.number - a.number)
  }

  const selectedDiscountPlan = () => {
    const discounts = transformDiscountsArrayIntoDays()

    for (let i = 0; i < discounts?.length; i++) {
      if (discounts && days && days >= discounts[i].number) {
        return discounts[i].discount_percent
      }
    }

    return 0
  }

  // const convertToGEL = (price: number, currency: string): number => {
  //   let convertedPrice = price

  //   if (currency === 'USD') {
  //     convertedPrice = price / exchangeRate

  //     return parseFloat(convertedPrice?.toFixed(3))
  //   } else {
  //     return price
  //   }
  // }

  const convertToGEL = (price: number, currency: string): number => {
    let convertedPrice = price

    if (currency === 'USD') {
      convertedPrice = price / exchangeRate

      return convertedPrice
    } else {
      return price
    }
  }

  // const calculateDaysAndServices = () => {
  //   const deliveryPriceInGEL = carDeliveryPrice
  //     ? convertToGEL(carDeliveryPrice.price, carDeliveryPrice.currency) || 0
  //     : 0
  //   const returnPriceInGEL = carReturnPrice ? convertToGEL(carReturnPrice.price, carReturnPrice.currency) || 0 : 0

  //   const sumPrice =
  //     days &&
  //     (days * price * (100 - selectedDiscountPlan())) / 100 +
  //       (services
  //         ? services.reduce(
  //             (accumulator: number, service: { type_id: number; count: number; price: number; currency: string }) => {
  //               let servicePriceInGEL = service.price

  //               if (service.currency === 'USD') {
  //                 servicePriceInGEL = service.price / exchangeRate
  //               }

  //               if (service.type_id === 1) {
  //                 accumulator += service.count * servicePriceInGEL * days
  //               } else {
  //                 accumulator += service.count * servicePriceInGEL
  //               }

  //               return accumulator
  //             },
  //             0
  //           )
  //         : 0) +
  //       Number(deliveryPriceInGEL) +
  //       Number(returnPriceInGEL)

  //   // return parseFloat(sumPrice?.toFixed(3))
  //   return sumPrice
  // }

  const calculateDailyPrice = () => (price * (100 - selectedDiscountPlan())) / 100

  const calculateRentPrice = () => calculateDailyPrice() * days!

  const calculateServices = () => {
    const sumPrice =
      days && services
        ? services.reduce(
            (accumulator: number, service: { type_id: number; count: number; price: number; currency: string }) => {
              let servicePriceInGEL = service.price

              if (service.currency === 'USD') {
                servicePriceInGEL = service.price / exchangeRate
              }

              if (service.type_id === 1) {
                accumulator += service.count * servicePriceInGEL * days
              } else {
                accumulator += service.count * servicePriceInGEL
              }

              return accumulator
            },
            0
          )
        : 0

    return sumPrice
  }

  // const comission = () => {
  //   const comissionPrice: number = (calculateDaysAndServices() / 100) * 10

  //   return comissionPrice
  // }

  const carDeliveryPriceGeL = () => {
    const deliveryPriceInGEL = carDeliveryPrice
      ? convertToGEL(carDeliveryPrice.price, carDeliveryPrice.currency) || 0
      : 0

    return deliveryPriceInGEL
  }

  const carReturnPriceGel = () => {
    const returnPriceInGEL = carReturnPrice ? convertToGEL(carReturnPrice.price, carReturnPrice.currency) || 0 : 0

    return returnPriceInGEL
  }

  const calculatePrice = () => {
    const sumPrice = calculateRentPrice() + calculateServices() + carDeliveryPriceGeL() + carReturnPriceGel()
    
    return parseFloat(sumPrice).toFixed(2)
  }

  // const calculateSum = () => {
  //   const sumPrice = comission() + calculateDaysAndServices()

  //   return parseFloat(sumPrice?.toFixed(3))
  // }

  return (
    <div className={`shadow-2xl w-full rounded-3xl pt-5 px-4 lg:px-6 pb-10 ${className}`}>
      {image && (
        <div className='flex items-center gap-8 mb-6 justify-between'>
          <div className='min-w-[45%]'>
            <Typography type='h3' className='font-bold'>
              {manufacturer} {model} {year}
            </Typography>
            <Typography type='body' className='text-2sm'>
              {t('or_similar')}
            </Typography>
          </div>
          {image && (
            <div className='rounded-lg overflow-hidden'>
              <Image src={image} alt='' height={'100%'} width={'100%'} className='object-cover' />
            </div>
          )}
        </div>
      )}

      {image && (
        <div>
          <div className='flex items-center mt-4'>
            <Icon svgPath='booking-start' height={24} width={24} className='fill-transparent flex shrink-0' />
            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              {startDate}
            </Typography>

            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              {formState?.start_time}
            </Typography>
            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              -
            </Typography>
            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              {formState?.start_address}
            </Typography>
          </div>

          <div className='flex items-center my-3'>
            <Icon svgPath='booking-stop' height={24} width={24} className='fill-transparent flex shrink-0' />
            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              {endDate}
            </Typography>

            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              {formState?.end_time}
            </Typography>
            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              -
            </Typography>
            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              {formState?.end_address}
            </Typography>
          </div>

          <Divider className='my-7' />
        </div>
      )}

      <div className='flex items-center gap-2'>
        <Typography type='h3' className='font-bold flex gap-3'>
          {/* {removeLastDigitIfThreeDecimalPlaces(parseFloat((price * (100 - selectedDiscountPlan())) / 100).toFixed(3))} */}
          {removeExtraDecimalDigits(parseFloat(calculateDailyPrice().toFixed(4)))}
          {/* {(price * (100 - selectedDiscountPlan())) / 100} */}
          {isBooking ? '₾' : currency === 'GEL' ? '₾' : '$'}
        </Typography>
        <Typography type='h5' weight='normal'>
          / {t('day')}
        </Typography>
      </div>

      <div className='flex gap-3 lg:items-center mb-6 flex-col lg:flex-row'>
        {startDate && endDate ? (
          <div className='flex gap-1'>
            <Typography type='body' className='text-2sm'>
              {startDate} - {endDate}
            </Typography>
            <Typography type='body' color='light' className='text-2sm'>
              | {days} {t('day')}
            </Typography>
          </div>
        ) : (
          <></>
        )}
        {changeDates && (
          <button
            className='border border-raisin-100 rounded-[8px] px-2 py-1 text-sm transition-all hover:bg-raisin-5'
            onClick={handleDateChange}
          >
            {startDate && endDate ? t('change') : t('select_date')}
          </button>
        )}
      </div>

      <Divider />
      <Typography type='h5' weight='medium' className='mt-8 mb-5 font-bold'>
        {t('rent_price')}
      </Typography>

      {startDate && endDate ? (
        <>
          <div className='flex gap-2 flex-col justify-between py-2 lg:items-center lg:flex-row'>
            <div className='flex gap-2'>
              <Typography type='body' className='text-raisin-100'>
                {t('rental_price_daily')}
              </Typography>
              <Typography type='body' color='light'>
                | {days} {t('day')}
              </Typography>
            </div>
            <Typography type='h5' weight='normal'>
              {/* {days &&
                price &&
                removeLastDigitIfThreeDecimalPlaces(
                  parseFloat((price * days * (100 - selectedDiscountPlan())) / 100).toFixed(3)
                )} */}
              {/* {calculateRentPrice()} */}
              {removeExtraDecimalDigits(parseFloat(calculateRentPrice().toFixed(4)))}
              {/* {days && Math.ceil(((price * (100 - selectedDiscountPlan())) / 100) * days * 100) / 100} */}
              {/* {days && ((price * (100 - selectedDiscountPlan())) / 100) * days} */}
              {isGelOnly ? '₾' : currency === 'GEL' ? '₾' : '$'}
            </Typography>
          </div>

          {services?.map((service: any) => (
            <div className='flex gap-2 flex-col justify-between py-2 lg:items-center lg:flex-row' key={service.id}>
              <div className='flex gap-2'>
                <Typography type='body' className='text-raisin-100'>
                  {service?.title}
                </Typography>
                <Typography type='body' color='light'>
                  | {t('quantity')}: {service?.count}
                </Typography>
              </div>
              <Typography type='h5' weight='normal'>
                {service?.type_id === 1
                  ? convertToGEL(service?.price * days!, service?.currency)
                  : convertToGEL(service?.count * service?.price, service?.currency)}
                {isGelOnly ? '₾' : currency === 'GEL' ? '₾' : '$'}
              </Typography>
            </div>
          ))}

          {carDeliveryPrice !== undefined && (
            <div className='flex gap-2 flex-col justify-between py-2 lg:items-center lg:flex-row'>
              <div className='flex gap-2'>
                <Typography type='body' className='text-raisin-100'>
                  ავტომობილის მიწოდება
                </Typography>
              </div>
              <Typography type='h5' weight='normal'>
                {carDeliveryPrice !== undefined &&
                Object.keys(carDeliveryPrice).length === 0 &&
                carDeliveryPrice.constructor === Object
                  ? 'უფასო'
                  : `${parseFloat(carDeliveryPriceGeL().toFixed(2))} ₾`}
              </Typography>
            </div>
          )}

          {carReturnPrice !== undefined && (
            <div className='flex gap-2 flex-col justify-between py-2 lg:items-center lg:flex-row'>
              <div className='flex gap-2'>
                <Typography type='body' className='text-raisin-100'>
                  ავტომობილის მიწოდება
                </Typography>
              </div>
              <Typography type='h5' weight='normal'>
                {carReturnPrice !== undefined &&
                Object.keys(carReturnPrice).length === 0 &&
                carReturnPrice.constructor === Object
                  ? 'უფასო'
                  : `${parseFloat(Number(carReturnPriceGel()).toFixed(2))} ₾`}
              </Typography>
            </div>
          )}

          {/* {isBooking && (
            <div className='flex gap-2 flex-col justify-between py-2 lg:items-center lg:flex-row'>
              <div className='flex gap-2'>
                <Typography type='body' className='text-raisin-100'>
                  საიტის მომსახურების საკომისიო
                </Typography>
              </div>
              <Typography type='h5' weight='normal'>
                {removeLastDigitIfThreeDecimalPlaces(comission())}
              </Typography>
            </div>
          )} */}

          {deposit_amount && deposit_currency && (
            <Toast
              className='mt-4'
              type='warning'
              title={
                <>
                  გამქირავებლის მოთხოვნის საფუძველზე თანხას დაემატება{' '}
                  <span className='font-bold'>
                    სადეპოზიტო თანხა {deposit_amount}
                    {deposit_currency === 'GEL' ? '₾' : '$'}
                  </span>
                  , რომელსაც გადაიხდით ადგილზე
                </>
              }
            />
          )}

          <Divider className='my-7' />

          <div className='flex gap-2 flex-col justify-between pb-7 lg:items-center lg:flex-row'>
            <div className='flex gap-2'>
              <Typography type='h5' className='text-raisin-100 font-bold'>
                {t('sum')}
              </Typography>
            </div>
            {days && (
              <Typography type='h5' weight='normal' className='font-bold'>
                {/* {isBooking
                  ? removeLastDigitIfThreeDecimalPlaces(calculateSum())
                  : removeLastDigitIfThreeDecimalPlaces(calculateDaysAndServices())} */}
                {calculatePrice()}
                {isGelOnly ? '₾' : currency === 'GEL' ? '₾' : '$'}
              </Typography>
            )}
          </div>
        </>
      ) : (
        <></>
      )}

      {activeCompanyId === companyId || userInfo?.active_profile_id === userInfo?.UserID ? (
        <DefaultButton
          bg='bg-orange-100 hover:bg-orange-110 transition-all'
          text={t('start_renting')}
          className='w-full'
          textColor='text-white'
          type='submit'
          onClick={onClick}
          disabled={days === null || disabled}
        />
      ) : null}
    </div>
  )
}

export default PriceCalcCard
