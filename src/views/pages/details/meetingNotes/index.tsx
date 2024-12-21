import React, { useState, useRef } from 'react'
import { Search, User, MoreHorizontal } from 'lucide-react'

interface Word {
  start: number
  end: number
  word: string
}

interface TranscriptEntry {
  speaker: string
  words: Word[]
  offset: number
}

interface Props {
  transcript: any
  mp4: any
}

const combineEntriesBySpeaker = (transcript: TranscriptEntry[]) => {
  const combined: TranscriptEntry[] = []

  transcript?.forEach(entry => {
    if (combined.length > 0) {
      const lastEntry = combined[combined.length - 1]
      
      if (lastEntry.speaker === entry.speaker) {
        const lastWordEnd = lastEntry.words[lastEntry.words.length - 1].end
        const currentWordStart = entry.words[0].start
        
        if (currentWordStart - lastWordEnd < 2) {
          lastEntry.words = [...lastEntry.words, ...entry.words]
          
          return
        }
      }
    }
    
    combined.push({...entry})
  })

  return combined
}

const MeetingNotes: React.FC<Props> = ({ transcript, mp4 }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const combinedTranscript = combineEntriesBySpeaker(transcript)

  const formatTime = (offset: number) => {
    const minutes = Math.floor(offset / 60)
    const seconds = Math.floor(offset % 60)

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime)
  }

  const handleWordClick = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      videoRef.current.play()
    }
  }

  const renderWords = (words: Word[]) => {
    return words.map((word, index) => {
      const isActive = currentTime >= word.start && currentTime <= word.end
      
      return (
        <span
          key={index}
          onClick={() => handleWordClick(word.start)}
          className={`cursor-pointer transition-colors duration-200 hover:opacity-80 ${
            isActive ? 'bg-[#FF6B4E] text-white px-0.5 rounded' : 'text-[#FF6B4E]'
          }`}
        >
          {word.word}{' '}
        </span>
      )
    })
  }

  const filteredTranscript = combinedTranscript.filter(entry =>
    entry.words.some(word => word.word.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-xs">AI</span>
              </div>
              <span className="font-medium">Companion AI</span>
              <span className="text-gray-500">Generated a transcript</span>
              <span className="text-gray-500">20 aug · 13:45am</span>
            </div>
            <button>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <h2 className="text-2xl font-semibold">Review UI UX Design for our new project</h2>
          <div className="text-gray-500 mt-1">Duration: 0h 45m 0s</div>
          
          {/* Waveform */}
          <div className="mt-4 mb-6">
            <div className="w-full h-4 flex items-center gap-px">
              {[...Array(200)].map((_, i) => (
                <div
                  key={i}
                  className="w-px"
                  style={{
                    height: `${Math.random() * 100}%`,
                    backgroundColor: `hsla(${Math.floor(Math.random() * 360)}, 70%, 50%, 0.2)`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x">
          {/* Video Player Side */}
          <div className="p-6">
            <video 
              ref={videoRef}
              className="w-full rounded-lg"
              controls
              poster="/api/placeholder/1280/720"
              src={mp4}
              onTimeUpdate={handleTimeUpdate}
            >
              <source src={mp4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Chat Section */}
          <div>
            <div className="px-6 py-3 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search in conversation"
                  className="w-full pl-8 pr-4 py-2 bg-gray-50 rounded-lg text-gray-900 text-sm placeholder-gray-500 focus:outline-none"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-[200px_1fr] divide-x">
              {/* Time and Names Column */}
              <div className="py-4 space-y-6 max-h-[600px] overflow-y-auto">
                {filteredTranscript.map((entry, index) => (
                  <div key={index} className="px-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {entry.speaker}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatTime(entry.offset)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Messages Column */}
              <div className="py-4 px-6 space-y-6 max-h-[600px] overflow-y-auto">
                {filteredTranscript.map((entry, index) => (
                  <div key={index}>
                    <p>{renderWords(entry.words)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeetingNotes