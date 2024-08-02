import { Play, Pause } from './Player'
import { usePlayerStore } from '@/store/playerStore'

export function CardPlayButtom ({ id, size = 'small' }) {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)
  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'

  // Enviando la info correcta para solucionar el error del boton sobre todas las playlist (Detectar qé cancion está reproduciendo)
  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data
        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song: songs[0] })
        // El estado global ya cuenta con la info de solamente la playlist actual
        // console.log({ songs, playlist })
      })

    // Para verlo por encima
    // setCurrentMusic({
    //   playlist: { id }
    // })
    // setIsPlaying(!isPlaying)
  }

  // Recomendó para más adelate hacer una grid
  return (
    <button onClick={handleClick} className='card-play-buttom rounded-full bg-green-500 p-4 hover:scale-[1.02] transition duration-75 hover:bg-green-400'>
      {isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
    </button>
  )
}
