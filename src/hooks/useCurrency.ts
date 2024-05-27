import { useEffect, useState } from 'react';

const useCurrency = () => {
  const [currency, setCurrency] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedCurrency = localStorage.getItem('currency');
      if (storedCurrency) {
        
        return storedCurrency;
      } else {
        localStorage.setItem('currency', 'GEL');

        return 'GEL';
      }
    }

    return 'GEL';
  });

  useEffect(() => {
    const handleCurrencyChange = () => {
      setCurrency(localStorage.getItem('currency') || 'GEL');
    };

    window.addEventListener('currencyChange', handleCurrencyChange);

    return () => {
      window.removeEventListener('currencyChange', handleCurrencyChange);
    };
  }, []);

  return currency;
};

export default useCurrency;
