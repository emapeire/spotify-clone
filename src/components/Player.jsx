import { useEffect, useRef } from 'react'
import { Play } from '@/icons/Play'
import { Pause } from '@/icons/Pause'
import { usePlayerStore } from '@/store/playerStore'

export function Player() {
  const { isPlaying, setIsPlaying, currentSong, setCurrentSong } =
    usePlayerStore((state) => state)
  const audioRef = useRef()

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    const { song, songs, playlist } = currentSong
    if (song) {
      const src = `music/${playlist?.id}/0${song.id}.mp3`
      audioRef.current.src = src
      audioRef.current.play()
    }
  }, [currentSong])

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className='flex flex-row justify-between w-full px-4 z-50'>
      <div>Current Song...</div>

      <div className='grid place-content-center gap-4 flex-1'>
        <div className='flex justify-center'>
          <button className='bg-white rounded-full p-2' onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <audio ref={audioRef} />
        </div>
      </div>

      <div className='grid place-content-center'>Volume Controls...</div>
    </div>
  )
}
