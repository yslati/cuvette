import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import LoadingPage from "./Loading";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {

    const { company, loading } = useAppSelector((state) => state.auth)

    if (loading)
        return <LoadingPage />

    if (!company || !company.isEmailVerified || !company.isPhoneVerified)
        return (<Navigate to="/" />);

    return ( children );
}
 
export default PrivateRoute;