export function MostrarResultados ({ playlists }) {
  return (
    <ul className='playlists'>
      {playlists.map((playlist) => (
        <li className='h-14 px-2 py-1 flex items-center grow rounded-md hover:bg-zinc-700' key={playlist.id}>
          <a href={`/playlist/${playlist.id}`} className='playlist-item flex w-full relative overflow-hidden items-center gap-4'>
            <picture className='h-12 w-12 float-none'>
              <img
                src={playlist.cover}
                alt={`Cover of ${playlist.title} by ${playlist.artistString}`}
                className='object-cover w-full h-full rounded-md'
              />
            </picture>
            <div className='flex flex-auto flex-col truncate'>
              <h4 className='text-white text-sm'>{playlist.title}</h4>
              <span className='text-xs text-gray-400'>{playlist.artistString}</span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Decisiones ({ playlists }) {
  const hasMovies = playlists?.length > 0

  return (
    hasMovies
      ? <MostrarResultados playlists={playlists} />
      : <p>F</p>
  )
}
