import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axiosConfig'
import { Company, RegisterForm } from '../types/company'

interface CompanyState {
    company: Company | null
    loading: boolean
    error: string | null
}

const initialState: CompanyState = {
    company: null,
    loading: false,
    error: null
}

export const registerCompany = createAsyncThunk(
    'auth/register',
    async (companyData: RegisterForm, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/register', companyData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const verifyEmailOtp = createAsyncThunk(
    'auth/verify-email-otp',
    async ({ companyEmail, emailOtp }: { companyEmail: string; emailOtp: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/verify-email-otp', { companyEmail, emailOtp });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const verifyPhoneOtp = createAsyncThunk(
    'auth/verify-phone-otp',
    async ({ companyEmail, phoneOtp }: { companyEmail: string; phoneOtp: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/verify-phone-otp', { companyEmail, phoneOtp });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const refreshToken = createAsyncThunk(
    'auth/refresh-token',
    async (data: { companyEmail: string; refreshToken: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/refresh-token', data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.company = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('accessToken');
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerCompany.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerCompany.fulfilled, (state, action: PayloadAction<{ message: string, companyData: Company }>) => {
            state.company = action.payload.companyData;
            state.loading = false;
            state.error = null;
        })
        .addCase(registerCompany.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
            console.log(state.error);
        })

        .addCase(verifyEmailOtp.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(verifyEmailOtp.fulfilled, (state, action: PayloadAction<{ accessToken: string, companyData: Company, message: string }>) => {
            state.loading = false;
            state.company = action.payload.companyData;
            if (action.payload.accessToken)
                localStorage.setItem("accessToken", action.payload.accessToken);
            state.error = null;
        })
        .addCase(verifyEmailOtp.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(verifyPhoneOtp.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(verifyPhoneOtp.fulfilled, (state, action: PayloadAction<{ accessToken: string, companyData: Company, message: string }>) => {
            state.loading = false;
            state.company = action.payload.companyData;
            if (action.payload.accessToken)
                localStorage.setItem("accessToken", action.payload.accessToken);
            state.error = null;
        })
        .addCase(verifyPhoneOtp.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default authSlice.reducer
export const { logout } = authSlice.actions;