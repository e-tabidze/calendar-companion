export interface Block {
  id: string
  type: 'text' | 'h1' | 'h2' | 'bullet' | 'checklist'
  content: string
  index: number
}

export interface CommandMenuState {
  show: boolean
  position: { x: number; y: number } | null
  filterText: string
  blockId: string | undefined
}

export interface Position {
  x: number
  y: number
}

export interface MenuState {
  show: boolean
  position: Position | null
}
