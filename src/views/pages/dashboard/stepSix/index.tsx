import { useWatch } from 'react-hook-form'

// import MapPicker from 'src/views/components/mapPicker'
import useProductInfo from '../useProductInfo'
import ReturnLocations from './returnLocations'
import CarryAwayLocations from './carryAwayLocations'

interface Props {
  control: any
  errors: any
}
const StepSix: React.FC<Props> = ({ control, errors }) => {
  const { companyBranches } = useProductInfo()

  const formState = useWatch({ control })

  const cities = () => companyBranches?.map((branch: any) => ({ label: branch.city, value: branch.city }))

  const renderAddresses = (name: string) => {
    const selected = formState[name] && companyBranches?.find((v: any) => v.city === formState[name] && v.city)

    return selected?.addresses?.map((address: any) => ({
      label: address,
      value: address
    }))
  }

  return (
    <div>
   
      <CarryAwayLocations control={control} errors={errors} cities={cities()} addresses={renderAddresses('start_city')} />

      <ReturnLocations control={control} errors={errors} cities={cities()} addresses={renderAddresses('end_city')} />

      {/* <MapPicker height='275px' borderRadius='16px' /> */}
    </div>
  )
}

export default StepSix
