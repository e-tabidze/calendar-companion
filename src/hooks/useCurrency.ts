import { useEffect, useState } from 'react'

const useCurrency = () => {
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'GEL')

  useEffect(() => {
    const handleCurrencyChange = () => {
      setCurrency(localStorage.getItem('currency') || 'GEL')
    }

    window.addEventListener('currencyChange', handleCurrencyChange)

    return () => window.removeEventListener('currencyChange', handleCurrencyChange)
  }, [])

  return currency
}

export default useCurrency
