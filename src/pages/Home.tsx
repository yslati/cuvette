import { Link } from "react-router-dom";

const Home = () => {

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-y-5">
            <h1 className="text-3xl">
                Welcome
            </h1>
            <Link to={"/register"}>
                <button className="px-4 py-2 rounded-xl bg-mainColor hover:bg-mainColor/90 text-white text-xl font-medium">
                    register
                </button>
            </Link>
        </div>
    );
}
 
export default Home;