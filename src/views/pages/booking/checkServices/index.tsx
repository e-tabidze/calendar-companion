import { Controller } from 'react-hook-form'
import dynamic from 'next/dynamic'

const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
const Counter = dynamic(() => import('src/views/components/counter'), { ssr: false })
interface Option {
  id: string | number
  title: string | number
  icon?: string
  is_selected: boolean
  type_id: number
  description: string
  price: string
  max: number
}

interface Props {
  control?: any
  options?: Option[]
}

const CheckServices: React.FC<Props> = ({ control, options }) => {
  console.log(options, 'options')

  return (
    <div className='md:border md:border-raisin-10 md:rounded-xl md:p-10'>
      {options?.map((service, index) => (
        <>
          <Controller
            name={`additional_services.${index}.is_selected`}
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <div
                  key={service.id}
                  onClick={() => onChange(!service.is_selected)}
                  className='flex items-center justify-between py-5 border-b-1 border-raisin-10 last:border-none'
                >
                  <div className='flex items-center'>
                    <span
                      className={`flex shrink-0 items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-lg border mr-4 md:mr-6 ${
                        service.is_selected ? 'border-green-100 bg-green-100' : 'border-raisin-10'
                      }`}
                    >
                      <Icon svgPath='check' height={10} width={14} className='fill-transparent' />
                    </span>
                    <input type='checkbox' value={value} className='absolute opacity-0 w-0 h-0' onChange={onChange} />
                    <div className='flex flex-col md:flex-row md:items-center md:gap-4'>
                      <Typography type='body' className='text-2sm md:text-md'>
                        {service.title}
                      </Typography>
                      <Typography type='subtitle' className='text-black/40 text-sm'>
                        {service.description}
                      </Typography>
                    </div>
                  </div>
                  <div className='flex items-center gap-16'>
                    {service.type_id === 1 || service.type_id === 2 ? (
                      <>
                        <div
                          onClick={event => {
                            event.stopPropagation()
                          }}
                        >
                          <Counter
                            name={`additional_services.${index}.count`}
                            control={control}
                            disabled={!service?.is_selected}
                            max={service?.max}
                          />
                        </div>
                        <Typography type='body' className='text-2sm md:text-md w-max'>
                          {service.price} ₾
                        </Typography>
                      </>
                    ) : (
                      <Typography type='body' className='text-2sm md:text-md w-max text-green-100 font-bold'>
                        უფასო
                      </Typography>
                    )}
                  </div>
                </div>
              </>
            )}
          />
        </>
      ))}
    </div>
  )
}

export default CheckServices
