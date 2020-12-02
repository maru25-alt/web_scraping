import React from 'react'

function Loading() {
    return (
        <div className="loading">
            <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loading
