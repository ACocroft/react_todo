import React from 'react'
import image from '../images/NotFound.png'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className='notFound'>
        <img src={image} alt='Not found' />
        <h1>Whoops! Can't find that.</h1>
    </div>
  )
}
