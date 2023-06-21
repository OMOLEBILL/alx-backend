import { createQueue } from 'kue';

// Create a queue with Kue
const queue = createQueue();
// Create a function named sendNotification:
// It will take two arguments phoneNumber and message
function sendNotification(phoneNumber, message) {
  // It will log to the console Sending notification to PHONE_NUMBER, with message: MESSAGE
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}
// Write the queue process that will listen to new jobs on push_notification_code:
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  // Every new job should call the sendNotification function with the phone number and the message contained within the job data;
  sendNotification(phoneNumber, message);
  try {
    // uncomment next line to test failure handler
    // throw new Error("Testing failure");
    done();
  } catch (err) {
    done(err);
  }
});