export interface Job {
    _id: string;
    companyId: string;
    jobTitle: string;
    jobDescription: string;
    experienceLevel: string;
    candidates: string[],
    endDate: Date;
    postedAt: Date;
}