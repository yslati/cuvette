import { HomeIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Job } from "../../types/job";
import { postJob } from "../../features/jobsSlice";
import EmailTagsInput from "./EmailTagsInput";

const AddJob = () => {
    const [jobTitle, setJobTitle] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [expLevel, setExpLevel] = useState('')
    const [candidate, setCandidate] = useState<string[]>([]);
    const [expDate, setExpDate] = useState({ startDate: null, endDate: null });

    const seniority = ["Junior Developer", "Mid-Level Developer", "Senior Developer", "Lead Developer"]
    const { company } = useAppSelector((state) => state.auth)
    const { loading } = useAppSelector((state) => state.jobs)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const setCandidateEmails = (emails: string[]) => {
        setCandidate(emails);
    };
    
    const handleAddJob = () => {
        if (!jobTitle || !jobDescription || !expLevel || !candidate.length || !expDate.endDate)
            return (toast.error('Please fill all job informations'));
        if (!company) return (toast.error('Error'));
        const jobInfo: Job = { companyId: company?._id, jobTitle, jobDescription, experienceLevel: expLevel, candidate, endDate: expDate.endDate };
        dispatch(postJob(jobInfo)).unwrap()
        .then(() => {
            toast.success('Job posted successfully');
            setJobTitle('');
            setJobDescription('');
            setExpLevel('');
            setCandidate([]);
            setExpDate({ startDate: null, endDate: null });
            navigate("/dashboard");
        })
        .catch((error) => {
            toast.error(`Failed to post job: ${error.message || 'Unknown error'}`);
        });
    }

    return (
    <div className="w-full h-screen font-DMSans flex mt-24 border-t border-[#C5C5C5]">
        <div className="px-5 py-10 border-r border-[#C5C5C5]">
            <Link to="/dashboard">
                <HomeIcon className="text-[#576474] hover:text-[#576474]/90 w-9 h-9 cursor-pointer" />
            </Link>
        </div>
        <div className="h-full px-10 py-10">
           <form className="mt-10 flex flex-col gap-y-4" 
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAddJob();
                }}
           >
                <div className="w-full flex items-center gap-x-10 justify-end">
                    <label className="inline-block text-2xl">
                        Job Title
                    </label>
                    <input className="w-[40.81rem] text-lg outline-none placeholder-grayColor/70 border py-3 px-8 rounded-lg border-borderColor  text-inputTextColor" 
                        onChange={(e) => setJobTitle(e.target.value)} value={jobTitle} minLength={3} maxLength={100}
                        type="text" name="Job Title" placeholder="Enter Job Title" />
                </div>
                <div className="w-full flex items-start gap-x-10 justify-end">
                    <label className="inline-block text-2xl mt-2">
                        Job Description
                    </label>
                    <textarea className="w-[40.81rem] h-[16.9rem] text-lg outline-none resize-none placeholder-grayColor/70 border py-3 px-8 rounded-lg border-borderColor  text-inputTextColor" 
                        onChange={(e) => setJobDescription(e.target.value)} value={jobDescription} minLength={10} maxLength={2000}
                        name="Job Description" placeholder="Enter Job Description" />
                </div>
                <div className="w-full flex items-center gap-x-10 justify-end">
                    <label className="inline-block text-2xl">
                        Experience Level
                    </label>
                    <select defaultValue="Select Experience Level" onChange={(e) => setExpLevel(e.target.value)}
                        className="w-[40.81rem] text-lg outline-none bg-white placeholder-grayColor/70 border py-3 px-8 rounded-lg border-borderColor  text-inputTextColor"
                    >
                        <option value="Select Experience Level">Select Experience Level</option>
                        { seniority.map((item) => <option key={item} value={item}>{item}</option>) }
                    </select>
                </div>
                <div className="w-full flex items-start gap-x-10 justify-end">
                    <label className="inline-block text-2xl">
                        Add Candidate
                    </label>
                    <EmailTagsInput onEmailsChange={setCandidateEmails} />
                </div>
                <div className="w-full flex items-center gap-x-10 justify-end">
                    <label className="inline-block text-2xl">
                        End Date
                    </label>
                    <Datepicker 
                        value={expDate}
                        asSingle={true}
                        useRange={false}
                        minDate={new Date()}
                        displayFormat="DD/MM/YYYY"
                        placeholder="Select a Date"
                        inputClassName="w-full text-lg outline-none py-2.5 px-8 bg-white placeholder-grayColor/70 border rounded-lg border-borderColor text-inputTextColor"
                        containerClassName="w-[40.81rem] relative"
                        onChange={(newValue: any) => setExpDate(newValue)}
                    /> 
                </div>
                <div className="w-full flex items-center justify-end">
                    <button type="submit"
                        className="px-10 py-2 bg-mainColor hover:bg-mainColor/90 rounded-lg text-white text-xl font-semibold"
                        disabled={loading}
                    >
                        { loading ? 'Posting...' : 'Send' }
                    </button>
                </div>
           </form>
        </div>
    </div>
    );
}
 
export default AddJob;