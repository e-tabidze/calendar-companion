import React from 'react';
import { Tooltip } from 'react-tooltip';

interface TooltipProps {
  id: string;
  children: React.ReactNode;
  place?: 'top' | 'right' | 'bottom' | 'left';
  currentPage: number; // New prop to handle the current page of the tooltip
  totalPages: number; // New prop to handle the total pages
  onNext: () => void; // Function to handle 'Next' button click
  onDone: () => void; // Function to handle 'Got it!' button click
}

const CustomTooltip: React.FC<TooltipProps> = ({ 
  id, 
  children, 
  place = 'top', 
  currentPage, 
  totalPages, 
  onNext, 
  onDone 
}) => {
  return (
    <>
      <a data-tooltip-id={id}>
        {/* ◕‿‿◕ */}


      </a>
      <Tooltip id={id} place={place} className="p-4 !bg-white rounded-md shadow-lg w-72 !opacity-100 !max-w-[250px] !text-left">
        <div className="text-gray-700 mb-4">
          {children}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <span 
                key={index} 
                className={`w-2 h-2 rounded-full ${currentPage === index + 1 ? 'bg-orange-500' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          {currentPage < totalPages ? (
            <button 
              onClick={onNext} 
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            >
              Next
            </button>
          ) : (
            <button 
              onClick={onDone} 
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            >
              Got it!
            </button>
          )}
        </div>
      </Tooltip>
    </>
  );
}

export default CustomTooltip;
