import Icon from 'src/views/app/Icon'
import SelectWorkspace from './selectWorkspace'

const Dock = () => {
  const dockItems = [
    { label: 'Search', icon: 'dockSearch', type: 'button' },
    { label: 'Home', icon: 'dockHome', type: 'button' },
    { label: 'Notes', icon: 'dockNotes', type: 'button' },
    { label: 'Integrations', icon: 'dockIntegrations', type: 'button' },
    { label: 'Workspace', type: 'workspace' },
    { label: 'User', icon: 'dockUser', type: 'button' }
  ]

  return (
    <div className='w-1/2 mx-auto'>
      <div className='fixed bottom-6 w-1/2 bg-white shadow-md flex justify-around items-center h-16 z-40 rounded-xl'>
        {dockItems.map((item, index) => {
          if (item.type === 'workspace') {
            return <SelectWorkspace key={index} />
          } else if (item.type === 'button' && item.icon) {
            return (
              <button key={index} className='flex flex-col items-center text-gray-600 hover:text-raisin-110 group'>
                <Icon
                  svgPath={item.icon}
                  width={24}
                  height={24}
                  color='#A2A2A2'
                  className='group-hover:fill-[#2E2E2E] transition-all'
                />
                <span className='text-xs mt-1'>{item.label}</span>
              </button>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}

export default Dock
