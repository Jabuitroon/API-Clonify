// import { usePlayerStore } from '@/store/playerStore'
// import { useEffect, useRef, useState } from 'react'
// import { Slider } from './Slider'

import { useEffect, useRef, useState } from 'react'
import { usePlayerStore } from '@/store/playerStore'

import { Slider } from '@/components/ui/Slider'

// Recomendó enviar como prop la clase que yo pueda darle tamaño
export const Pause = ({ className }) => (
  <svg className={className} role='img' height='16' width='16' aria-hidden='true' viewBox='0 0 16 16'><path d='M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z' /></svg>
)

export const Play = ({ className }) => (
  <svg className={className} role='img' height='16' width='16' aria-hidden='true' viewBox='0 0 16 16'><path d='M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z' /></svg>
)

export const VolumeSilence = () => (
  <svg fill='currentColor' role='presentation' height='16' width='16' aria-hidden='true' aria-label='Volumen apagado' viewBox='0 0 16 16'><path d='M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z' /><path d='M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z' /></svg>
)

export const Volumen = () => (
  <svg fill='currentColor' role='presentation' height='16' width='16' aria-hidden='true' aria-label='Volumen alto' id='volume-icon' viewBox='0 0 16 16'><path d='M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z' /><path d='M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z' /></svg>
)

// Min 1:49 Habla de que hay que renderizar tanto del lado del cliente como también del lado del servidor
// Añadimos interactividad al cliente para este caso el componente se renderiza desde que carga la página

const CurrentSong = ({ image, title, artists }) => {
  return (
    <div className='flex items-center gap-5 relative overflow-hidden w-[300px]'>
      <picture className='w-16 h-16 rounded-md shadow-lg overflow-hidden bg-zinc-800'>
        <img src={image} alt={image} />
      </picture>
      <div className='flex flex-col'>
        <h3 className='block font-semibold text-sm'>{title}</h3>
        <span className='text-xs opacity-80'>{artists?.join(', ')}</span>
      </div>
    </div>
  )
}

// Controlador de volúmen
export function VolumeControl () {
  const volume = usePlayerStore(state => state.volume)
  const setVolume = usePlayerStore(state => state.setVolume)

  // Guardando el valor previo al mute
  const previusVolumeRef = useRef(volume)
  const isVolume = volume < 0.1
  const handleClickVolBtb = () => {
    if (isVolume) {
      setVolume(previusVolumeRef.current)
    } else {
      previusVolumeRef.current = volume
      setVolume(0)
    }
  }

  return (
    <div className='flex justify-end gap-x-2 w-[300px] text-white'>
      <button className='opacity-70 hover:opacity-100 transition' onClick={handleClickVolBtb}>
        {isVolume ? <VolumeSilence /> : <Volumen />}
      </button>
      <Slider
        className='w-[95px]'
        defaultValue={[50]}
        max={100}
        min={0}
        value={[volume * 100]}
        onValueChange={(value) => {
          const [newVolume] = value
          const volValue = newVolume / 100
          // console.log('Este es /100', volValue)
          setVolume(volValue)
        }}
      />
    </div>
  )
}

// Controlador de la canción actual

// COmo prop le pasamos audio para utilizar sus propiedades
// Se tiene en cuenta el contador (tirmpo actual de la canción), la duración total y los saltos de la cancion por los clicks
export const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0)

  // 3.) Guardamos las comparaciones para reutilizarlas
  const duration = audio?.current?.duration ?? 0

  // Formatear el tiempo
  const formatTime = time => {
    if (time == null) return '0:00'
    const seconds = Math.floor(time % 60)
    const mins = Math.floor(time / 60)

    return `${mins}:${seconds.toString().padStart(2, '0')}`
  }
  // 1.) el elemento (HTML) de audio tiene el evento de cuando se actualiza dicho tiempo de reproducción. por lo tanto puedo escucharlo
  useEffect(() => {
    audio.current.addEventListener('timeupdate', handleTiemeUpdate)
    return () => {
      audio.current.removeEventListener('timeupdate', handleTiemeUpdate)
    }
    // 2.) CUando cambie el currentTime no actualizamos el esteado nosotros, por eso lo llamá una sola fuente de la verdad
  }, [])

  const handleTiemeUpdate = () => {
    // 1.) Al momento de setear podemos hacer la transformación de seg a min
    setCurrentTime(audio.current.currentTime)
  }

  return (
    <div className='flex items-center gap-x-2 text-sm py-2'>
      {/* 4.) Resoliviendo problema de que el span se mueve horizontalmente, alineó solo este */}
      <span className='opacity-50 w-12 text-right'>{formatTime(currentTime)}</span>
      <div>
        <Slider
          className='w-[400px]'
          defaultValue={[0]}
          // Para ver el progreso reflejado en mi slider necesitamos de currentTime (medido en segundos)
          value={[currentTime]}
          min={0}
          max={duration}
          onValueChange={(value) => {
            audio.current.currentTime = value
          }}
        />
      </div>
      {/* 3.) */}
      <span className='opacity-50 w-12'>
        {duration ? formatTime(duration) : '0:00'}
      </span>
    </div>
  )
}

export function Player () {
  // "Antes" Estado del player independtiente
  // const [isPlaying, setIsPlaying] = useState(false)
  // const [currentSong, setCurrentSong] = useState(null)

  // Estado del player enlazado con otro componente
  const { currentMusic, isPlaying, setIsPlaying, volume } = usePlayerStore(state => state)
  const audioRef = useRef()

  // Controlador de clicks según mi estado global
  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause()
  },
  [isPlaying])

  useEffect(() => {
    const { song, playlist } = currentMusic
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`
      audioRef.current.src = src
      // Utilizando el volumen del estado global
      audioRef.current.volume = volume
      audioRef.current.play()
    }
  }, [currentMusic])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  // *Antes* controlador de clicks a nivel individual
  // useEffect(() => {
  //   audioRef.current.src = '/music/1/Bad Bunny_Estamos Bien.mp3'
  // }, [])
  // const handleClick = () => {
  //   if (isPlaying) {
  //     audioRef.current.pause()
  //   } else {
  //     audioRef.current.play()
  //     audioRef.current.Volume = 0.1
  //   }
  //   setIsPlaying(!isPlaying)
  // }

  return (
    <div className='flex flex-row justify-between w-full px-1 z-50'>
      <CurrentSong {...currentMusic.song} />
      <div className='grid place-content-center gap-4 flex-1'>
        <div className='flex flex-col items-center justify-center'>
          {/* Sin items-center el botón se expande full */}
          <button className='bg-white rounded-full p-2' onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <SongControl audio={audioRef} />
          <audio ref={audioRef} />
        </div>
      </div>
      <div className='grid place-content-center'>
        <VolumeControl />
      </div>
    </div>
  )
}
