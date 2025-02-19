import { Position } from "../types"

export const COMMANDS = [
  { label: 'Heading 1', value: 'h1' },
  { label: 'Heading 2', value: 'h2' },
  { label: 'Bullet List', value: 'bullet' },
  { label: 'Checklist', value: 'checklist' }
] as const

type CommandType = typeof COMMANDS[number]['value']

export interface Command {
  label: string
  value: CommandType
}

interface CommandMenuProps {
  position: Position | null
  onSelect: (cmd: Command) => void
  filterText: string
}

const CommandMenu: React.FC<CommandMenuProps> = ({ position, onSelect, filterText }) => {
  const filteredCommands = COMMANDS.filter(cmd => cmd.label.toLowerCase().includes(filterText.toLowerCase()))

  if (!filteredCommands.length || !position) return null

  return (
    <div
      className='absolute bg-white shadow-lg rounded-lg border border-gray-200 w-48 z-50'
      style={{
        top: `${position.y + 24}px`,
        left: `${position.x}px`,
        transform: 'translate(-50%, 0)'
      }}
    >
      {filteredCommands.map(cmd => (
        <button
          key={cmd.value}
          className='w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none'
          onClick={() => onSelect(cmd)}
        >
          {cmd.label}
        </button>
      ))}
    </div>
  )
}

export default CommandMenu
