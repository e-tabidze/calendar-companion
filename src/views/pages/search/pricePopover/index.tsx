import { DefaultInput } from 'src/views/components/input'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import { DefaultButton, IconButton } from 'src/views/components/button'
import { ActionsWrapper, Divider, TagsWrapper } from './styles'
import { Popover } from '@headlessui/react'
import Typography from 'src/views/components/typography'
import Icon from 'src/views/app/Icon'

interface Props {
  control: any
  handleSubmit: () => void
}

const PricePopover: React.FC<Props> = ({ control, handleSubmit }) => {
  return (
    <PopoverDropdown label='ფასი' maxWidth='max-w-md'>
      <TagsWrapper>
        <DefaultInput label={'მინიმუმ ფასი დღიურად'} name='price_min' control={control} />
        <Divider />
        <DefaultInput label={'მაქსიმუმ ფასი დღიურად'} name='price_max' control={control} />
      </TagsWrapper>
      <ActionsWrapper>
        <IconButton icon='/icons/rotate.svg' text='გასუფთავება' hasBg={false} width={16} height={16} />
        <DefaultButton
          text='შენახვა'
          bg='bg-orange-100'
          textColor='text-white'
          type='submit'
          onClick={() => {
            handleSubmit()
            close()
          }}
        />
      </ActionsWrapper>
    </PopoverDropdown>
    
    // <div className='block'>
    //   <Popover className='relative'>
    //     <Popover.Button className='flex items-center w-max h-10 border border-gray-90 rounded-xl gap-3 px-4 cursor-pointer'>
    //       <Typography type='body'>ფასი</Typography>
    //       <Icon svgPath='chevron' width={20} height={20} />
    //     </Popover.Button>

    //     <Popover.Panel
    //       className={`absolute z-50 w-max mt-4 p-7 h-fit rounded-2xl shadow-2xl bg-white header-shadow px-5px py-5px text-xs top-100 left-0 right-0`}
    //     >
    //       {({ close }) => (
    //         <>
    //           <TagsWrapper>
    //             <DefaultInput label={'მინიმუმ ფასი დღიურად'} name='price_min' control={control} />
    //             <Divider />
    //             <DefaultInput label={'მაქსიმუმ ფასი დღიურად'} name='price_max' control={control} />
    //           </TagsWrapper>
    //           <ActionsWrapper>
    //             <IconButton icon='/icons/rotate.svg' text='გასუფთავება' hasBg={false} width={16} height={16} />
    //             <DefaultButton
    //               text='შენახვა'
    //               bg='bg-orange-100'
    //               textColor='text-white'
    //               type='submit'
    //               onClick={() => {
    //                 handleSubmit()
    //                 close()
    //               }}
    //             />
    //           </ActionsWrapper>
    //         </>
    //       )}
    //     </Popover.Panel>
    //   </Popover>
    // </div>
  )
}

export default PricePopover
