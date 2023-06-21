import { createQueue } from 'kue';

// Create a queue with Kue
const queue = createQueue();
const blacklisted = ['4153518780', '4153518781'];
// Create a function named sendNotification:
// It will take two arguments phoneNumber and message
function sendNotification(phoneNumber, message, job, done) {
  //track progress
  job.progress(0, 100);
  // It will log to the console Sending notification to PHONE_NUMBER, with message: MESSAGE
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  if (blacklisted.includes(phoneNumber)) {
    const errMsg = `Phone number ${phoneNumber} is blacklisted`;
    done(errMsg);
  } else {
    job.progress(50, 100);
    done();
  }
}
// process jobs of the queue push_notification_code_2 with two jobs at a time
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  // Every new job should call the sendNotification function with the phone number and the message contained within the job data;
  sendNotification(phoneNumber, message, job, done);
});