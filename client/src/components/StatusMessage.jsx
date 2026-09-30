import React from 'react'
import '../css/StatusMessage.css'

// Shared loading / error / empty state so no page ever renders blank
const StatusMessage = ({ type = 'empty', children }) => (
    <div className={`status-message status-message--${type}`} role={type === 'error' ? 'alert' : 'status'}>
        {type === 'loading' && <span className='status-spinner' aria-hidden='true' />}
        <div>{children}</div>
    </div>
)

export default StatusMessage
