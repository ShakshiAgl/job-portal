import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='text-center mt-6'>
      <div className='flex flex-col gap-5 my-10'>
        <span className='px-4 mx-auto py-2 rounded-full bg-gray-100 text-[#217272] font-medium '>Nepal's smartest Job Search Platform</span>
        <h1 className='text-5xl font-bold'> Building <span className='text-[#217272]'> Careers </span> <br /> Empowering <span className='text-[#217272]'> Nepal </span></h1>
         <p> Your gateway to top IT career opportunities across Nepal.</p>
        <div className='flex w-[40%] shadow-lg border bordere-gray-200 pl-3 rounded-full items-center gap-4 mx-auto '>
          <input
            type="text"
            placeholder="Find your dream job"
            className='outline-none border-none w-full'
          />
          <Button className='rounded-r-full '>
            <Search className='h-5 w-5 '/>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection