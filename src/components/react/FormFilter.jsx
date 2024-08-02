/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import debounce from 'just-debounce-it'
import { playlists } from '../../lib/data'
import { Decisiones } from '../react/SideMenuCard.jsx'
import { Icon } from '@static/icons'
export function FormFilter () {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  const primerCarga = useRef(true)

  useEffect(() => {
    if (query.startsWith(' ')) {
      setError('Comenzó con espacios')
      return
    }
    if (primerCarga.current) {
      primerCarga.current = query === ''
      return
    }

    if (query === '') {
      setError('Escribe para buscar')
      return
    }
    if (query.length < 3) {
      setError('Escribe mas de 2 letras')
      return
    }
    if (query.match(/^\d+$/)) {
      setError('No escribas cosas raras')
      return
    }
    setError(null)
  }, [query])

  const [mapped, setResponsMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const previusQuery = useRef(query)
  const getMovie = useMemo(() => {
    return async ({ query }) => {
      if (query === previusQuery.current) return

      try {
        setLoading(true)
        previusQuery.current = query
        const newMovies = await searchMovie({ query })
        setResponsMovies(newMovies)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
  }, [])

  const searchMovie = async ({ query }) => {
    if (query === '') return null
    const arraySearch = playlists.filter((playlist) => playlist.title.includes(query))
    return arraySearch
  }

  const debounceWrte = useCallback(
    debounce(search => {
      getMovie({ query: search })
    }, 500), [])

  const handleSubmit = (event) => {
    console.log('Click')
    event.preventDefault()
    getMovie({ query })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    setQuery(newSearch)
    debounceWrte(newSearch)
  }

  return (
    <div className='flex flex-col'>
      <nav className='flex px-4 py-2 items-center overflow-hidden'>
        <div className='flex'>
          <Icon iconData='search' alt='search icon' />
          <form className='form flex items-center py-1 mx-2' onSubmit={handleSubmit}>
            <input className='w-[150%] px-2 py-0 bg-slate-300' onChange={handleChange} value={query} name='query' placeholder='Buscar en tu biblioteca' />
          </form>
        </div>
        <div className='flex gap-2'>
          <p className='inline-flex items-center'>Recientes</p>
          <Icon iconData='expand' alt='expand icon' />
        </div>
      </nav>
      <Decisiones playlists={mapped} />
    </div>
  )
}
