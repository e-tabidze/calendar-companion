// utils.ts - Helper functions for the document editor

/**
 * Creates a new unique block ID
 * @returns A string representing a unique block ID
 */
export const createNewBlockId = (): string => {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15)
}

/**
 * Gets the current caret position within the active element
 * @returns The caret position as a number, or 0 if it cannot be determined
 */
export const getCaretPosition = (): number => {
  const selection = window.getSelection()
  if (!selection || !selection.rangeCount) return 0

  const range = selection.getRangeAt(0)
  if (!range.startContainer || range.startContainer.nodeType !== Node.TEXT_NODE) return 0

  return range.startOffset
}

/**
 * Gets the block element from a node
 * @param node The node to start from
 * @returns The block element, or null if not found
 */
export const getBlockElement = (node: Node): HTMLElement | null => {
  let element = node.nodeType === Node.TEXT_NODE ? node.parentElement : (node as HTMLElement)

  while (
    element &&
    getComputedStyle(element).display !== 'block' &&
    element.tagName !== 'P' &&
    element.tagName !== 'DIV'
  ) {
    element = element.parentElement
  }

  return element
}

/**
 * Sets the cursor at the specified position in the given element
 * @param element The element to set the cursor in
 * @param position The position to set the cursor at
 */
export const setCursorPosition = (element: HTMLElement, position: number): void => {
  const selection = window.getSelection()
  if (!selection) return

  const range = document.createRange()
  
  if (element.firstChild && element.firstChild.nodeType === Node.TEXT_NODE) {
    // If there's a text node, set position within it
    const textNode = element.firstChild
    const length = textNode.textContent?.length || 0
    const safePosition = Math.min(position, length)
    range.setStart(textNode, safePosition)
  } else {
    // Otherwise set at the beginning of the element
    range.setStart(element, 0)
  }
  
  range.collapse(true)
  selection.removeAllRanges()
  selection.addRange(range)
}

/**
 * Finds the editable content element within a block
 * @param blockElement The block element to search within
 * @returns The editable content element, or null if not found
 */
export const findContentElement = (blockElement: HTMLElement): HTMLElement | null => {
  // First, try to find a direct contentEditable element
  let contentElement = blockElement.querySelector('[contenteditable="true"]') as HTMLElement

  // If not found, try finding it in the block's structure
  if (!contentElement) {
    // Check if we have a structure with nested elements
    if (blockElement.children.length > 0) {
      const lastChild = blockElement.lastElementChild as HTMLElement
      if (lastChild) {
        // Try finding a contentEditable element in the last child
        contentElement = lastChild.querySelector('[contenteditable="true"]') as HTMLElement
        
        // If not found and the last child has children, check its last child
        if (!contentElement && lastChild.children.length > 0) {
          contentElement = lastChild.lastElementChild as HTMLElement
        }
      }
    }
  }

  return contentElement
}

/**
 * Applies a heading format to a content element
 * @param contentElement The element to apply the heading to
 * @param headingType The type of heading (h1, h2, etc.)
 */
export const applyHeadingFormat = (contentElement: HTMLElement, headingType: 'h1' | 'h2'): void => {
  if (!contentElement) return

  // Get the current text content
  const text = contentElement.textContent || ''
  
  // Check if we already have a heading of this type
  const existingHeading = contentElement.querySelector(headingType)
  
  if (existingHeading) {
    // If we have the same heading type, remove it (toggle off)
    contentElement.innerHTML = text
  } else {
    // Remove any other heading types first
    const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    headingTags.forEach(tag => {
      const heading = contentElement.querySelector(tag)
      if (heading) {
        heading.outerHTML = heading.innerHTML
      }
    })
    
    // Then apply the new heading
    contentElement.innerHTML = `<${headingType}>${text || '<br>'}</${headingType}>`
  }
}

/**
 * Applies a bullet list format to a content element
 * @param contentElement The element to apply the list to
 */
export const applyBulletList = (contentElement: HTMLElement): void => {
  if (!contentElement) return

  // Get the current text content
  const text = contentElement.textContent?.trim() || ''
  
  // Check if we already have a list
  const existingList = contentElement.querySelector('ul')
  
  if (existingList) {
    // If we have a list, remove it (toggle off)
    contentElement.innerHTML = text || '<br>'
  } else {
    // Create a new list
    contentElement.innerHTML = `<ul class="list-disc list-inside"><li>${text || '<br>'}</li></ul>`
  }
}

/**
 * Gets the active block element from the current selection
 * @returns The active block element, or null if not found
 */
export const getActiveBlockElement = (): HTMLElement | null => {
  const selection = window.getSelection()
  if (!selection || !selection.rangeCount) return null

  const range = selection.getRangeAt(0)
  
  // Determine the container node
  const containerNode = 
    range.startContainer.nodeType === Node.TEXT_NODE
      ? range.startContainer.parentElement
      : range.startContainer as HTMLElement
  
  // Find the closest block element with a data-block-id attribute
  return containerNode?.closest('[data-block-id]') as HTMLElement || null
}

/**
 * Focus at the end of an element
 * @param element The element to focus
 */
export const focusAtEnd = (element: HTMLElement): void => {
  if (!element) return
  
  const selection = window.getSelection()
  if (!selection) return
  
  const range = document.createRange()
  
  // If element has content
  if (element.childNodes.length > 0) {
    const lastChild = element.childNodes[element.childNodes.length - 1]
    
    if (lastChild.nodeType === Node.TEXT_NODE) {
      // Text node - place cursor at the end of text
      range.setStart(lastChild, lastChild.textContent?.length || 0)
    } else {
      // Element node - place cursor after it
      range.setStartAfter(lastChild)
    }
  } else {
    // Empty element - place cursor inside
    range.setStart(element, 0)
  }
  
  range.collapse(true)
  selection.removeAllRanges()
  selection.addRange(range)
  
  // Ensure element has focus
  element.focus()
}

/**
 * Gets the DOM structure of a block for debugging
 * @param blockElement The block element to analyze
 * @returns A string representation of the DOM structure
 */
export const getDOMStructure = (blockElement: HTMLElement): string => {
  if (!blockElement) return 'No element provided'
  
  // Helper function to create an indented structure
  const buildStructure = (element: HTMLElement, indent = 0): string => {
    const indentStr = ' '.repeat(indent * 2)
    let structure = `${indentStr}${element.tagName.toLowerCase()}`
    
    if (element.id) structure += `#${element.id}`
    
    if (element.className) {
      const classes = element.className.split(' ').filter(Boolean)
      if (classes.length) {
        structure += `.${classes.join('.')}`
      }
    }
    
    if (element.getAttribute('contenteditable') === 'true') {
      structure += ' [contenteditable]'
    }
    
    if (element.getAttribute('data-block-id')) {
      structure += ` [data-block-id="${element.getAttribute('data-block-id')}"]`
    }
    
    structure += '\n'
    
    Array.from(element.children).forEach(child => {
      structure += buildStructure(child as HTMLElement, indent + 1)
    })
    
    return structure
  }
  
  return buildStructure(blockElement)
}