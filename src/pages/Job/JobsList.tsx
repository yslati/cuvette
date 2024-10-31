import { useAppSelector } from "../../app/hooks";

const JobsList = () => {
    const { jobs } = useAppSelector((state) => state.jobs);

    return (
        <div className="w-full">

        </div>
    );
}
 
export default JobsList;