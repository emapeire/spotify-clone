import { useEffect, useRef } from 'react'
import { Play } from '@/icons/Play'
import { Pause } from '@/icons/Pause'
import { usePlayerStore } from '@/store/playerStore'
import { Slider } from '@/components/Slider'
import { VolumeSilence } from '@/icons/VolumeSilence'
import { Volume } from '@/icons/Volume'

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

const VolumeControl = () => {
  const volume = usePlayerStore((state) => state.volume)

  return (
    <div className='flex justify-center gap-x-2 text-white'>
      {volume < 0.1 ? <VolumeSilence /> : <Volume />}

      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        className='w-[95px]'
        onValueChange={(value) => {
          const [newVolume] = value
          const volumeValue = newVolume / 100
          setVolume(volumeValue)
        }}
      />
    </div>
  )
}

export function Player() {
  const { isPlaying, setIsPlaying, currentSong, setCurrentSong, volume } =
    usePlayerStore((state) => state)
  const audioRef = useRef()

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    const { song, songs, playlist } = currentSong
    if (song) {
      const src = `music/${playlist?.id}/0${song.id}.mp3`
      audioRef.current.src = src
      audioRef.current.volume = volume
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
        <VolumeControl />
      </div>
    </div>
  )
}
