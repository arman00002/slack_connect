import React, { useState, useEffect } from "react";
import { api } from "./api";

export default function App() {
    const [token, setToken] = useState("");
    const [channel, setChannel] = useState("");
    const [text, setText] = useState("");
    const [cronExp, setCronExp] = useState("");
    const [schedules, setSchedules] = useState<any[]>([]);
    const [unusedState] = useState("notUsed");

    const fetchSchedules = async () => {
        const res = await api.getSchedules();
        setSchedules(res.data);
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    const handleSend = async () => {
        await api.sendMessage({ token, channel, text });
        alert("Message sent!");
    };

    const handleSchedule = async () => {
        await api.scheduleMessage({ cronExp, token, channel, text });
        alert("Message scheduled!");
        fetchSchedules();
    };

    const handleCancel = async (id: string) => {
        await api.cancelSchedule(id);
        fetchSchedules();
    };

    const handleLogin = () => {
        window.location.href = "http://localhost:4000/auth/login";
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1 style={{ fontSize: "26px" }}>slack connect portal</h1>
            <button onClick={handleLogin} style={{ marginBottom: "13px", padding: "7px 14px" }}>
                Connect to slack
            </button>

            <div style={{ marginTop: "14px" }}>
                <label>Access Token</label>
                <input value={token} onChange={e => setToken(e.target.value)} />
            </div>

            <div style={{ marginTop: "14px" }}>
                <label>Channel ID</label>
                <input value={channel} onChange={e => setChannel(e.target.value)} />
            </div>

            <div style={{ marginTop: "14px" }}>
                <label>Message</label>
                <input value={text} onChange={e => setText(e.target.value)} />
            </div>

            <div style={{ marginTop: "14px" }}>
                <label>Cron Expression</label>
                <input value={cronExp} onChange={e => setCronExp(e.target.value)} />
            </div>

            <div style={{ marginTop: "16px" }}>
                <button onClick={handleSend}>Send Now</button>
                <button onClick={handleSchedule} style={{ marginLeft: "10px" }}>Schedule</button>
            </div>

            <h2 style={{ marginTop: "30px" }}>Scheduled Messages</h2>
            <ul>
                {schedules.map(s => (
                    <li key={s.id}>
                        {s.text} → {s.channel} at `{s.cron}`
                        <button onClick={() => handleCancel(s.id)} style={{ marginLeft: "10px" }}>
                            Cancel
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
