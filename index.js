const express = require('express');
const redis = require('redis');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();



const cors = require('cors')


const app = express();
const client = redis.createClient({ url:process.env.REDIS_URL });
client.connect();

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const MISTRAL_API_ENDPOINT = "https://api.mistral.ai/v1/chat/completions";

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}));

function generateCacheKey(text, toneLevel) {
    return `${text}:${toneLevel}`;
}

app.post('/adjust-tone', async (req, res) => {
    const { text, toneLevel } = req.body;

    const cacheKey = generateCacheKey(text, toneLevel);

    try {
        const cachedResult = await client.get(cacheKey);
        if (cachedResult) {
            return res.json({ content: JSON.parse(cachedResult) });
        }

        let toneDescription = "neutral and balanced";
        if (toneLevel < 25) {
            toneDescription = "very formal, professional, and precise";
        } else if (toneLevel < 50) {
            toneDescription = "somewhat formal and professional";
        } else if (toneLevel < 75) {
            toneDescription = "conversational and friendly";
        } else {
            toneDescription = "casual, relaxed, and informal";
        }

        const messages = [
            {
                role: "system",
                content: `You are a helpful tone adjustment assistant. Rewrite the text to make it sound ${toneDescription}. 
                          Preserve all the original meaning and information. Only change the tone and style, not the content.
                          Return ONLY the rewritten text without any explanations, introductions, or additional commentary.`
            },
            {
                role: "user",
                content: text
            }
        ];

        const response = await fetch(MISTRAL_API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: "mistral-small",
                messages: messages
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error("Failed to adjust tone.");
        }

        const data = await response.json();
        const adjustedContent = data.choices[0].message.content;

        await client.setEx(cacheKey, 3600, JSON.stringify(adjustedContent));

        res.json({ content: adjustedContent });

    } catch (error) {
        console.error("Tone adjustment failed:", error);
        res.status(500).json({
            content: text,
            error: error.message || "Unknown error occurred"
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running`);
});
