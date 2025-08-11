import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./auth";
import { sendSlackMessage } from "./slack";
import { addSchedule, scheduleJobs, getSchedules, cancelSchedule } from "./scheduler";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.post("/send", async (req, res) => {
    const { token, channel, text } = req.body;
    try {
        await sendSlackMessage(token, channel, text);
        res.json({ success: true });
    } catch {
        res.status(500).json({ error: "Message send failed" });
    }
});

app.post("/schedule", (req, res) => {
    const { cronExp, token, channel, text } = req.body;
    const id = addSchedule(cronExp, token, channel, text);
    res.json({ scheduled: true, id });
});

app.get("/scheduled", (req, res) => {
    res.json(getSchedules());
});

app.delete("/cancel/:id", (req, res) => {
    cancelSchedule(req.params.id);
    res.json({ cancelled: true });
});

scheduleJobs();

app.listen(process.env.PORT, () => {
    console.log(`Backend running on port ${process.env.PORT}`);
});
