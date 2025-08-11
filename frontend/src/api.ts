import axios from "axios";

const API_BASE = "https://slack-connect-8pt1.onrender.com"; // backend URL

export const api = {
    sendMessage: (payload: any) => axios.post(`${API_BASE}/send`, payload),
    scheduleMessage: (payload: any) => axios.post(`${API_BASE}/schedule`, payload),
    getSchedules: () => axios.get(`${API_BASE}/scheduled`),
    cancelSchedule: (id: string) => axios.delete(`${API_BASE}/cancel/${id}`)
};
