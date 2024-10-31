import { useAppSelector } from "../../app/hooks";

const JobsList = () => {
    const { jobs } = useAppSelector((state) => state.jobs);

    return (
        <div className="mt-14 w-full grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
            { jobs?.map((job, index) =>
            <div key={index} className="w-80 p-4 rounded-lg border border-[#C5C5C5] shadow-sm">
                <h2 className="text-xl font-semibold">
                    {job.jobTitle}
                </h2>
                <p className="truncate text-sm text-black/90 mb-3">
                    {job.jobDescription}
                </p>
                <span className="text-xs text-gray-600">
                    End Date: {job.endDate.toString().split("T")[0]}
                </span>
            </div>
            )}
        </div>
    );
}
 
export default JobsList;