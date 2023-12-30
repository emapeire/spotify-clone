import { useEffect, useRef } from 'react'
import { Play } from '@/icons/Play'
import { Pause } from '@/icons/Pause'
import { usePlayerStore } from '@/store/playerStore'
import { Slider } from '@/components/Slider'

const CurrentSong = ({ image, title, artists }) => {
  return (
    <div className='flex items-center gap-5 relative overflow-hidden'>
      <picture className='w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden'>
        <img src={image} alt={title} />
      </picture>

      <div className='flex flex-col'>
        <h3 className='font-semibold text-sm block'>{title}</h3>
        <span className='text-xs opacity-80'>{artists?.join(', ')}</span>
      </div>
    </div>
  )
}

export function Player() {
  const { isPlaying, setIsPlaying, currentSong, setCurrentSong } =
    usePlayerStore((state) => state)
  const audioRef = useRef()
  const volumeRef = useRef(1)

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    const { song, songs, playlist } = currentSong
    if (song) {
      const src = `music/${playlist?.id}/0${song.id}.mp3`
      audioRef.current.src = src
      audioRef.current.volume = volumeRef.current
      audioRef.current.play()
    }
  }, [currentSong])

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className='flex flex-row justify-between w-full px-4 z-50'>
      <div>
        <CurrentSong {...currentSong.song} />
      </div>

      <div className='grid place-content-center gap-4 flex-1'>
        <div className='flex justify-center'>
          <button className='bg-white rounded-full p-2' onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <audio ref={audioRef} />
        </div>
      </div>

      <div className='grid place-content-center'>
        <Slider
          defaultValue={[100]}
          max={100}
          min={0}
          className='w-[95px]'
          onValueChange={(value) => {
            const [newVolume] = value
            const volumeValue = newVolume / 100
            volumeRef.current = volumeValue
            audioRef.current.volume = volumeValue
          }}
        />
      </div>
    </div>
  )
}
