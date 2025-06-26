import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [isApplied, setIsApplied] = useState(false);

  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);

        // Update job in Redux with new applicant
        const updatedJob = {
          ...singleJob,
          applications: [...(singleJob.applications || []), { applicant: user?._id }],
        };

        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
    const errorMessage = error?.response?.data?.message;

    // If already applied, still update state
    if (errorMessage?.toLowerCase().includes('already applied')) {
      setIsApplied(true);
    }

    toast.error(errorMessage || 'Something went wrong');
  }
};

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        console.log("Job fetch response:", res.data);

        if (res.data.success && res.data.job) {
          dispatch(setSingleJob(res.data.job));

          const hasApplied = res.data.job.applications?.some(
            (application) => application.applicant === user?._id
          );
          setIsApplied(hasApplied);

          console.log("User has applied:", hasApplied);
          setIsApplied(hasApplied);
        } else {
          console.error("Job fetch failed or no job in response");
        }
      } catch (error) {
        console.error("Fetch Job Error:", error);
        toast.error('Failed to fetch job');
      }
    };

    fetchJob(); // Always fetch the job, even if user is not loaded yet
  }, [jobId, user?._id, dispatch]);

  // Optional loading UI
  if (!singleJob) {
    return (
      <div className="text-center my-10">
        <p className="text-xl">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{singleJob?.title ?? 'No title found'}</h1>
          <div className="flex flex-wrap gap-3 mt-3">
            <Badge className="bg-teal-100 text-teal-700 font-semibold px-3 py-1 rounded-full text-sm hover:bg-teal-600 hover:text-white transition-colors duration-200">
              {singleJob?.position} Position(s)
            </Badge>
            <Badge className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full text-sm hover:bg-blue-600 hover:text-white transition-colors duration-200">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full text-sm hover:bg-green-600 hover:text-white transition-colors duration-200">
              {singleJob?.salary}
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 text-base font-semibold ${
            isApplied
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#0e7777] hover:bg-[#096363] text-white'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-2xl font-semibold text-gray-700 border-b pb-3 mb-6">Job Overview</h2>
        <div className="space-y-4 text-lg text-gray-800">
          <p>
            <strong>Role:</strong>{' '}
            <span className="pl-2 text-gray-700">{singleJob?.title}</span>
          </p>
          <p>
            <strong>Location:</strong>{' '}
            <span className="pl-2 text-gray-700">{singleJob?.location}</span>
          </p>
          <p>
            <strong>Description:</strong>{' '}
            <span className="pl-2 text-gray-700">{singleJob?.description}</span>
          </p>
          <p>
            <strong>Experience Required:</strong>{' '}
            <span className="pl-2 text-gray-700">
              {singleJob?.experience ?? 'Not specified'} yrs
            </span>
          </p>
          <p>
            <strong>Salary Offered:</strong>{' '}
            <span className="pl-2 text-gray-700">{singleJob?.salary}</span>
          </p>
          <p>
            <strong>Total Applications:</strong>{' '}
            <span className="pl-2 text-gray-700">
              {singleJob?.applications?.length ?? 0}
            </span>
          </p>
          <p>
            <strong>Posted Date:</strong>{' '}
            <span className="pl-2 text-gray-700">
              {singleJob?.createdAt?.split('T')[0]}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
