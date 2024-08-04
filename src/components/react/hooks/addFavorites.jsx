import { useContext } from 'react'
import { FavoritePlContext } from '../context/playlistsFavorites'

export function useAddFavorites() {
    const context = useContext(FavoritePlContext)
    if (context === undefined) {
        throw new Error(
          'No tiene acceso a este contexto, estoy pretendiendo usar este CH en un sitio que no puedo'
        )
      }
      return context
}