import { IJob } from "modules/jobs/jobs.types";

export const getJobMeta = (jobs: IJob[]) => {
  const noOfPendingJobs = jobs.filter(
    (job: IJob) => job.status === "Pending"
  ).length;

  const noOfCompletedJobs = jobs.filter(
    (job: IJob) => job.status === "Completed"
  ).length;

  const noOfCancelledJobs = jobs.filter(
    (job) => job.status === "Cancelled"
  ).length;

  const noOfOngoingJobs = jobs.filter((job) => job.status === "Ongoing").length;
  const noOfJobRequests = jobs.length;

  const noOfReviews = jobs.filter(
    (job) => job.status === "Completed" && job.review
  ).length;

  const jobSuccessRate =
    (noOfCompletedJobs / (noOfCompletedJobs + noOfCancelledJobs)) * 100;

  return {
    noOfJobRequests,
    noOfCompletedJobs,
    noOfOngoingJobs,
    noOfCancelledJobs,
    noOfPendingJobs,
    noOfReviews,
    jobSuccessRate,
  };
};
