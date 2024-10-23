import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/authSlice"

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const handlelogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <div className="w-screen h-screen font-DMSans flex flex-col justify-center items-center">
            <h1>
                Dashboard
            </h1>
            <button className="px-2 py-1 bg-mainColor rounded-lg text-white text-lg" 
                onClick={() => handlelogout()}
            >
                logout
            </button>
        </div>
    );
}
 
export default Dashboard;