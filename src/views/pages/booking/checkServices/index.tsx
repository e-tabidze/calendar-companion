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
    <div className='border border-raisin-10 rounded-xl p-10'>
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
                      className={`flex items-center justify-center w-8 h-8 rounded-lg border mr-6 ${
                        service.is_selected ? 'border-green-100 bg-green-100' : 'border-raisin-10'
                      }`}
                    >
                      <Icon svgPath='check' height={10} width={14} className='fill-transparent' />
                    </span>
                    <input type='checkbox' value={value} className='absolute opacity-0 w-0 h-0' onChange={onChange} />
                    <Typography type='body' className='text-md'>
                      {service.title}
                    </Typography>
                    <Typography type='subtitle' className='text-black/40 text-sm ml-4'>
                      {service.description}
                    </Typography>
                  </div>
                  <div className='flex items-center gap-16'>
                    {/* {service.type === 1 || service.type === 2 ? ( */}
                    <Typography type='body' className='text-md w-max'>
                      {service.price} ₾
                    </Typography>
                    <div
                      onClick={event => {
                        event.stopPropagation()
                      }}
                    >
                      {service.is_selected ? (
                        <Counter name={`additional_services.${index}.count`} control={control} />
                      ) : (
                        <Counter name={`additional_services.${index}.count`} control={control} disabled />
                      )}
                    </div>
                    {/* ) : (
                      <></>
                    )} */}

                    <Typography type='subtitle' className='text-md'>
                      {service.type === 1
                        ? `${service?.price !== null ? service.price : ``}`
                        : service.type === 2
                        ? `${service?.price !== null ? service.price : ``}`
                        : service.type === 2
                        ? 'უფასო'
                        : ''}
                    </Typography>
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
