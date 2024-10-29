import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axiosConfig'
import { Company, RegisterForm } from '../types/company'
import toast from 'react-hot-toast'

interface CompanyState {
    company: Company | null
    loading: boolean
    error: string | null
    initialized: boolean
}

const initialState: CompanyState = {
    company: null,
    loading: false,
    error: null,
    initialized: false
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

export const loginCompany = createAsyncThunk(
    'auth/login',
    async (companyEmail: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/login', { companyEmail });
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

export const checkTokenExpiration = createAsyncThunk(
    'auth/check-token-expiration',
    async (_, { dispatch }) => {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
            try {
                const response = await axiosInstance.post('/auth/refresh-token', {refreshToken});
                const { accessToken, company } = response.data;                
                localStorage.setItem('accessToken', accessToken);
                return company
            } catch (error) {
                dispatch(logout());
                throw new Error('Session expired, please log in again.');
            }
        }
    }
);

export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async (_, { dispatch }) => {
        try {
            await dispatch(checkTokenExpiration());
        } catch (error) {
            console.error(error);
            dispatch(logout());
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCompany(state, action: PayloadAction<Company>) {
            state.company = action.payload;
        },
        logout: (state) => {
            state.company = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
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
            state.error = action.payload.message;
            toast.error(state.error);
        })

        .addCase(loginCompany.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginCompany.fulfilled, (state, action: PayloadAction<{ message: string, companyData: Company }>) => {
            state.company = action.payload.companyData;
            state.loading = false;
            state.error = action.payload.message;
            if (state.error)
                toast.error(state.error);
        })
        .addCase(loginCompany.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
            toast.error(state.error);
        })

        .addCase(verifyEmailOtp.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(verifyEmailOtp.fulfilled, (state, action: PayloadAction<{ accessToken: string, companyData: Company, message: string }>) => {
            state.loading = false;
            state.company = action.payload.companyData;
            if (action.payload.accessToken) {
                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem("refreshToken", state.company.refreshToken);
                toast.success(action.payload.message);
            }
            state.error = null;
        })
        .addCase(verifyEmailOtp.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
            toast.error(state.error);
        })

        .addCase(verifyPhoneOtp.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(verifyPhoneOtp.fulfilled, (state, action: PayloadAction<{ accessToken: string, companyData: Company, message: string }>) => {
            state.loading = false;
            state.company = action.payload.companyData;
            if (action.payload.accessToken) {
                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem("refreshToken", state.company.refreshToken);
                toast.success(action.payload.message);
            }
            state.error = null;
        })
        .addCase(verifyPhoneOtp.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
            toast.error(state.error);
        })

        .addCase(checkTokenExpiration.pending, (state) => {
            state.loading = true; 
        })
        .addCase(checkTokenExpiration.fulfilled, (state, action: PayloadAction<Company>) => {
            if (action.payload) {
                state.company = action.payload
            }
            state.loading = false;
            
        })
        .addCase(checkTokenExpiration.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Token validation failed.';
        })
        .addCase(initializeAuth.pending, (state) => {
            state.loading = true;
        })
        .addCase(initializeAuth.fulfilled, (state) => {
            state.loading = false;
            state.initialized = true;
        })
        .addCase(initializeAuth.rejected, (state, action) => {
            state.loading = false;
            state.initialized = true;
            state.error = action.error.message || 'Initialization failed.';
        })
    }
})

export default authSlice.reducer
export const { logout } = authSlice.actions;