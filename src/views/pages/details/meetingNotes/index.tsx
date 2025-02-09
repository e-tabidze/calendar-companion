import React, { useState, useRef } from 'react'
import { Search, User } from 'lucide-react'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'
import { differenceInMinutes, format } from 'date-fns'
import { parseISO } from 'date-fns'
import AudioWaveform from './AudioWave'
import MeetingInsights from './MeetingInsight'

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
  eventDetails: any
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

    combined.push({ ...entry })
  })

  return combined
}

const MeetingNotes: React.FC<Props> = ({ transcript, mp4, eventDetails }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentTime, setCurrentTime] = useState(0)
  const [isTranscriptExpanded, setTranscriptExpanded] = useState(false)
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
            isActive ? 'bg-primary-100 text-white px-0.5 rounded' : 'text-primary-100'
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
    <div className='flex gap-4 mt-16'>
      <div className='relative z-10'>
        <div className='absolute h-full w-px bg-raisin-10 left-[9px] -top-4 z-10' />
        <Icon svgPath='action1' width={21} height={21} className='hidden lg:inline-block z-20 relative' />
      </div>

      <div className='w-full'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-3 mb-4 mt-[3px]'>
          <div className='flex items-center gap-4'>
            <Icon svgPath='action1' width={16} height={16} className='inline-block lg:hidden' />
            <Icon svgPath='bot' width={16} height={16} />
          </div>
          <Typography type='subtitle' color='light' className='text-[13px'>
            {eventDetails.which_bot}
          </Typography>
          {eventDetails.created_at &&  (
            <Typography type='subtitle' color='light' className='text-[13px] text-grey-90'>
              Generated a transcript {format(parseISO(eventDetails.created_at), 'MMM d · hh:mmaaa')}
            </Typography>
          )}
        </div>

        <div className='bg-gray-50 p-4 rounded-lg'>
          <div className='max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6'>
            <div className=''>
              <Typography type='h4' color='dark' className='font-medium'>
                {eventDetails.event_data?.summary}
              </Typography>
              <div className='text-gray-500 mt-1'>
                Duration:{' '}
                {differenceInMinutes(
                  eventDetails?.event_data?.end?.dateTime,
                  eventDetails?.event_data?.start?.dateTime
                )}
                m
              </div>

              <div className='mt-4 mb-6'>
                <div className='w-full h-4 flex items-center gap-px'>
                  <AudioWaveform videoRef={videoRef} />
                </div>
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='h-fit w-5/12'>
                <video
                  ref={videoRef}
                  className='w-full rounded-lg'
                  controls
                  poster='/api/placeholder/1280/720'
                  src={mp4}
                  onTimeUpdate={handleTimeUpdate}
                >
                  <source src={mp4} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className='w-7/12 border rounded-lg'>
                <div>
                  <div className='px-6 py-3 border-b'>
                    <div className='relative'>
                      <input
                        type='text'
                        placeholder='Search in conversation'
                        className='w-full pl-8 pr-4 py-2 bg-gray-50 rounded-lg text-gray-900 text-sm placeholder-gray-500 focus:outline-none'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                      <Search className='absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                    </div>
                  </div>

                  <div className={`${isTranscriptExpanded ? '' : 'h-[121px] overflow-hidden'}`}>
                    {filteredTranscript.map((entry, index) => (
                      <div key={index} className='flex gap-4'>
                        <div className='px-4 gap-3 flex items-center w-1/3 border-r'>
                          <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center'>
                            <User className='w-5 h-5 text-gray-400' />
                          </div>
                          <div>
                            <div className='text-sm font-medium text-gray-900'>{entry.speaker}</div>
                            <div className='text-xs text-gray-500'>{formatTime(entry.offset)}</div>
                          </div>
                        </div>
                        <div key={index} className='w-2/3 py-4'>
                          <Typography type='subtitle'>{renderWords(entry.words)}</Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className='bg-primary-15 text-primary-100 w-full rounded-b-lg h-8'
                  type='button'
                  onClick={() => setTranscriptExpanded(!isTranscriptExpanded)}
                >
                  {isTranscriptExpanded ? 'Collapse transcript' : 'Expand transcript'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <MeetingInsights transcript={transcript} eventDetails={eventDetails} />
      </div>
    </div>
  )
}

export default MeetingNotes
