import express from "express";
import axios from "axios";
import { readData, writeData } from "./storage";

const router = express.Router();
const TOKEN_FILE = "tokens.json";

router.get("/login", (req, res) => {
    const url = `https://slack.com/oauth/v2/authorize?client_id=${process.env.CLIENT_ID}&scope=chat:write,channels:read&redirect_uri=${process.env.REDIRECT_URI}`;
    res.redirect(url);
});

router.get("/callback", async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).send("Missing code");

    try {
        const tokenRes = await axios.post<any>("https://slack.com/api/oauth.v2.access", null, {
            params: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code,
                redirect_uri: process.env.REDIRECT_URI
            }
        });

        if (!tokenRes.data.ok) {  // ✅ now no TypeScript error
            return res.status(400).json(tokenRes.data);
        }

        const tokens = readData(TOKEN_FILE);
        tokens.push(tokenRes.data);
        writeData(TOKEN_FILE, tokens);

        res.send("Slack workspace connected! You can close this tab.");
    } catch (err) {
        res.status(500).send("OAuth failed");
    }
});


export default router;
