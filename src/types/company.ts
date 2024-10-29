export interface Company {
    _id: string;
    name: string;
    phoneNumber: string;
    companyName: string;
    companyEmail: string;
    employeeSize: number
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