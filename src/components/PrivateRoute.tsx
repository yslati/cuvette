import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {

    const { company } = useAppSelector((state) => state.auth)

    console.log(company);
    

    if (!company || !company.isEmailVerified || !company.isPhoneVerified)
        return (<Navigate to="/" />);

    return ( children );
}
 
export default PrivateRoute;