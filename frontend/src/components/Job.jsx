import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
  const navigate = useNavigate();
  // const jobId = "kdjksjdksdkjd";

  const daysAgoFunction = (mongodbTime) => {
     const createdAt = new Date(mongodbTime);
     const currentTime = new Date();
     const timeDifference = currentTime - createdAt; 
     return Math.floor(timeDifference/ (1000*24*60*60));
  }
  return (
    <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:scale-[1.01] max-h-screen overflow-auto hide-scrollbar">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-400">{daysAgoFunction(job?.createdAt) === 0 ?"Today" : 
          `${daysAgoFunction(job?.createdAt)} days ago`
          }</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark className="w-4 h-4 text-gray-500" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-gray-50 rounded-full border border-gray-200">
          <Avatar className="w-10 h-10">
            <AvatarImage src= {job?.company?.logo} />
          </Avatar>
        </div>
        <div>
          <h2 className="font-semibold text-base text-gray-800">{job?.company?.name}</h2>
          <p className="text-xs text-gray-500">Nepal</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h1 className="font-bold text-lg text-gray-900 mb-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          {job?.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <Badge className="bg-gray-100 text-gray-700 font-medium px-3 py-1 rounded-full text-xs" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-gray-100 text-gray-700 font-medium px-3 py-1 rounded-full text-xs" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="bg-gray-100 text-gray-700 font-medium px-3 py-1 rounded-full text-xs" variant="ghost">
          {job?.salary}
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-6">
        <Button onClick={() => navigate(`/description/${job?._id}`) } variant="outline" className="px-5 py-2 text-sm font-medium">Details</Button>
        <Button className="bg-[#008e97] hover:bg-[#00707a] text-white px-5 py-2 text-sm font-medium">
          Save For Later
        </Button>
      </div>
    </div>
  )
}

export default Job
