import React, { useState, useEffect } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';
import axios from 'axios';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  // Keep input state
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    bio: '',
    skills: '', // changed to string for easy input binding
    file: null,
  });
  const [loading, setLoading] = useState(false);

  // Reset form inputs every time dialog opens
  useEffect(() => {
    if (open && user) {
      setInput({
        fullname: user.fullname || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        bio: user.profile?.bio || '',
        skills: user.profile?.skills?.join(', ') || '', // convert skills array to comma-separated string
        file: null, 
      });
    }
  }, [open, user]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", JSON.stringify(input.skills.split(',').map(s => s.trim()))); // convert string back to array

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="fullname" className='text-right'>Name</Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                className='col-span-3'
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="email" className='text-right'>Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                className='col-span-3'
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="phoneNumber" className='text-right'>Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className='col-span-3'
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="bio" className='text-right'>Bio</Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className='col-span-3'
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="skills" className='text-right'>Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className='col-span-3'
                placeholder="Comma separated skills"
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="file" className='text-right'>Resume</Label>
              <Input
                id="file"
                name="file"
                type="file"
                onChange={fileChangeHandler}
                accept="application/pdf"
                className='col-span-3'
              />
            </div>
          </div>

          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 bg-[#217272]">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
