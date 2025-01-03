import React, { useState, useMemo } from 'react'

interface Props {
  transcript: any
  eventDetails: any
}

const MeetingInsights: React.FC<Props> = ({ transcript, eventDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const calculateMetrics: any = useMemo(() => {
    if (!transcript || !Array.isArray(transcript) || !eventDetails) {
      return {
        duration: '0m 0s',
        silenceRate: 0,
        participation: 0,
        avgLateJoin: 0,
        speakerStats: []
      }
    }

    // Calculate total duration from last speaker's end time
    const lastEntry = transcript[transcript.length - 1]
    const durationSeconds = Math.round(
      lastEntry.offset +
        (lastEntry.words.length ? lastEntry.words[lastEntry.words.length - 1].end - lastEntry.words[0].start : 0)
    )

    const durationMinutes = Math.floor(durationSeconds / 60)
    const remainingSeconds = Math.round(durationSeconds % 60)
    const durationFormatted = `${durationMinutes}m ${remainingSeconds}s`

    // Calculate speaker statistics and speaking time
    const speakerMap = new Map()
    const speakerFirstMessage = new Map()
    let totalWords = 0
    let totalSpeakingTime = 0

    transcript.forEach(entry => {
      // Track first message time for each speaker
      if (!speakerFirstMessage.has(entry.speaker) || entry.offset < speakerFirstMessage.get(entry.speaker)) {
        speakerFirstMessage.set(entry.speaker, entry.offset)
      }

      if (entry.words && entry.words.length > 0) {
        // Count words for this speaker
        const wordCount = entry.words.length
        speakerMap.set(entry.speaker, (speakerMap.get(entry.speaker) || 0) + wordCount)
        totalWords += wordCount

        // Calculate speaking duration for this entry
        const entryDuration = entry.words[entry.words.length - 1].end - entry.words[0].start
        if (entryDuration > 0) {
          totalSpeakingTime += entryDuration
        }
      }
    })

    // Calculate silence rate
    const silenceRate = Math.min(
      100,
      Math.max(0, Math.round(((durationSeconds - totalSpeakingTime) / durationSeconds) * 100))
    )

    // Calculate participation rate
    const expectedAttendees = eventDetails.event_data.attendees?.length || 0
    const actualParticipants = speakerFirstMessage.size
    const participationRate = expectedAttendees
      ? Math.min(100, Math.round((actualParticipants / expectedAttendees) * 100))
      : 100

    // Calculate average late join time
    const joinTimes = Array.from(speakerFirstMessage.values())
    const avgLateJoinSeconds = joinTimes.reduce((sum, time) => sum + time, 0) / joinTimes.length
    const avgLateJoinMinutes = Math.round(avgLateJoinSeconds / 60)

    // Calculate speaker statistics with word counts
    const speakerStats = Array.from(speakerMap.entries())
      .map(([name, wordCount]) => ({
        name,
        wordCount,
        percentage: totalWords > 0 ? Math.round((wordCount / totalWords) * 100) : 0
      }))
      .sort((a, b) => b.wordCount - a.wordCount)

    return {
      duration: durationFormatted,
      silenceRate,
      participation: {
        rate: participationRate,
        actual: actualParticipants,
        expected: expectedAttendees
      },
      avgLateJoin: avgLateJoinMinutes,
      speakerStats
    }
  }, [transcript, eventDetails])

  const insights = [
    {
      title: 'Duration of the meeting',
      subtitle: 'Total meeting duration',
      value: calculateMetrics.duration,
      percentage: 100
    },
    {
      title: 'Silence rate',
      subtitle: 'Percentage of silence moments in meeting',
      value: `${calculateMetrics.silenceRate}%`,
      percentage: calculateMetrics.silenceRate
    },
    {
      title: 'Participation',
      subtitle: `${calculateMetrics.participation.actual} of ${
        calculateMetrics.participation.expected + 1
      } attendees joined`,
      value: `${calculateMetrics.participation.rate}%`,
      percentage: calculateMetrics.participation.rate
    },
    {
      title: 'Average late joining time',
      subtitle: 'Time between meeting start and first message',
      value: `${calculateMetrics.avgLateJoin}m`,
      percentage: Math.min(100, calculateMetrics.avgLateJoin * 5) // Scale for visualization
    }
  ]

  return (
    <div className='bg-white rounded-lg shadow-sm mt-4'>
      <div className='flex items-center justify-between p-4 cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center'>
            <div className='w-4 h-4 text-orange-500'>📊</div>
          </div>
          <h3 className='text-lg font-semibold'>Meeting insights</h3>
        </div>
        <button className='px-4 py-2 text-orange-500 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors'>
          {isExpanded ? 'Minimize Insights' : 'Expand Insights'}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[600px]' : 'max-h-0'
        }`}
      >
        <div className='p-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-4'>
              {insights.map((insight, index) => (
                <div key={index} className='bg-gray-50 p-4 rounded-lg'>
                  <div className='flex items-start gap-3'>
                    <div className='w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center'>
                      <div className='w-4 h-4 text-orange-500'>⏱️</div>
                    </div>
                    <div>
                      <h4 className='font-medium'>{insight.title}</h4>
                      <p className='text-sm text-gray-500'>{insight.subtitle}</p>
                      <div className='mt-2 flex items-center gap-2'>
                        <div className='text-lg font-semibold'>{insight.value}</div>
                        <div className='w-32 h-2 bg-gray-200 rounded-full overflow-hidden'>
                          <div
                            className='h-full bg-blue-500 rounded-full transition-all duration-500'
                            style={{ width: `${insight.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='bg-gray-50 p-4 rounded-lg'>
              <h4 className='font-medium mb-4'>Participant Activity</h4>
              <div className='space-y-4'>
                {calculateMetrics.speakerStats
                  .filter((participant: { wordCount: number }) => participant.wordCount > 0)
                  .map((participant: any, index: number) => (
                    <div key={index} className='flex items-center gap-4'>
                      <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center'>
                        <div className='text-sm font-medium'>{participant.name.split(' ')[0][0]}</div>
                      </div>
                      <div className='flex-1'>
                        <div className='flex justify-between items-center mb-1'>
                          <span className='font-medium text-sm'>{participant.name}</span>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm text-gray-600'>{participant.wordCount} words</span>
                            <span className='font-medium'>{participant.percentage}%</span>
                          </div>
                        </div>
                        <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
                          <div
                            className='h-full bg-blue-500 rounded-full transition-all duration-500'
                            style={{ width: `${participant.percentage}%` }}
                          />
                        </div>
                      </div>
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

export default MeetingInsights
