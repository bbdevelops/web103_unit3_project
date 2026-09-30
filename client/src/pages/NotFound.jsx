import React from 'react'
import { Link } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage'

const NotFound = () => (
    <StatusMessage type='error'>
        <h2>Lost in the fog</h2>
        <p>There's nothing at this address.</p>
        <Link to='/' role='button'>Back to the map</Link>
    </StatusMessage>
)

export default NotFound
