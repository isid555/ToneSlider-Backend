# ToneSlider Backend

The backend server for **ToneSlider**, a tone adjustment tool that allows users to rewrite text in varying levels of formality using a slider. This backend connects with the [Mistral AI API](https://docs.mistral.ai/) to process text tone, uses **Upstash Redis** for response caching, and is designed to be fast and efficient.

## 🌐 Live API
The backend is deployed at:  
**https://toneslider.up.railway.app**

## 🛠️ Tech Stack

- **Node.js** with **Express.js** – REST API server
- **Upstash Redis** – Caching layer for performance
- **Mistral AI API** – Language model for tone transformation
- **CORS** – For secure cross-origin requests
- **dotenv** – Environment variable management

## 📦 Features

- Accepts text and tone level, returns rewritten text in the desired tone
- Uses caching to reduce API calls and improve response time
- Error handling and graceful fallbacks
- Environment-variable-driven setup for secure credentials

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/toneslider-backend.git
cd toneslider-backend
```
