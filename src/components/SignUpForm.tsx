import { BriefcaseIcon, EnvelopeIcon, PhoneIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { registerCompany } from "../features/authSlice";


const SignUpForm = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [employeeSize, setEmployeeSize] = useState<number | ''>(0);

    const dispatch = useAppDispatch();

    const submitForm = () => {
        if (!name || !phoneNumber || !companyName || !companyEmail || !employeeSize) return;
        if (employeeSize < 1 || employeeSize > 1000000) return;

        const data = {name, phoneNumber, companyName, companyEmail, employeeSize}
        dispatch(registerCompany(data))
    }

    return (
        <form className="mt-7 gap-y-4 flex flex-col"
            onSubmit={(e) => {
                e.preventDefault();
                submitForm();
            }}
        >
            <div className="flex items-center border py-2 px-3 rounded-lg text-inputTextColor border-borderColor bg-inputColor">
                <UserIcon className="h-6 w-6" />
                <input className=" w-full pl-2 outline-none border-none placeholder-grayColor/70 bg-inputColor" onChange={(e) => setName(e.target.value)} value={name} type="text" name="Name" placeholder="Name" />
            </div>
            <div className="flex items-center border py-2 px-3 rounded-lg text-inputTextColor border-borderColor bg-inputColor">
                <PhoneIcon className="h-6 w-6" />
                <input className=" w-full pl-2 outline-none border-none placeholder-grayColor/70 bg-inputColor" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} type="tel" name="Phone no" placeholder="Phone no." />
            </div>
            <div className="flex items-center border py-2 px-3 rounded-lg text-inputTextColor border-borderColor bg-inputColor">
                <BriefcaseIcon className="h-6 w-6" />
                <input className=" w-full pl-2 outline-none border-none placeholder-grayColor/70 bg-inputColor" onChange={(e) => setCompanyName(e.target.value)} value={companyName} type="text" name="Company Name" placeholder="Company Name" />
            </div>
            <div className="flex items-center border py-2 px-3 rounded-lg text-inputTextColor border-borderColor bg-inputColor">
                <EnvelopeIcon className="h-6 w-6" />
                <input className=" w-full pl-2 outline-none border-none placeholder-grayColor/70 bg-inputColor" onChange={(e) => setCompanyEmail(e.target.value)} value={companyEmail} type="email" name="Company Email" placeholder="Company Email" />
            </div>
            <div className="flex items-center border py-2 px-3 rounded-lg text-inputTextColor border-borderColor bg-inputColor">
                <UserGroupIcon className="h-6 w-6" />
                <input className=" w-full pl-2 outline-none border-none placeholder-grayColor/70 bg-inputColor" 
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setEmployeeSize(isNaN(value) ? '' : value);
                    }}
                    value={employeeSize === 0 ? '' : employeeSize}
                    min={1} max={1000000} type="number" name="Employee Size" placeholder="Employee Size" />
            </div>
            <div className="">
                <p className="text-center  text-grayColor/70 font-medium">
                    By clicking on proceed you wil accept our <br/>
                    <span className="text-mainColor/70">Terms</span> & <span className="text-mainColor/70">Conditions</span>
                </p>
            </div>
            <div className="w-full">
                <button type="submit" className="w-full py-2 font-bold text-white bg-mainColor rounded-lg text-xl">
                    Proceed
                </button>
            </div>
        </form>
    );
}
 
export default SignUpForm;