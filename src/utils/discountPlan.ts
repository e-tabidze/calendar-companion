import { Discount } from 'src/types/Product'

export const transformDiscountsArrayIntoDays = (discounts: Discount[]) => {
  discounts?.forEach((obj: Discount) => {
    if (obj.period === 'კვირა') {
      obj.period = 'დღე'
      obj.number *= 7
    }
  })

  return discounts?.sort((a, b) => b.number - a.number)
}

export const selectedDiscountPlan = (discountArray: Discount[], days: number) => {
  const discounts = transformDiscountsArrayIntoDays(discountArray)

  for (let i = 0; i < discounts?.length; i++) {
    if (discounts && days && days >= discounts[i].number) {
      return discounts[i].discount_percent
    }
  }

  return 0
}
