import React from 'react';
import { Video, MoreHorizontal, Plus } from 'lucide-react';

interface EventDetailsProps {
  eventDetails: any;
  meetingJson: any;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventDetails }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    return `${date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    })}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">
            {`${formatDate(eventDetails.event_data.start.dateTime)} — ${formatDate(eventDetails.event_data.end.dateTime)}`}
          </span>
          <span className="text-gray-600">·</span>
          <span className="text-gray-600">Every Thursday</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
              />
            ))}
          </div>
          <button className="bg-[#FF5A1F] text-white px-4 py-2 rounded-md flex items-center gap-2">
            Share Meeting
            <span className="text-xl">⚡</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold mb-6">
        {eventDetails.event_data.summary}
      </h1>

      {/* Timeline */}
      <div className="relative pl-8 border-l-2 border-gray-100">
        {/* Meeting Created Entry */}
        <div className="mb-8 relative">
          <div className="absolute -left-[2.2rem] w-4 h-4 rounded-full bg-[#FF5A1F]" />
          <div className="flex items-center gap-3 mb-2">
            <img src="/api/placeholder/32/32" className="w-8 h-8 rounded-full" />
            <div>
              <span className="font-medium">{eventDetails.event_data.creator.email}</span>
              <span className="text-gray-600 ml-2">Created a meeting</span>
              <span className="text-gray-500 ml-2">20 aug · 13:45am</span>
            </div>
          </div>

          {/* Meeting Card */}
          <div className="mt-4 bg-gray-50 rounded-lg p-6">
            <div className="mb-4">
              <span className="text-gray-600">In 1h and 15 minutes</span>
              <h2 className="text-xl font-semibold">{eventDetails.event_data.summary}</h2>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <Video className="w-5 h-5 text-blue-500" />
                <a 
                  href={eventDetails.event_data.hangoutLink} 
                  className="text-blue-500 hover:underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {eventDetails.event_data.hangoutLink}
                </a>
                <MoreHorizontal className="w-5 h-5 text-gray-400 ml-auto" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-600">Participants</span>
                  <div className="flex items-center mt-1">
                    <div className="flex -space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">and 3 others</span>
                    <button className="ml-2 p-1 hover:bg-gray-100 rounded">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Companion</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-sm text-gray-600">Was Connected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agenda Edit Entry */}
        <div className="relative">
          <div className="absolute -left-[2.2rem] w-4 h-4 rounded-full bg-yellow-400" />
          <div className="flex items-center gap-3 mb-2">
            <img src="/api/placeholder/32/32" className="w-8 h-8 rounded-full" />
            <div>
              <span className="font-medium">{eventDetails.event_data.creator.email}</span>
              <span className="text-gray-600 ml-2">Edited an agenda</span>
              <span className="text-gray-500 ml-2">21 aug · 16:33am</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Meeting agenda</h3>
              <button>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="text-[#FF5A1F]">
              📍 It consists of 15 items and 33 sub-items
            </div>
            <p className="mt-4 text-gray-600">
              {eventDetails.event_data.description || 
               'Suspendisse quis erat non ligula sollicitudin pulvinar ac ac velit. Fusce quam enim, tristique vel sem vitae, finibus pulvinar velit.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;