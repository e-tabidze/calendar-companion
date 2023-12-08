import { Controller } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import Counter from 'src/views/components/counter'
import Typography from 'src/views/components/typography'

interface Option {
  id: string | number
  title: string | number
  icon?: string
  is_selected: boolean
  type: number
  description: string
  price: string
}

interface Props {
  control?: any
  options?: Option[]
}

const CheckServices: React.FC<Props> = ({ control, options }) => {
  console.log(options, 'options')

  return (
    <>
      {options?.map((service, index) => (
        <>
          <Controller
            name={`additional_services.${index}.is_selected`}
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <div onClick={() => onChange(!service.is_selected)} className='flex items-center'>
                  <span
                    className={`flex items-center justify-center w-5 h-5 rounded border ${
                      service.is_selected ? 'border-green-100 bg-green-100' : 'border-raisin-10'
                    }`}
                  >
                    <Icon svgPath='check' height={10} width={14} className='fill-transparent' />
                  </span>
                  <input type='checkbox' value={value} className='absolute opacity-0 w-0 h-0' onChange={onChange} />
                  <Typography type='body' className='w-max'>
                    {service.title}
                  </Typography>
                  <Typography type='subtitle' color='light' className='text-xs'>
                    {service.description}
                  </Typography>
                  {service.type === 1 || service.type === 2 ? (
                    <div
                      onClick={event => {
                        event.stopPropagation()
                      }}
                    >
                      <Counter name={`additional_services.${index}.count`} control={control} />
                    </div>
                  ) : (
                    <></>
                  )}

                  <Typography type='subtitle'>
                    {service.type === 1
                      ? `${service?.price !== null ? service.price : 0}/დღე`
                      : service.type === 2
                      ? `${service?.price !== null ? service.price : 0}/ფასი ერთჯერადად`
                      : service.type === 2
                      ? 'უფასო'
                      : ''}
                  </Typography>
                </div>
              </>
            )}
          />
        </>
      ))}
    </>
  )
}

export default CheckServices
