import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {

    const { company } = useAppSelector((state) => state.auth)

    if (!company) return <Navigate to="/login" />

    return ( children );
}
 
export default PrivateRoute;