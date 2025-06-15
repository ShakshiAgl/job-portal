import React, { useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const isAuthenticated = !!user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Redux Auth State:', { user, isAuthenticated });
  }, [user, isAuthenticated]);

  const logoutHandler = async () => {
   try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials : true });
      if(res.data.success){
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
   } 
   catch (error){
    console.log(error);
    toast.error(error.response.data.message);
   }
  }

  return (
    <div className="bg-white shadow">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <h1 className="text-2xl ml-20 font-bold text-[#008E97]">
          Careers<span className="text-[#0b2527]">Nepal</span>
        </h1>

        {/* Navigation + Auth/Profile */}
        <div className="flex items-center gap-6">
          <ul className="flex font-medium items-center gap-10">
            <li className="cursor-pointer transition duration-300 relative group">
              <Link
                to="/"
                className="inline-block text-[#008e97] group-hover:text-black transition-colors duration-300"
              >
                Home
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li className="cursor-pointer transition duration-300 relative group">
              <Link
                to="/jobs"
                className="inline-block text-[#008e97] group-hover:text-black transition-colors duration-300"
              >
                Jobs
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li className="cursor-pointer transition duration-300 relative group">
              <Link
                to="/browse"
                className="inline-block text-[#008e97] group-hover:text-black transition-colors duration-300"
              >
                Browse
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>


          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="text-[#217272]">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#008e97] hover:bg-[#217272]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer">
                  <Avatar>
                    <AvatarImage
                      src= {user?.profile?.profilePhoto}
                      alt={user?.fullname || 'User'}
                      className="w-10 h-10 rounded-full"
                    />
                  </Avatar>
                </div>
              </PopoverTrigger>

              <PopoverContent className="bg-white border rounded-md shadow-md p-4 w-60 z-50">
                <div className="flex items-center gap-3">
                  <img 
                    src= {user?.profile?.profilePhoto}
                    alt={user?.fullname || 'User'}
                    className="w-10 h-10 rounded-full"
                  />

                  <div className="group cursor-pointer">
                    <p className="font-semibold text-[#008e97] transition-all duration-300 transform group-hover:text-[#183f42] group-hover:scale-105 inline-block">
                      {user?.fullname || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">{user?.role || 'Member'}</p>
                  </div>

                </div>
                <hr className="my-2" />
                <div className="space-y-2 text-sm">

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 [#217272] hover:text-[#000000] "
                  >
                    <span>👤</span>
                    <span> View Profile</span> 
                  </Link>

                  <div 
                   onClick={logoutHandler}
                    className="flex items-center gap-2 cursor-pointer [#217272] hover:text-[#000000] font-semibold text-[#217272]"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
