import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import toast from "react-hot-toast";
import { loginCompany } from "../../../features/authSlice";

const LoginForm = () => {
    const [companyEmail, setCompanyEmail] = useState('');
    
    const dispatch = useAppDispatch();

    const submitLogin = () => {
        if (!companyEmail) {
            toast.error('Add your company email');
            return
        }
        dispatch(loginCompany(companyEmail));
    }

    return (
        <form className="mt-7 gap-y-4 flex flex-col"
            onSubmit={(e) => {
                e.preventDefault();
                submitLogin();
            }}
        >
            <div className="flex items-center border py-2 px-3 rounded-lg text-inputTextColor border-borderColor bg-inputColor">
                <EnvelopeIcon className="h-6 w-6" />
                <input className=" w-full pl-2 outline-none border-none placeholder-grayColor/70 bg-inputColor"
                    onChange={(e) => setCompanyEmail(e.target.value)} value={companyEmail}
                    type="email" name="Company Email" placeholder="Company Email" />
            </div>
            <div className="w-full">
                <button type="submit" className="w-full py-2 font-bold text-white bg-mainColor rounded-lg text-xl">
                    Send Otp
                </button>
            </div>
        </form>
    );
}
 
export default LoginForm;