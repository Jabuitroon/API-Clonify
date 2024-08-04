import { createContext, useReducer } from 'react'
import { initialState, playlistFavReducer } from '../logic/addToFavReducer';

export const FavoritePlContext = createContext()

export function PlaylistsFavoritesProvider({ children }) {
    const [favoriteList, dispatch] = useReducer(playlistFavReducer, initialState )

    const addToFavorites = (product) => {
        
        dispatch({
            type: 'added',
            payload: product
        })
    }

    const rmToFavorites = (product) => {
        dispatch({
            type: 'deleted',
            payload: product
        })
    }
    console.log(favoriteList);
    
    return (
        <FavoritePlContext.Provider value={{ fav:favoriteList, addToFavorites, rmToFavorites }}>
            {children}
        </FavoritePlContext.Provider>
    )
}