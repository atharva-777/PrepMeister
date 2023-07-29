import React from 'react'

const Question = ({params}:any) => {
  return (
    <div className='mt-32 text-center text-4xl'>{params.id}</div>
  )
}

export default Question