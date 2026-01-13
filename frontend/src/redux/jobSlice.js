import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const JOB_API = "http://localhost:8000/api/v1/jobs"; // ✅ centralized

// ✅ 1. Fetch all jobs
export const fetchAllJobs = createAsyncThunk(
  "job/fetchAllJobs",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${JOB_API}/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data.jobs; // backend returns { jobs, success }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server Error");
    }
  }
);

// ✅ 2. Fetch single job
export const fetchSingleJob = createAsyncThunk(
  "job/fetchSingleJob",
  async (jobId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${JOB_API}/get/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data.job;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server Error");
    }
  }
);

// ✅ 3. Apply to a job
export const applyToJob = createAsyncThunk(
  "job/applyToJob",
  async (jobId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${JOB_API}/${jobId}/apply`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return { jobId, application: res.data.application };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Server Error");
    }
  }
);

// ✅ Initial State
const initialState = {
  allJobs: [],
  allAdminJobs: [],
  singleJob: null,
  searchJobByText: "",
  searchedQuery: "",
  allAppliedJobs: [],
  loading: false,
  error: null,
};

// ✅ Slice
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all jobs
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.allJobs = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch single job
      .addCase(fetchSingleJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleJob.fulfilled, (state, action) => {
        state.loading = false;
        state.singleJob = action.payload;
      })
      .addCase(fetchSingleJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Apply to job
      .addCase(applyToJob.fulfilled, (state, action) => {
        if (state.singleJob && state.singleJob._id === action.payload.jobId) {
          state.singleJob.applications = [
            ...(state.singleJob.applications || []),
            action.payload.application,
          ];
        }
      });
  },
});

// ✅ Exports
export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
} = jobSlice.actions;

export default jobSlice.reducer;
