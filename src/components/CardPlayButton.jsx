import { Play } from '@/icons/Play'
import { Pause } from '@/icons/Pause'
import { usePlayerStore } from '@/store/playerStore'

export function CardPlayButton({ id, size = 'small' }) {
	const { isPlaying, setIsPlaying, currentSong, setCurrentSong } = usePlayerStore((state) => state)

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

	const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'

	return (
		<button
			type='button'
			onClick={handleClick}
			className={`card-play-button rounded-full bg-green-500 p-4
      hover:scale-105 transition hover:bg-green-400`}
		>
			{isPlayingThisPlaylist ? (
				<Pause className={iconClassName} />
			) : (
				<Play className={iconClassName} />
			)}
		</button>
	)
}
