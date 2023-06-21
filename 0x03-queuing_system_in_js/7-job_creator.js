import { createQueue } from 'kue';
// Create a queue with Kue

const queue = createQueue();
// Create an object containing the Job data with the following format:
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

queue.on("connect", () => {
  console.log('Connected');
});

jobs.forEach(jobz => {
  // SHORTHAND
  const job = queue.create('push_notification_code_2', jobz).save((error) => {
    if (!error) console.log(`Notification job created: ${job.id}`);
  });

  // When the job is completed, log to the console Notification job completed
  job.on('complete', () => {
    console.log(`Notification job ${job.id} completed`);
  });
  // When the job is failing, log to the console Notification job failed;
  job.on('failed', (error) => {
    console.log(`Notification job ${job.id} failed: ${error}`);
  });

  job.on('progress', (percent) => {
    console.log(`Notification job ${job.id} ${percent}% complete`);
  });
});