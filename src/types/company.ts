export interface Company {
    _id: string;
    name: string;
    phoneNumber: string;
    companyName: string;
    companyEmail: string;
    employeeSize: number
    emailOtp: string;
    phoneOtp: string;
    otpExpiration: Date;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    isVerified: boolean;
    refreshToken: string;
}

export interface RegisterForm {
    name: string
    phoneNumber: string
    companyName: string
    companyEmail: string
    employeeSize: number
}