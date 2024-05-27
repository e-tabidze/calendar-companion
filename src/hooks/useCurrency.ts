import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import CurrencyService from 'src/services/CurrencyService'

const useCurrency = () => {
  const [currency, setCurrency] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedCurrency = localStorage.getItem('currency')
      if (storedCurrency) {
        return storedCurrency
      } else {
        localStorage.setItem('currency', 'GEL')

        return 'GEL'
      }
    }

    return 'GEL'
  })

  useEffect(() => {
    const handleCurrencyChange = () => {
      setCurrency(localStorage.getItem('currency') || 'GEL')
    }

    window.addEventListener('currencyChange', handleCurrencyChange)

    return () => {
      window.removeEventListener('currencyChange', handleCurrencyChange)
    }
  }, [])

  const useCurrencyRates: any = useQuery({
    queryKey: ['currencyRates'],
    queryFn: () => getCurrencyRates(''),
    staleTime: Infinity,
    enabled: true
  })

  const currencyRates = useCurrencyRates?.data?.result?.data

  const updateCurrency = (newCurrency: string) => {
    localStorage.setItem('currency', newCurrency)
    window.dispatchEvent(new Event('currencyChange'))
  }

  return { currency, currencyRates, updateCurrency }
}

export default useCurrency

export const getCurrencyRates = async (AccessToken = '') => {
  try {
    const response: any = await CurrencyService.getCurrencyRates(AccessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
