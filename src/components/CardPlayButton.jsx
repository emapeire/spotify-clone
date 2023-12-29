import { Play } from '@/icons/Play'
import { Pause } from '@/icons/Pause'
import { usePlayerStore } from '@/store/playerStore'

export function CardPlayButton({ id }) {
  const { isPlaying, setIsPlaying, currentSong, setCurrentSong } =
    usePlayerStore((state) => state)

  const isPlayingThisPlaylist = isPlaying && currentSong?.playlist.id === id

  const handleClick = () => {
    if (isPlayingThisPlaylist) {
      setIsPlaying(false)
      return
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data

        setIsPlaying(true)
        setCurrentSong({
          playlist,
          song: songs[0],
          songs
        })
      })
  }

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
