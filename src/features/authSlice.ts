import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axiosConfig'
import { Company, RegisterForm } from '../types/company'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { RootState } from '../app/store'
import toast from 'react-hot-toast'

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
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (accessToken && refreshToken) {
            const decodedToken = jwtDecode<JwtPayload>(accessToken);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp && decodedToken.exp < currentTime) {
                try {
                    const response = await axiosInstance.post('/auth/refresh-token', {
                        companyEmail: state.auth.company?.companyEmail,
                        refreshToken,
                    });
                    return response.data;
                } catch (error) {
                    dispatch(logout());
                    throw new Error('Session expired, please log in again.');
                }
            }
            return accessToken;
        } else {
            dispatch(logout());
        }
    }
);

export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async (_, { dispatch }) => {
        try {
            await dispatch(checkTokenExpiration());
            // load user data
        } catch (error) {
            console.error(error);
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
            }
            state.error = null;
        })
        .addCase(verifyPhoneOtp.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
            toast.error(state.error);
        })

        .addCase(checkTokenExpiration.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            localStorage.setItem('accessToken', action.payload.accessToken)
        })
        .addCase(checkTokenExpiration.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Token validation failed.';
        })
        .addCase(initializeAuth.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(initializeAuth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Initialization failed.';
        })
    }
})

export default authSlice.reducer
export const { logout } = authSlice.actions;