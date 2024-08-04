import { useAddFavorites } from '../react/hooks/addFavorites'

export function Handle({pl}) {
    const { addToFavorites, rmToFavorites } = useAddFavorites()
    return(
        <button onClick={()=>{
            addToFavorites(pl)
        }}>Agregar</button>
    )
    
}