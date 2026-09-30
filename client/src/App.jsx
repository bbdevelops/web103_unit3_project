import React from 'react'
import { useRoutes, Link, NavLink } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/Events'
import NotFound from './pages/NotFound'
import './App.css'

const App = () => {
  // One dynamic route serves every location; its slug comes from the database
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/locations/:slug',
      element: <LocationEvents />
    },
    {
      path: '/events',
      element: <Events />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return (
    <div className='app'>

      <header className='main-header'>
        <Link to='/' className='brand'>
          <img src='/logo.png' alt='' />
          <h1>Cloud ID Community</h1>
        </Link>

        <nav className='header-buttons' aria-label='Main'>
          <NavLink to='/' end role='button' className='outline'>Map</NavLink>
          <NavLink to='/events' role='button' className='outline'>Events</NavLink>
        </nav>
      </header>

      <main className='container'>
        {element}
      </main>

      <footer className='main-footer container'>
        <small>Cloud photos from Wikimedia Commons contributors. See the README for credits.</small>
      </footer>
    </div>
  )
}

export default App
