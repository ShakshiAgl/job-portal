import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills=["HTML", "CSS", "Javascript","Python"]
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const {user} = useSelector(store=>store.auth);
  
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className="flex justify-between">

          <div className='flex items-center gap-6'>

            <Avatar className="w-24 h-24">
              <AvatarImage
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8kjNASp-t4VymZrnRo9hIMRSeTcWNarxbJw&s"
                alt="profile"
                className="w-24 h-24 object-cover rounded-full"
              />
            </Avatar>

            <div>
              <h1 className='font-medium text-2xl'>{user?.fullname}</h1>
              <p className='text-gray-600'>
                 {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)}
          className="text-right" variant="outline"><Pen /></Button>
        </div>
        <div className="my-5">
          <div className=" flex items-center gap-3 my-2">

            <Mail />
            <span>{user?.email}</span>
          </div>

          <div className=" flex items-center gap-3">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        
        <div className="my-5">
          <h2 className='font-bold text-lg '>Skills</h2>
          <div className="flex items-center gap-2 ">
          {
            user?.profile?.
         skills?.length !==0 ? 
          user?.profile?.skills?.map((item, index) =>
           <Badge className='bg-[#008e97]'
            key={index}>{item}
            </Badge>)   
            : <span>NA</span>
          }
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
           <Label className="font-bold text-lg ">Resume</Label>
           {
            isResume ? <a target='blank' href={user?.profile?.resume} className='hover:underline hover:text-[#008e97] cursor-pointer w-full'> {user?.profile?.resumeOriginalName} </a> : <span>NA</span>
           }
        </div>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
        </div>
        {/* Application Table  */}
        <AppliedJobTable />
        
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile
