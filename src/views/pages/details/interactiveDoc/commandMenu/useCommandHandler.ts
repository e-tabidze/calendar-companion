import { useCallback } from 'react'
import { CommandMenuState } from '../types'
import { Command } from '.'

const useCommandHandler = (
  setCommandMenu: React.Dispatch<React.SetStateAction<CommandMenuState>>,
  updateBlocks?: () => void // Make this optional for backward compatibility
) => {
  const handleCommandSelect = useCallback((cmd: Command) => {
    // Close the command menu first
    setCommandMenu({ show: false, position: null, filterText: '', blockId: undefined })

    // Get the active block element
    const selection = window.getSelection()
    if (!selection || !selection.rangeCount) {
      console.error('No selection found')
      return
    }

    const range = selection.getRangeAt(0)
    const blockElement = range.startContainer.nodeType === Node.TEXT_NODE
      ? range.startContainer.parentElement?.closest('[data-block-id]')
      : (range.startContainer as HTMLElement).closest('[data-block-id]')

    if (!blockElement) {
      console.error('No active block found')
      return
    }

    // Find the content column
    const contentColumn = blockElement.querySelector('.flex-1') as HTMLElement
    if (!contentColumn) {
      console.error('Content column not found in block')
      return
    }

    // Get the actual editable div
    const contentElement = contentColumn.querySelector('[contenteditable="true"]') as HTMLElement
    if (!contentElement) {
      console.error('Editable content element not found')
      return
    }

    // Get current text content (for transferring to new format)
    const text = contentElement.textContent?.trim() || ''

    // Handle different command types
    switch (cmd.value) {
      case 'h1':
        applyHeadingWithStyle(contentElement, 'h1', text)
        break
      case 'h2':
        applyHeadingWithStyle(contentElement, 'h2', text)
        break
      case 'bullet':
        applyBulletList(contentElement, text)
        break
      case 'checklist':
        applyChecklist(contentElement, text)
        break
    }

    // CRITICAL: Manually trigger update to save changes to database
    if (updateBlocks) {
      setTimeout(() => {
        // This delay is important to allow the DOM to update before saving
        updateBlocks()
      }, 0)
    }
  }, [setCommandMenu, updateBlocks]) // Include updateBlocks in dependencies

  return { handleCommandSelect }
}

// Helper function for applying headings with proper styling
const applyHeadingWithStyle = (contentElement: HTMLElement, headingType: 'h1' | 'h2', text: string): void => {
  // Add both semantic structure and visual styling
  if (headingType === 'h1') {
    // Apply H1 with appropriate styling classes
    contentElement.innerHTML = `<h1 class="text-3xl font-bold mt-4 mb-2">${text || '&nbsp;'}</h1>`
  } else {
    // Apply H2 with appropriate styling classes
    contentElement.innerHTML = `<h2 class="text-2xl font-semibold mt-3 mb-1">${text || '&nbsp;'}</h2>`
  }
  
  // Important: We need to make sure the element stays focused
  contentElement.focus()
  
  // Place cursor at the end - but we need to do this safely
  const heading = contentElement.querySelector(headingType)
  if (heading) {
    // Create a new selection at the end of the heading
    try {
      const selection = window.getSelection()
      if (selection) {
        // Clear any existing selection first
        selection.removeAllRanges()
        
        const range = document.createRange()
        
        // Try to position at the end of text if it exists
        if (heading.firstChild && heading.firstChild.nodeType === Node.TEXT_NODE) {
          range.setStart(heading.firstChild, heading.firstChild.textContent?.length || 0)
        } else {
          // Otherwise, just position inside the heading
          range.setStart(heading, 0)
        }
        
        range.collapse(true)
        selection.addRange(range)
      }
    } catch (error) {
      console.error('Error setting cursor position:', error)
      // As a fallback, just make sure the element has focus
      contentElement.focus()
    }
  }
}

// Helper function for bullet lists - with improved selection handling
const applyBulletList = (contentElement: HTMLElement, text: string): void => {
  // Use direct HTML insertion
  contentElement.innerHTML = `<ul class="list-disc list-inside pl-4 my-2">${text ? `<li>${text}</li>` : '<li>&nbsp;</li>'}</ul>`
  
  // Ensure the content element has focus
  contentElement.focus()
  
  // Try to place cursor at the end of the list item text
  try {
    const li = contentElement.querySelector('li')
    if (li) {
      const selection = window.getSelection()
      if (selection) {
        // Clear any existing selection
        selection.removeAllRanges()
        
        const range = document.createRange()
        
        // Try to position at the end of text if it exists
        if (li.firstChild && li.firstChild.nodeType === Node.TEXT_NODE) {
          range.setStart(li.firstChild, li.firstChild.textContent?.length || 0)
        } else {
          // Otherwise, just position inside the list item
          range.setStart(li, 0)
        }
        
        range.collapse(true)
        selection.addRange(range)
      }
    }
  } catch (error) {
    console.error('Error setting cursor position:', error)
    // Fallback to just keeping focus
    contentElement.focus()
  }
}

// Helper function for checklists - with improved selection handling
const applyChecklist = (contentElement: HTMLElement, text: string): void => {
  // Direct HTML insertion with improved structure
  contentElement.innerHTML = `
    <div class="flex flex-col gap-2 my-2">
      <div class="flex items-center gap-2">
        <input type="checkbox" class="h-4 w-4 rounded border-gray-300">
        <div contenteditable="true" class="flex-1">${text || '&nbsp;'}</div>
      </div>
    </div>
  `
  
  // Find the inner contenteditable div
  const innerContentElement = contentElement.querySelector('[contenteditable="true"]')
  if (innerContentElement) {
    // Focus the inner content element
    innerContentElement.focus()
    
    // Set cursor at the end
    try {
      const selection = window.getSelection()
      if (selection) {
        // Clear any existing selection
        selection.removeAllRanges()
        
        const range = document.createRange()
        
        // Try to position at the end of text if it exists
        if (innerContentElement.firstChild && innerContentElement.firstChild.nodeType === Node.TEXT_NODE) {
          range.setStart(innerContentElement.firstChild, innerContentElement.firstChild.textContent?.length || 0)
        } else {
          // Otherwise, just position inside the element
          range.setStart(innerContentElement, 0)
        }
        
        range.collapse(true)
        selection.addRange(range)
      }
    } catch (error) {
      console.error('Error setting cursor position:', error)
      // Fallback to just keeping focus
      innerContentElement.focus()
    }
  } else {
    // Fallback to original element if inner element not found
    contentElement.focus()
  }
}

export default useCommandHandler