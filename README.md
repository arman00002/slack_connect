Slack Connect<br>
A simple web app that lets you connect your Slack workspace, send messages instantly, and schedule them for later delivery.

Features<br>
Connect Slack workspace via OAuth 2.0

Store tokens locally (file-based storage)

Send messages instantly to a Slack channel

Schedule messages with cron expressions

View scheduled messages

Cancel scheduled messages before they send

Tech Stack<br>
Frontend: React + TypeScript (Vite)
Backend: Node.js + Express + TypeScript
Storage: JSON files (for tokens and schedules)
Scheduler: node-cron

Architecture Overview<br>
OAuth Flow:
Frontend triggers /auth/login → user authorizes → Slack redirects to /auth/callback on backend → backend exchanges code for tokens → stores them in tokens.json.

Token Storage:
Tokens stored in JSON file for simplicity. In production you’d want a database.

Scheduling:
When scheduling, backend saves job details in scheduled.json and node-cron runs it at the right time.

Challenges & Learnings
Slack’s OAuth flow is strict about redirect URIs — I had to exactly match the one in the Slack app settings.

Working with node-cron means understanding cron expressions; testing with “every minute” jobs made debugging easier.

Making sure both frontend & backend ran together without CORS issues took some tweaking.
<br>

front end deploy:https://app.netlify.com/projects/tourmaline-pudding-c5eacc<br>
backend deploy: https://slack-connect-8pt1.onrender.com
