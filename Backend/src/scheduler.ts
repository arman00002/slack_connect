import cron from "node-cron";
import { readData, writeData } from "./storage";
import { sendSlackMessage } from "./slack";
import { v4 as uuidv4 } from "uuid";

const SCHEDULE_FILE = "scheduled.json";

export function scheduleJobs() {
    const jobs = readData(SCHEDULE_FILE);
    jobs.forEach((job: any) => {
        cron.schedule(job.cron, () => {
            sendSlackMessage(job.token, job.channel, job.text);
        });
    });
}

export function addSchedule(cronExp: string, token: string, channel: string, text: string) {
    const jobs = readData(SCHEDULE_FILE);
    const id = uuidv4();
    jobs.push({ id, cron: cronExp, token, channel, text });
    writeData(SCHEDULE_FILE, jobs);
    return id;
}

export function getSchedules() {
    return readData(SCHEDULE_FILE);
}

export function cancelSchedule(id: string) {
    let jobs = readData(SCHEDULE_FILE);
    jobs = jobs.filter((job: any) => job.id !== id);
    writeData(SCHEDULE_FILE, jobs);
}
