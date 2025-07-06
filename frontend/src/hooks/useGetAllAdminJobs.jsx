import {useEffect} from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '@/redux/jobSlice'

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

    useEffect(() => {
      const fetchAllAdminJobs = async () => {
        try {
          const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {withCredentials :true });
          
          console.log("API response:", res.data);

          if(res.data.success){
            dispatch(setAllAdminJobs(res.data.jobs));
            console.log("Dispatched Jobs:", res.data.jobs);
          }else {
            console.warn("Jobs fetch failed. Response success is false");
          }
        } catch (error) {
          console.log("Error fetching jobs:",error);
        }
      };
      fetchAllAdminJobs();
    },[dispatch]);
};

export default useGetAllAdminJobs
