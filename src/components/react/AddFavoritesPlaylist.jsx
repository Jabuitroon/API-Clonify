import { PlaylistsFavoritesProvider } from '../react/context/playlistsFavorites.jsx'
import { Handle } from '../react/eliminar.jsx'

export function AddFavoritesPlaylist({ playlist }) {    
    return(
        <PlaylistsFavoritesProvider>
            <Handle pl={playlist}/>
        </PlaylistsFavoritesProvider>
    )
}