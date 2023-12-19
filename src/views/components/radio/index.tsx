import { useController } from 'react-hook-form'
import { RadioGroup } from '@headlessui/react'
import tw from 'tailwind-styled-components'
import { ReactComponentElement } from 'react'
import Icon from "src/views/app/Icon";

interface Option {
  label: string
  value: string | number
  children?: ReactComponentElement<any>
}

interface Props {
  name: string
  options: Option[]
  control?: any
  color: string
  horizontal?: boolean
}

const Radio: React.FC<Props> = ({ name, options, control, color, horizontal }) => {
  const { field } = useController({
    name,
    control
  })

  const Circle = tw.div<{
    checked: boolean
  }>`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full border border-raisin-1300  outline-none ${props =>
    props.checked ? `${color} border-0` : ''}`

  return (
    <RadioGroup value={field.value} onChange={field.onChange}>
      <div className={`${horizontal ? 'flex gap-2 w-full' : ''}`}>
        {options.map((option: any) => (
          <RadioGroup.Option key={option.value} value={option.value} className='w-full'>
            {({ checked }) => (
              <div className='my-2'>
                <div
                
                  //   className={`'flex justify-between items-center w-full
                  //   ${checked ? 'border border-orange-100 py-4 px-4 w-full rounded-xl' : ''}
                  //   ${horizontal && 'border border-raisin-10 py-4 w-full px-4 rounded-xl'}
                  //  `}
                  className={`'flex justify-between items-center w-full rounded-xl border p-4 ${
                    checked ? ' border-orange-100' : 'border-raisin-10'
                  } 
               `}
                >
                  <RadioGroup.Label className='flex gap-4 items-center' style={{ margin: '0px' }}>
                    <Circle checked={checked}>
                      {checked &&  <Icon svgPath='check' width={14} height={10} className='fill-transparent'/>}
                    </Circle>
                    <span className='text-sm md:text-2sm'>{option.label}</span>
                  </RadioGroup.Label>
                  {option.info && (
                    <RadioGroup.Description className='text-raisin-130' as='span'>
                      {option.info}
                    </RadioGroup.Description>
                  )}
                </div>
                {checked && option.children && <div className='mt-6'> {option.children} </div>}
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}

export default Radio
