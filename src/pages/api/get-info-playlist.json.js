// Como para despues solicitar a una BD
// Por ahora está con una pequeña API creada a mano
import { allPlaylists, songs as allSongs } from '@/lib/data'

export async function GET ({ params, request }) {
  // Obtener id desde url (interfaz de la request de la API Fetch)
  const { url } = request
  // para saltarnos más posiciones
  // const [, queryId] = url.split('?')
  // const searchParams = new URLSearchParams()

  // Otra forma que explicó
  // const searchParams = new URLSearchParams(url.split('?')[1])
  const objUrl = new URL(url)
  const strId = objUrl.searchParams.get('id')
  const playlist = allPlaylists.find((playList) => playList.id === strId)
  const songs = allSongs.filter(song => song.albumId === playlist?.albumId)

  return new Response(JSON.stringify({ playlist, songs }), {
    headers: { 'content-type': 'application/json' }
  })
}
