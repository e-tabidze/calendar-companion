/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/@core/**/*.{js,ts,jsx,tsx}', './src/views/**/*.{js,ts,jsx,tsx}', './src/layouts/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // tbcx: ['TBCXRegular', 'sans-serif'],
        light: ['TBCXLight', 'sans-serif'],
        normal: ['TBCXRegular', 'sans-serif'],
        medium: ['TBCXMedium', 'sans-serif'],
        bold: ['TBCXBold', 'sans-serif'],
        black: ['TBCXBlack', 'sans-serif']
      },
      fontSize: {
        xs: ['10px'],
        sm: ['12px'],
        '2sm': ['14px'],
        md: ['16px'],
        '2md': ['18px'],
        '3md': ['20px'],
        lg: ['22px'],
        '2lg': ['24px'],
        '3lg': ['32px'],
        xl: ['38px'],
        '2xl': ['40px']
      },
      borderWidth: {
        1: '1px'
      },
      screens: {
        // xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      colors: {
        orange: {
          130: '#B12E00',
          120: '#CA3400',
          110: '#E43B00',
          100: '#FD4100',
          90: '#FD541A',
          80: '#FD6733',
          70: '#FE7A4D',
          30: '#FEC6B3',
          20: '#FFD9CC',
          10: '#FFECE6'
        },
        green: {
          130: '3B695C',
          120: '#43786A',
          110: '#4C8777',
          100: '#549684',
          90: '#65A090',
          80: '#84B3A6',
          70: '#87B6A9',
          60: '#98C0B5',
          50: '#A9CBC1',
          40: '#BBD5CE',
          30: '#CCE0DA',
          20: '#DDEAE6',
          10: '#DDEAE6'
        },
        raisin: {
          130: '#1B1D27',
          120: '#1F222C',
          110: '#232632',
          100: '#272A37',
          90: '#3D3F4B',
          80: '#52555F',
          70: '#686A73',
          60: '#7D7F87',
          50: '#93959B',
          40: '#A9AAAF',
          30: '#BEBFC3',
          20: '#00000033',
          10: '#E9EAEB',
          7: '#00000012',
          5: '#F4F4F5'
        },
        grey: {
          130: '#A9AAAC',
          120: '#C2C2C5',
          110: '#DADBDD',
          100: '#F2F3F6',
          90: '#F3F4F7',
          80: '#F5F5F8',
          70: '#F6F7F9',
          60: '#F7F8FA'
        },
        blue: {
          130: '#004AB3',
          120: '#0055CC',
          110: '#005FE6',
          100: '#006AFF',
          90: '#1A79FF',
          80: '#3388FF',
          70: '#4D97FF',
          60: '#66A6FF',
          50: '#80B5FF',
          40: '#99C3FF',
          30: '#B3D2FF',
          20: '#CCE1FF',
          10: '#E6F0FF'
        },
        yellow: {
          130: '#B08600',
          120: '#CA9A00',
          110: '#E3AD00',
          100: '#FCC000',
          90: '#FCC61A',
          80: '#FDCD33',
          70: '#FDD34D',
          60: '#FDD966',
          50: '#FEE080',
          40: '#FEE699',
          30: '#FEECB3',
          20: '#FEF2CC',
          10: '#FFF9E6'
        },
        red: {
          130: '#AD0000',
          120: '#C60000',
          110: '#DE0000',
          100: '#F70000',
          90: '#F81A1A',
          80: '#F93333',
          70: '#F94D4D',
          60: '#FA6666',
          50: '#FB8080',
          40: '#FC9999',
          30: '#FDB3B3',
          20: '#FDCCCC',
          10: '#FEE6E6'
        },
        base: {
          100: '#1B1C1E',
          50: '#1b1c1e80'
        }
      },
      widths: {
        maxWidth: '1470px'
      },
      boxShadow: {
        top: '0px -4px 16px rgba(253, 65, 0, 0.1), 0px 4px 16px rgba(0, 0, 0, 0.1)',
        sm: '0px 4px 16px rgba(0, 0, 0, 0.1)',
        md: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        lg: '0px 8px 16px rgba(0, 0, 0, 0.1)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ]
}
