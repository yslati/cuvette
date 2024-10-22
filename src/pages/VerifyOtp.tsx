import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { verifyEmailOtp, verifyPhoneOtp } from "../features/authSlice";
import LoadingSVG from "../components/LoadingSVG";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
    const [emailOtp, setEmailOtp] = useState('');
    const [phoneOtp, setPhoneOtp] = useState('');
    const [emailLoading, setEmailLoading] = useState(false);
    const [phoneLoading, setPhoneLoading] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { company, loading } = useAppSelector((state) => state.auth);

    const isOtpValid = (otp: any) => /^[0-9]{6}$/.test(otp);
    const isEmailOtpValid = isOtpValid(emailOtp);
    const isPhoneOtpValid = isOtpValid(phoneOtp);

    const submitEmailOtp = () => {
        if (company) {
            setEmailLoading(true)
            dispatch(verifyEmailOtp({ companyEmail: company.companyEmail, emailOtp }))
            .then(() => { setEmailLoading(false); setEmailOtp('') });
        }
    }

    const submitPhoneOtp = () => {
        if (company) {
            setPhoneLoading(true);
            dispatch(verifyPhoneOtp({ companyEmail: company.companyEmail, phoneOtp }))
            .then(() => { setPhoneLoading(false); setPhoneOtp('') });
        }
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
                        disabled={company?.isEmailVerified}
                    />
                    { company?.isEmailVerified && <CheckCircleIcon className="w-6 h-6 text-green-500 mr-1" /> }
                </div>
                {!company?.isEmailVerified &&
                    <button className="w-full py-2 font-bold text-white bg-mainColor rounded-lg text-xl"
                        disabled={!isEmailOtpValid || emailLoading} style={!isEmailOtpValid ? { backgroundColor: "#5f96e8" } : {} }
                        onClick={() => submitEmailOtp()}
                    >
                        Verify 
                        { loading && emailLoading && <LoadingSVG /> }
                    </button>
                }
            </div>
            <div className="flex flex-col gap-y-4">
                <div className="flex items-center border py-2.5 px-3 rounded-lg text-inputTextColor border-borderColor bg-inputColor">
                    <EnvelopeIcon className="h-6 w-6" />
                    <input className="w-full pl-2 outline-none border-none placeholder-grayColor/70 bg-inputColor"
                        onChange={(e) => setPhoneOtp(e.target.value)}
                        value={phoneOtp} type="text" name="Mobile Otp" placeholder="Mobile Otp"
                        maxLength={6}
                        disabled={company?.isPhoneVerified}
                    />
                    { company?.isPhoneVerified && <CheckCircleIcon className="w-6 h-6 text-green-500 mr-1" /> }
                </div>
                {!company?.isPhoneVerified &&
                    <button className="w-full py-2 font-bold text-white bg-mainColor rounded-lg text-xl"
                        disabled={!isPhoneOtpValid || phoneLoading} style={!isPhoneOtpValid ? { backgroundColor: "#5f96e8" } : {} }
                        onClick={() => submitPhoneOtp()}
                    >
                        Verify 
                        { loading && phoneLoading && <LoadingSVG /> }
                    </button>
                }
            </div>
        </div>
    );
}
 
export default VerifyOtp;