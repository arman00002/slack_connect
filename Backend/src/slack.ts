import axios from "axios";

export async function sendSlackMessage(token: string, channel: string, text: string) {
    return axios.post("https://slack.com/api/chat.postMessage", {
        channel,
        text
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });
}
