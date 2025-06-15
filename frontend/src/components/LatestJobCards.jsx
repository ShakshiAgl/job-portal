import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = ({ job }) => {
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
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>Nepal</p>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-500 line-clamp-3'>
          {job?.description}
        </p>
      </div>

      <div className='flex items-center gap-2 mt-4 flex-wrap'>
        <Badge
          className="bg-teal-100 text-teal-700 font-semibold px-3 py-1 rounded-full text-sm hover:bg-teal-600 hover:text-white transition-colors duration-200"
        >
          {job?.position} Position(s)
        </Badge>
        <Badge
          className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full text-sm hover:bg-blue-600 hover:text-white transition-colors duration-200"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full text-sm hover:bg-green-600 hover:text-white transition-colors duration-200"
        >
          {job?.salary}
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
