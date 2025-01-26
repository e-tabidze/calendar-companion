import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Plus, ChevronUp, ChevronDown, Link, Type, Bold, Italic, Underline } from 'lucide-react';

const TextContextMenu = ({ position, onSelect }) => {
  const options = [
    { label: 'Bold', value: 'bold', icon: Bold },
    { label: 'Italic', value: 'italic', icon: Italic },
    { label: 'Underline', value: 'underline', icon: Underline },
  ];

  return (
      <div
          className="fixed bg-white shadow-lg rounded-lg border border-gray-200 w-48 z-50"
          style={{ top: position.y, left: position.x }}
      >
        {options.map(opt => (
            <button
                key={opt.value}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none flex items-center gap-2"
                onClick={() => onSelect(opt.value)}
            >
              <opt.icon className="w-4 h-4" />
              {opt.label}
            </button>
        ))}
      </div>
  );
};

const HoverMenu = ({ position, onSelect }) => {
  const options = [
    { label: 'Change to Heading 1', value: 'h1', icon: Type },
    { label: 'Move Up', value: 'moveUp', icon: ChevronUp },
    { label: 'Move Down', value: 'moveDown', icon: ChevronDown },
    { label: 'Copy Link', value: 'copyLink', icon: Link },
  ];

  return (
      <div className="absolute bg-white shadow-lg rounded-lg border border-gray-200 w-48 z-50"
           style={{ top: position.y, left: position.x }}>
        {options.map(opt => (
            <button
                key={opt.value}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none flex items-center gap-2"
                onClick={() => onSelect(opt)}
            >
              <opt.icon className="w-4 h-4" />
              {opt.label}
            </button>
        ))}
      </div>
  );
};

const InsertMenu = ({ position, onSelect }) => {
  const options = [
    { label: 'Heading', value: 'heading' },
    { label: 'Bullet List', value: 'bullet' },
    { label: 'Checklist', value: 'checklist' },
    { label: 'Paragraph', value: 'paragraph' },
    { label: 'Image', value: 'image' },
  ];

  return (
      <div className="absolute bg-white shadow-lg rounded-lg border border-gray-200 w-48 z-50"
           style={{ top: position.y, left: position.x }}>
        {options.map(opt => (
            <button
                key={opt.value}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
                onClick={() => onSelect(opt)}
            >
              {opt.label}
            </button>
        ))}
      </div>
  );
};

const CommandMenu = ({ position, onSelect, filterText }) => {
  const commands = [
    { label: 'Heading 1', value: 'h1' },
    { label: 'Heading 2', value: 'h2' },
    { label: 'Bullet List', value: 'bullet' },
    { label: 'Checklist', value: 'checklist' },
  ].filter(cmd => cmd.label.toLowerCase().includes(filterText.toLowerCase()));

  if (!commands.length || !position) return null;

  return (
      <div className="absolute bg-white shadow-lg rounded-lg border border-gray-200 w-48 z-50"
           style={{ top: position.y, left: position.x }}>
        {commands.map(cmd => (
            <button
                key={cmd.value}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
                onClick={() => onSelect(cmd)}
            >
              {cmd.label}
            </button>
        ))}
      </div>
  );
};

const EventDetails = ({ eventDetails }) => {
  const [commandMenu, setCommandMenu] = useState({ show: false, position: null, filter: '' });
  const [hoverMenu, setHoverMenu] = useState({ show: false, position: null });
  const [insertMenu, setInsertMenu] = useState({ show: false, position: null });
  const [hoveredLine, setHoveredLine] = useState(null);
  const [textContextMenu, setTextContextMenu] = useState({ show: false, position: null });
  const editorRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === '/') {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setCommandMenu({
        show: true,
        position: { x: rect.left, y: rect.bottom + window.scrollY },
        filter: ''
      });
      e.preventDefault();
      return;
    }

  };

  const handleMouseUp = (e) => {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setTextContextMenu({
        show: true,
        position: {
          x: rect.left + (rect.width / 2),
          y: rect.top - 40 + window.scrollY
        }
      });
    } else {
      setTextContextMenu({ show: false, position: null });
    }
  };

  const handleTextStyle = (style) => {
    const selection = window.getSelection();
    if (!selection.toString()) return;

    try {
      document.execCommand(style, false, null);
    } catch (e) {
      // Fallback for browsers that don't support execCommand
      const range = selection.getRangeAt(0);
      const contents = range.cloneContents();
      const span = document.createElement('span');

      switch (style) {
        case 'bold':
          span.style.fontWeight = 'bold';
          break;
        case 'italic':
          span.style.fontStyle = 'italic';
          break;
        case 'underline':
          span.style.textDecoration = 'underline';
          break;
      }

      range.deleteContents();
      span.appendChild(contents);
      range.insertNode(span);
    }

    setTextContextMenu({ show: false, position: null });
  };

  const createBlock = (type, content = '') => {
    let element;
    switch (type) {
      case 'h1':
      case 'heading':
        element = document.createElement('h1');
        element.className = 'text-2xl font-bold mt-4';
        element.textContent = content || 'Heading 1';
        break;
      case 'h2':
        element = document.createElement('h2');
        element.className = 'text-xl font-semibold mt-3';
        element.textContent = content || 'Heading 2';
        break;
      case 'bullet':
        element = document.createElement('ul');
        element.className = 'list-disc ml-6 mt-2';
        const li = document.createElement('li');
        li.textContent = content || 'List item';
        element.appendChild(li);
        break;
      case 'checklist':
        // Create the unordered list container
        element = document.createElement('ul');
        element.className = 'list-none ml-6 mt-2'; // Custom styles for checklist

        // Create the first checklist item
        const checklistItem = document.createElement('li');
        checklistItem.className = 'flex items-center gap-2';

        // Create the visual checkbox
        const visualCheckbox = document.createElement('span');
        visualCheckbox.className =
            'w-5 h-5 border-2 border-gray-300 rounded-md flex-shrink-0 cursor-pointer';
        visualCheckbox.addEventListener('click', () => {
          // Toggle checkbox appearance
          visualCheckbox.classList.toggle('bg-blue-500');
          visualCheckbox.classList.toggle('border-blue-500');
          visualCheckbox.classList.toggle('text-white');
          visualCheckbox.textContent = visualCheckbox.classList.contains('bg-blue-500') ? '✔' : '';
        });

        // Create the editable text for the list item
        const textSpan = document.createElement('span');
        textSpan.contentEditable = true;
        textSpan.className = 'flex-grow outline-none';
        textSpan.textContent = content || 'Checklist item';

        // Append checkbox and text to the list item
        checklistItem.appendChild(visualCheckbox);
        checklistItem.appendChild(textSpan);

        // Add keydown behavior for the checklist item
        checklistItem.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();

            // Create a new checklist item dynamically
            const newChecklistItem = document.createElement('li');
            newChecklistItem.className = 'flex items-center gap-2';

            const newCheckbox = document.createElement('span');
            newCheckbox.className =
                'w-5 h-5 border-2 border-gray-300 rounded-md flex-shrink-0 cursor-pointer';
            newCheckbox.addEventListener('click', () => {
              newCheckbox.classList.toggle('bg-blue-500');
              newCheckbox.classList.toggle('border-blue-500');
              newCheckbox.classList.toggle('text-white');
              newCheckbox.textContent = newCheckbox.classList.contains('bg-blue-500') ? '✔' : '';
            });

            const newTextSpan = document.createElement('span');
            newTextSpan.contentEditable = true;
            newTextSpan.className = 'flex-grow outline-none';
            newTextSpan.textContent = '';

            // Append new checkbox and text span to the new list item
            newChecklistItem.appendChild(newCheckbox);
            newChecklistItem.appendChild(newTextSpan);

            // Insert the new checklist item after the current one
            checklistItem.parentNode.insertBefore(newChecklistItem, checklistItem.nextSibling);

            // Focus on the new checklist item
            newTextSpan.focus();
          } else if (e.key === 'Backspace' && !textSpan.textContent.trim()) {
            e.preventDefault();

            // Remove the current checklist item if empty
            const prev = checklistItem.previousElementSibling;
            checklistItem.remove();
            if (prev?.querySelector('span[contenteditable]')) {
              prev.querySelector('span[contenteditable]').focus();
            }
          }
        });

        // Append the checklist item to the unordered list
        element.appendChild(checklistItem);
        break;



      case 'paragraph':
        element = document.createElement('p');
        element.className = 'mt-4';
        element.textContent = content || 'New paragraph';
        break;
    }
    return element;
  };

  const handleLineHover = (e) => {
    const lineElement = e.target.closest("p, h1, h2, ul, ol, div");
    if (lineElement && lineElement !== hoveredLine) {
      const rect = lineElement.getBoundingClientRect();
      setHoveredLine(lineElement);
      setHoverMenu({
        show: true,
        position: { x: rect.right + 10, y: rect.top },
        element: lineElement
      });
    }
  };
  const createChecklist = (content = '') => {
    const checklistItem = document.createElement('li');
    checklistItem.className = 'flex items-center gap-2';

    const visualCheckbox = document.createElement('span');
    visualCheckbox.className =
        'w-5 h-5 border-2 border-gray-300 rounded-md flex-shrink-0 cursor-pointer';
    visualCheckbox.addEventListener('click', () => {
      visualCheckbox.classList.toggle('bg-blue-500');
      visualCheckbox.classList.toggle('border-blue-500');
      visualCheckbox.classList.toggle('text-white');
      visualCheckbox.textContent = visualCheckbox.classList.contains('bg-blue-500')
          ? '✔'
          : '';
    });

    const textSpan = document.createElement('span');
    textSpan.contentEditable = true;
    textSpan.className = 'flex-grow';
    textSpan.textContent = content || 'Checklist item';

    checklistItem.appendChild(visualCheckbox);
    checklistItem.appendChild(textSpan);

    return checklistItem;
  };

  const handleLineMouseLeave = (e) => {
    if (!e.relatedTarget?.closest("p, h1, h2, ul, ol, div")) {
      setHoveredLine(null);
      setHoverMenu({ show: false, position: null });
    }
  };

  const handleInsertClick = (e, element) => {
    const rect = element.getBoundingClientRect();
    setInsertMenu({
      show: true,
      position: { x: rect.left - 40, y: rect.top },
      element
    });
    e.stopPropagation();
  };

  const handleHoverMenuSelect = (command) => {
    if (!hoverMenu.element) return;

    switch (command.value) {
      case 'h1':
        const h1 = createBlock('h1', hoverMenu.element.textContent);
        hoverMenu.element.replaceWith(h1);
        break;
      case 'moveUp':
      case 'moveDown':
        const sibling = command.value === 'moveUp'
            ? hoverMenu.element.previousElementSibling
            : hoverMenu.element.nextElementSibling;
        if (sibling) {
          const clone = hoverMenu.element.cloneNode(true);
          command.value === 'moveUp'
              ? sibling.before(clone)
              : sibling.after(clone);
          hoverMenu.element.remove();
        }
        break;
    }
    setHoverMenu({ show: false, position: null });
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (!editorRef.current?.contains(e.target)) {
        setCommandMenu({ show: false, position: null, filter: '' });
        setHoverMenu({ show: false, position: null });
        setInsertMenu({ show: false, position: null });
        setTextContextMenu({ show: false, position: null });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
      <div className="flex gap-4 mt-16">
        <div className="relative z-10">
          <div className="absolute h-full w-px bg-gray-200 left-[9px] -top-4 z-10" />
          <div className="relative z-20">
            <img src="/api/placeholder/18/18" alt="" className="hidden lg:inline-block" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <img src="/api/placeholder/32/32" className="w-8 h-8 rounded-full" alt="" />
            <div>
              <span className="font-medium">{eventDetails?.event_data?.creator?.email}</span>
              <span className="text-gray-600 ml-2">Edited an agenda</span>
              <span className="text-gray-500 ml-2">21 aug · 16:33am</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Meeting agenda</h3>
              <button>
                <MoreHorizontal className="w-5 h-5 text-gray-400"/>
              </button>
            </div>

            <div
                ref={editorRef}
                className="min-h-[200px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                contentEditable
                onKeyDown={handleKeyDown}
                onMouseUp={handleMouseUp}
                onMouseOver={handleLineHover}
                onMouseLeave={handleLineMouseLeave}
                suppressContentEditableWarning
            >
              <div className="text-[#FF5A1F]">📍 It consists of 15 items and 33 sub-items</div>
              <p className="mt-4 text-gray-600">
                {eventDetails?.event_data?.description ||
                    'Suspendisse quis erat non ligula sollicitudin pulvinar ac ac velit.'}
              </p>
            </div>

            {hoveredLine && (
                <button
                    className="fixed z-50 p-1 bg-white border border-gray-200 rounded-full shadow-lg hover:bg-gray-50"
                    style={{
                      top: hoveredLine.getBoundingClientRect().top + window.scrollY,
                      left: hoveredLine.getBoundingClientRect().left - 40,
                    }}
                    onClick={(e) => handleInsertClick(e, hoveredLine)}
                >
                  <Plus className="w-4 h-4" />
                </button>
            )}

            {textContextMenu.show && (
                <TextContextMenu
                    position={textContextMenu.position}
                    onSelect={handleTextStyle}
                />
            )}

            {commandMenu.show && (
                <CommandMenu
                    position={commandMenu.position}
                    onSelect={(cmd) => {
                      const element = createBlock(cmd.value);
                      const selection = window.getSelection();
                      const range = selection.getRangeAt(0);
                      range.deleteContents();
                      range.insertNode(element);
                      setCommandMenu({show: false, position: null, filter: ''});
                    }}
                    filterText={commandMenu.filter}
                />
            )}

            {hoverMenu.show && (
                <HoverMenu
                    position={hoverMenu.position}
                    onSelect={handleHoverMenuSelect}
                />
            )}

            {insertMenu.show && (
                <InsertMenu
                    position={insertMenu.position}
                    onSelect={(opt) => {
                      const element = createBlock(opt.value);
                      insertMenu.element.after(element);
                      setInsertMenu({show: false, position: null});
                    }}
                />
            )}
          </div>
        </div>
      </div>
  );
};

export default EventDetails;