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
      <div className='fixed bottom-0 w-1/2 bg-white shadow-md flex justify-around items-center h-16 z-50 rounded-xl'>
        {dockItems.map((item, index) => (
          <button key={index} className='flex flex-col items-center text-gray-600 hover:text-orange-500'>
            <Icon svgPath={item.icon} width={24} height={24} />
            <span className='text-xs'>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Dock
