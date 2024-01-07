import React from 'react'

export default function Loading() {
  return (
    <div className='h-screen w-screen bg-gray-200 fixed top-0 z-40 flex justify-center items-center'>
      <div className='border-x-fuchsia-800 border-8 w-24 h-24 rounded-full  animate-spin '></div>
    </div>
  )
}
