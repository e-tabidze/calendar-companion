import { useRef } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'

const roles = ['editor', 'viewer']

interface Props {
  role: string
  onUpdateRole: (role: string) => void
}

const ParticipantRolePopover: React.FC<Props> = ({ role, onUpdateRole }) => {
  const popoverRef = useRef(null)

  return (
    <div className='w-full'>
      <Popover ref={popoverRef}>
        {({ close }) => (
          <>
            <PopoverButton className='mt-px text-[13px] w-[80px] justify-between flex text-left items-center gap-1 font-semibold text-grey-90 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white'>
              Role <br /> {role.charAt(0).toUpperCase() + role.slice(1)}
              <Icon svgPath='arrowDown' width={18} height={18} />
            </PopoverButton>
            <PopoverPanel
              transition
              anchor='bottom'
              className='divide-y shadow-md divide-white/5 w-[130px] h-fit rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'
            >
              <div className='px-3 py-2 w-full'>
                {roles.map(roleOption => (
                  <div
                    key={roleOption}
                    onClick={() => {
                      onUpdateRole(roleOption)
                      close()
                    }}
                    className={`py-2 px-3 cursor-pointer rounded-sm ${
                      role === roleOption ? 'bg-grey-70 text-primary-100 font-semibold' : 'hover:bg-grey-70'
                    }`}
                  >
                    <Typography
                      type='subtitle'
                      className={`text-sm ${
                        role === roleOption ? 'bg-grey-70 text-primary-100 font-semibold' : 'hover:bg-grey-70'
                      }`}
                    >
                      {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                    </Typography>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  )
}

export default ParticipantRolePopover
