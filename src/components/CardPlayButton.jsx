import { Play } from '@/icons/Play'
import { Pause } from '@/icons/Pause'
import { usePlayerStore } from '@/store/playerStore'

export function CardPlayButton({ id }) {
  const { isPlaying, setIsPlaying, currentSong, setCurrentSong } =
    usePlayerStore((state) => state)

  const handleClick = () => {
    setCurrentSong({ playlist: { id } })
    setIsPlaying(!isPlaying)
  }

  const isPlayingThisPlaylist = isPlaying && currentSong?.playlist.id === id

  return (
    <button
      type='button'
      onClick={handleClick}
      className='card-play-button rounded-full bg-green-500 p-4'
    >
      {isPlayingThisPlaylist ? <Pause /> : <Play />}
    </button>
  )
}
