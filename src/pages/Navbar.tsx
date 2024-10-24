import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/authSlice";
import { useState } from "react";

const Navbar = () => {
    const [navDropped, setNavDropped] = useState(false);

    const dispatch = useAppDispatch();
    const { company } = useAppSelector((state) => state.auth)

    const handlelogout = () => {
        dispatch(logout());
    }

    return (
        <nav className="absolute top-0 right-0 w-screen py-7 flex justify-between px-14 font-DMSans items-center">
            <div className="">
                <Link to={"/"}>
                    <img src="./logo.png" alt="Logo" 
                        className="w-[10.31rem] h-full object-cover"
                        />
                </Link>
            </div>
            <div className="flex gap-x-10 items-center">
                <div className="">
                    <button className="text-grayColor/70 text-[1.75rem]">
                        Contact
                    </button>
                </div>
                { company && company.isEmailVerified && company.isPhoneVerified &&
                <div className="">
                    <div onClick={() => setNavDropped(!navDropped)} className="w-52 border-[0.078rem] rounded-lg border-[#83909F] px-5 py-2 flex gap-x-4 items-center cursor-pointer">
                        <div className="bg-[#A8A8A8] rounded-full p-3" />
                        <span className="text-[#6A6A6A] text-lg truncate select-none">
                            { company?.name }
                        </span>
                        <ChevronDownIcon className="text-[A8A8A8] h-4 w-4" />
                    </div>
                    <div hidden={!navDropped} className="absolute overflow-x-auto w-52 -mt-1.5 z-10 bg-white rounded-b-lg shadow  divide-y divide-[#83909F]/60 border-x border-b border-[#83909F] transition-all duration-500">
                        <div className="px-4 py-3 text-sm text-gray-900">
                            <span className="font-medium truncate">{ company?.companyEmail }</span>
                        </div>
                        <ul className=" text-sm text-gray-700">
                            <li><Link to="/dashboard" className="block px-4 py-3 hover:bg-gray-200">Dashboard</Link></li>
                            <li><Link to="#" className="block px-4 py-3 hover:bg-gray-200">Settings</Link></li>
                        </ul>
                        <div className="">
                            <Link onClick={() => handlelogout()} to="/" className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-200 rounded-b-lg">
                                Sign out
                            </Link>
                        </div>
                    </div>
                </div>
                }
            </div>
        </nav>
    );
}
 
export default Navbar;