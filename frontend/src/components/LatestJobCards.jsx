import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = () => {
  return (
    <div
      className='p-6 rounded-2xl bg-white border border-gray-100 transition-all duration-300 ease-in-out cursor-pointer hover:scale-[1.01]'
      style={{
        boxShadow: `
          0 4px 6px rgba(0, 0, 0, 0.1),
          0 -2px 4px rgba(0, 0, 0, 0.04),
          2px 0 4px rgba(0, 0, 0, 0.05),
          -2px 0 4px rgba(0, 0, 0, 0.05)
        `
      }}
    >
      <div>
        <h1 className='font-medium text-lg'>Company Name</h1>
        <p className='text-sm text-gray-500'>Nepal</p>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2'>Job Title</h1>
        <p className='text-sm text-gray-500'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit non
          dolor in culpa libero obcaecati.
        </p>
      </div>

      <div className='flex items-center gap-2 mt-4 flex-wrap'>
        <Badge className='text-[#0f3636] font-bold bg-[#e6e6e6]' variant="ghost">
          12 Positions
        </Badge>
        <Badge className='text-[#0f3636] font-bold bg-[#e6e6e6]' variant="ghost">
          Part Time
        </Badge>
        <Badge className='text-[#0f3636] font-bold bg-[#e6e6e6]' variant="ghost">
          24 LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
