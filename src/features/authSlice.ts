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
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerCompany.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerCompany.fulfilled, (state, action: PayloadAction<Company>) => {
            state.loading = false;
            state.company = action.payload;
            state.error = null;
        })
        .addCase(registerCompany.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(verifyEmailOtp.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(verifyEmailOtp.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.company = { ...state.company, isEmailVerified: true } as Company;
            // refresh token and access token 
            state.error = null;
        })
        .addCase(verifyEmailOtp.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default authSlice.reducer
export const { logout } = authSlice.actions;