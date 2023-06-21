export default function createPushNotificationsJobs(jobs, queue) {
    const jobChecker = jobs instanceof Array;
    if (!jobChecker) {
      throw new Error("Jobs is not an array");
    }
    jobs.forEach(job_msg => {
      // const queue = createQueue();
      const job = queue.create('push_notification_code_3', job_msg);
      job.save((error) => {
        if (!error) console.log(`Notification job created: ${job.id}`);
      });
      job.on("failed", (error) => {
        console.log(`Notification job ${job.id} failed: ${error}`);
      });
      job.on("complete", () => {
        console.log(`Notification job ${job.id} completed`);
      });
      job.on("progress", (percentage) => {
        console.log(`Notification job ${job.id} ${percentage}% complete`);
      });
    });
  };