import { useAppDispatch } from "../app/hooks";

const Dashboard = () => {
    const dispatch = useAppDispatch();


    return (
        <div className="w-screen h-screen font-DMSans flex flex-col justify-center items-center">
            <h1>
                Dashboard
            </h1>
        </div>
    );
}
 
export default Dashboard;