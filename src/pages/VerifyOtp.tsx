import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { verifyEmailOtp } from "../features/authSlice";

const VerifyOtp = () => {
    const [emailOtp, setEmailOtp] = useState('');
    const [phoneOtp, setPhoneOtp] = useState('');

    const dispatch = useAppDispatch();
    const { company, loading } = useAppSelector((state) => state.auth);

    const isOtpValid = (otp: any) => /^[0-9]{6}$/.test(otp);
    const isEmailOtpValid = isOtpValid(emailOtp);
    const isPhoneOtpValid = isOtpValid(phoneOtp);

    const submitEmailOtp = () => {
        if (company) {
            dispatch(verifyEmailOtp({ companyEmail: company.companyEmail, emailOtp }));
            
        }
    }

    const submitPhoneOtp = () => {
        
    }

    return (
        <div className="mt-7 gap-y-6 flex flex-col">
            <div className="flex flex-col gap-y-4">
                <div className="flex items-center border py-2.5 px-3 rounded-lg text-inputTextColor border-borderColor bg-inputColor">
                    <EnvelopeIcon className="h-6 w-6" />
                    <input className="w-full pl-2 outline-none border-none placeholder-grayColor/70 bg-inputColor"
                        onChange={(e) => setEmailOtp(e.target.value)}
                        value={emailOtp} type="text" name="Email Otp" placeholder="Email Otp"
                        maxLength={6}
                    />
                </div>
                <button className="w-full py-2 font-bold text-white bg-mainColor rounded-lg text-xl"
                    disabled={!isEmailOtpValid} style={!isEmailOtpValid ? { backgroundColor: "#5f96e8" } : {} }
                    onClick={() => submitEmailOtp()}
                >
                    Verify
                </button>
            </div>
            <div className="flex flex-col gap-y-4">
                <div className="flex items-center border py-2.5 px-3 rounded-lg text-inputTextColor border-borderColor bg-inputColor">
                    <EnvelopeIcon className="h-6 w-6" />
                    <input className="w-full pl-2 outline-none border-none placeholder-grayColor/70 bg-inputColor"
                        onChange={(e) => setPhoneOtp(e.target.value)}
                        value={phoneOtp} type="text" name="Phone Otp" placeholder="Phone Otp"
                        maxLength={6}
                    />
                </div>
                <button className="w-full py-2 font-bold text-white bg-mainColor rounded-lg text-xl"
                    disabled={!isPhoneOtpValid} style={!isPhoneOtpValid ? { backgroundColor: "#5f96e8" } : {} }
                    onClick={() => submitPhoneOtp()}
                >
                    Verify
                </button>
            </div>
        </div>
    );
}
 
export default VerifyOtp;