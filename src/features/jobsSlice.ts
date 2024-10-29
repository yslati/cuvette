import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Job } from "../types/job"
import axiosInstance from "../utils/axiosConfig"

interface JobState {
    loading: boolean
    error: string | null
    jobs: Job[] | null
}

const initialState: JobState = {
    loading: false,
    error: null,
    jobs: null
}

export const postJob = createAsyncThunk(
    'jobs/post-job',
    async (jobInfo: Job, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/jobs/post-job', jobInfo);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(postJob.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(postJob.fulfilled, (state, action: PayloadAction<{ message: string, job: Job }>) => {
            state.loading = false;
            state.error = null;
            console.log(action.payload);
            state.jobs?.push(action.payload.job);
        })
        .addCase(postJob.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default jobsSlice.reducer