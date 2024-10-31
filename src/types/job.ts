export interface Job {
    companyId: string;
    jobTitle: string;
    jobDescription: string;
    experienceLevel: string;
    candidate: string[],
    endDate: Date;
}