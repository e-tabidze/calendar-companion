import Icon from 'src/views/app/Icon'

const Dock = () => {
  const dockItems = [
    { label: 'Search', icon: 'dockSearch' },
    { label: 'Home', icon: 'dockHome' },
    { label: 'Notes', icon: 'dockNotes' },
    { label: 'Integrations', icon: 'dockIntegrations' },
    { label: 'Workspace', icon: 'dockWorkspace' },
    { label: 'User', icon: 'dockUser' }
  ]

  return (
    <div className='w-1/2 mx-auto'>
      <div className='fixed bottom-6 w-1/2 bg-white shadow-md flex justify-around items-center h-16 z-50 rounded-xl'>
        {dockItems.map((item, index) => (
          <button key={index} className='flex flex-col items-center text-gray-600 hover:text-raisin-110 group'>
            <Icon svgPath={item.icon} width={24} height={24} color="#A2A2A2" className='group-hover:fill-[#2E2E2E] transition-all' />
            <span className='text-xs mt-1'>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Dock
