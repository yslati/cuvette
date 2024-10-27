import { useAppSelector } from "../../app/hooks";
import LoginForm from "./Form/LoginForm";
import VerifyOtp from "./VerifyOtp";

const Login = () => {
    const { company } = useAppSelector((state) => state.auth);

    // console.log(company);
    

    return (
        <div className="w-screen h-screen flex items-center justify-between px-36 font-DMSans gap-x-5">
            <div className="w-[39rem]">
                <p className="text-grayColor/70 ">
                    Lorem Ipsum is simply dummy text of the printing and  typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley
                </p>
            </div>
            <div className="w-[39rem]">
                <div className="bg-gradient-to-r from-[#3F71FF] to-[#AA54FF] rounded-xl p-[0.07rem]">
                    <div className="flex flex-col justify-center items center rounded-xl p-10 bg-white">
                        <h1 className="font-semibold text-2xl text-center ">
                            Login
                        </h1>
                        <p className="text-grayColor/70 text-sm font-medium text-center">
                            Lorem Ipsum is simply dummy text
                        </p>
                        { company ? <VerifyOtp /> : <LoginForm /> }
                        
                    </div>
                </div>
            </div>
        </div>
        
    );
}
 
export default Login;