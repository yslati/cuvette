import { HomeIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="w-full h-screen font-DMSans flex mt-24 border-t border-[#C5C5C5]">
            <div className="px-5 py-10 border-r border-[#C5C5C5]">
                <Link to="/dashboard">
                    <HomeIcon className="text-[#576474] hover:text-[#576474]/90 w-9 h-9 cursor-pointer" />
                </Link>
            </div>
            <div className="px-10 py-10">
                <Link to="/add-job">
                    <button type="button"
                        className="text-xl text-white font-medium px-4 py-2 rounded-lg bg-mainColor hover:bg-mainColor/90"
                        >
                        Create Interview
                    </button>
                </Link>
            </div>
        </div>
    );
}
 
export default Dashboard;