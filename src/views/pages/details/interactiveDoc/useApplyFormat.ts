import { useCallback } from 'react'

type FormatType =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'link'
  | 'justifyLeft'
  | 'justifyCenter'
  | 'justifyRight'
  | 'insertUnorderedList'
  | 'createLink'
  | 'insertImage'
  | 'insertEmoji'
  | 'insertBlock'
  | 'strikethrough'
  | 'superscript'
  | 'subscript'
  | 'heading'
  | 'font'
  | 'codeLanguage'
  | 'askAI'

const useApplyFormat = (setHoverToolbar: any, selectionStartPosition: any) => {
  const applyFormat = useCallback((format: FormatType) => {
    const selection = window.getSelection()
    if (!selection) return

    try {
      switch (format) {
        case 'bold':
        case 'italic':
        case 'underline':
        case 'strikethrough':
        case 'superscript':
        case 'subscript':
          document.execCommand(format)
          break

        case 'justifyLeft':
        case 'justifyCenter':
        case 'justifyRight': {
          const range = selection.getRangeAt(0)
          const block = range.commonAncestorContainer
          let targetElement = block.nodeType === Node.TEXT_NODE ? block.parentElement : (block as HTMLElement)

          while (
            targetElement &&
            getComputedStyle(targetElement).display !== 'block' &&
            targetElement.tagName !== 'P' &&
            targetElement.tagName !== 'DIV'
          ) {
            targetElement = targetElement.parentElement
          }

          if (!targetElement || targetElement.tagName === 'BODY') {
            const div = document.createElement('div')
            range.surroundContents(div)
            targetElement = div
          }

          targetElement.style.textAlign =
            format === 'justifyLeft' ? 'left' : format === 'justifyCenter' ? 'center' : 'right'
          break
        }

        case 'insertUnorderedList': {
          const range = selection.getRangeAt(0)
          const block = range.commonAncestorContainer
          const targetElement: any = block.nodeType === Node.TEXT_NODE ? block.parentElement : (block as HTMLElement)

          const existingList = targetElement.closest('ul')
          if (existingList) {
            const fragment = document.createDocumentFragment()
            Array.from(existingList.children).forEach((li: any) => {
              const p = document.createElement('p')
              p.innerHTML = li.innerHTML
              fragment.appendChild(p)
            })

            existingList.parentNode?.replaceChild(fragment, existingList)
          } else {
            const ul = document.createElement('ul')
            ul.className = 'list-disc list-inside'

            const text = range.toString()
            if (text) {
              const lines = text.split('\n').filter(line => line.trim())
              lines.forEach(line => {
                const li = document.createElement('li')
                li.textContent = line
                ul.appendChild(li)
              })
            } else {
              const li = document.createElement('li')
              li.innerHTML = '<br>'
              ul.appendChild(li)
            }

            range.deleteContents()
            range.insertNode(ul)

            if (!text) {
              const newRange = document.createRange()
              newRange.setStart(ul.firstChild as Node, 0)
              newRange.collapse(true)
              selection.removeAllRanges()
              selection.addRange(newRange)
            }
          }
          break
        }

        case 'createLink': {
          const url = prompt('Enter URL:')
          if (url) {
            document.execCommand('createLink', false, url)
            const link = selection.anchorNode?.parentElement
            if (link?.tagName === 'A') {
              link.setAttribute('target', '_blank')
            }
          }
          break
        }

        case 'insertImage': {
          const url = prompt('Enter image URL:')
          if (url) {
            document.execCommand('insertImage', false, url)
          }
          break
        }

        case 'insertEmoji': {
          break
        }

        case 'heading': {
          const range = selection.getRangeAt(0)
          const container = range.commonAncestorContainer.parentElement
          if (container) {
            const isHeading = container.tagName === 'H1'
            document.execCommand('formatBlock', false, isHeading ? 'p' : 'h1')
          }
          break
        }

        case 'font': {
          const fonts = ['Arial', 'Times New Roman', 'Courier New', 'Georgia']
          const font = prompt('Choose a font: ' + fonts.join(', '))
          if (font) {
            document.execCommand('fontName', false, font)
          }
          break
        }

        case 'askAI': {
          console.log('AI assistant requested for:', selection.toString())
          break
        }
      }
    } catch (error) {
      console.error('Error applying format:', error)
    }

    const keepOpenFormats: FormatType[] = ['font', 'askAI']
    if (!keepOpenFormats.includes(format)) {
      setHoverToolbar({ show: false, position: null })
      selectionStartPosition.current = null
    }
  }, [])

  return { applyFormat }
}

export default useApplyFormat
