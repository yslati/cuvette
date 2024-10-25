import { HomeIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";


const AddJob = () => {
    const [jobTitle, setJobTitle] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [expLevel, setExpLevel] = useState('')
    const [expDate, setExpDate] = useState({ 
        startDate: null, 
        endDate: null
    });

    const MIN_DATE = new Date();
    MIN_DATE.setDate(MIN_DATE.getDate() + 1);
    const seniority = ["Junior Developer", "Mid-Level Developer", "Senior Developer", "Lead Developer"]
    
    const handleAddJob = () => {}

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
                        onChange={(e) => setJobTitle(e.target.value)} value={jobTitle}
                        type="text" name="Job Title" placeholder="Enter Job Title" />
                </div>
                <div className="w-full flex items-start gap-x-10 justify-end">
                    <label className="inline-block text-2xl mt-2">
                        Job Description
                    </label>
                    <textarea className="w-[40.81rem] h-[16.9rem] text-lg outline-none resize-none placeholder-grayColor/70 border py-3 px-8 rounded-lg border-borderColor  text-inputTextColor" 
                        onChange={(e) => setJobDescription(e.target.value)} value={jobDescription}
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
                <div className="w-full flex items-center gap-x-10 justify-end">
                    <label className="inline-block text-2xl">
                        End Date
                    </label>
                    <Datepicker 
                        value={expDate}
                        asSingle={true}
                        useRange={false}
                        minDate={MIN_DATE}
                        displayFormat="DD/MM/YYYY"
                        onChange={(newValue: any) => setExpDate(newValue)}
                    /> 
                </div>
           </form>
        </div>
    </div>
    );
}
 
export default AddJob;