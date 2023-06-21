import { createQueue } from 'kue';
import createPushNotificationsJobs from './8-job';
import { expect } from 'chai';

const queue = createQueue();
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 2345 to verify your account',
  },
  {
    phoneNumber: '4153518782',
    message: 'This is the code 3456 to verify your account',
  }
];

describe('createPushNotificationsJobs', () => {
  before(() => {
    queue.testMode.enter();
  });

  afterEach(() => {
    queue.testMode.clear();
  });

  after(() => {
    queue.testMode.exit();
  });

  it('display a error message if jobs is not an array passing Number', () => {
    expect(() => {
      createPushNotificationsJobs(2, queue);
    }).to.throw('Jobs is not an array');
  });

  it('display a error message if jobs is not an array passing Object', () => {
    expect(() => {
      createPushNotificationsJobs({}, queue);
    }).to.throw('Jobs is not an array');
  });

  it('display a error message if jobs is not an array passing String', () => {
    expect(() => {
      createPushNotificationsJobs('Hello', queue);
    }).to.throw('Jobs is not an array');
  });

  it('should NOT display a error message if jobs is an array with empty array', () => {
    const ret = createPushNotificationsJobs([], queue);
    expect(ret).to.equal(undefined);
  });

  it('test valid array of jobs length', () => {
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs.length).to.equal(3);
  });
  it('test valid array of jobs type', () => {
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[2].type).to.equal('push_notification_code_3');
  });

  it('test valid array of jobs datasets', () => {
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs[0].data).to.equal(jobs[0]);
    expect(queue.testMode.jobs[1].data).to.equal(jobs[1]);
    expect(queue.testMode.jobs[2].data).to.equal(jobs[2]);
  });
});