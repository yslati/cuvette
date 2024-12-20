import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const Home = () => {

    const { company } = useAppSelector((state) => state.auth);

    if (company && company.isEmailVerified && company.isPhoneVerified)
        return (<Navigate to="/dashboard" />)

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-y-5">
            <h1 className="text-3xl">
                Welcome
            </h1>
            <div className="flex gap-x-5">
                <Link to={"/register"} reloadDocument>
                    <button className="px-4 py-2 rounded-xl bg-mainColor hover:bg-mainColor/90 text-white text-xl font-medium">
                        Register
                    </button>
                </Link>
                <Link to={"/login"} reloadDocument>
                    <button className="px-7 py-2 rounded-xl bg-mainColor hover:bg-mainColor/90 text-white text-xl font-medium">
                        Login
                    </button>
                </Link>
            </div>
        </div>
    );
}
 
export default Home;