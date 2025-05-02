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

### 2. Install dependencies
```bash
npm install
```

### 3. Create a .env file

```bash
PORT=3000
MISTRAL_API_KEY=your_mistral_api_key
REDIS_URL=your_upstash_redis_url
```

### 4. Start the server
```bash
npm start
```

## 📤 API Endpoint

### POST `/adjust-tone`

Adjusts the tone of a given piece of text based on the tone level.

**Request Body:**

```json
{
  "text": "Your original text here.",
  "toneLevel": 70
}
```
**Response**

```json
{
  "content": "Your text rewritten in a casual tone."
}

```

---

## 🧠 Caching with Upstash Redis

To improve performance and reduce redundant API calls to Mistral, this backend uses **Upstash Redis** for caching.

### 🔧 How it Works

- Each request to adjust tone is cached using a unique key format:  
- If a cached result exists, it is returned instantly without making an API call.
- Cached data has a TTL (Time To Live) of **3600 seconds (1 hour)**.

### ✅ Benefits

- Reduces latency for repeated requests
- Lowers Mistral API usage and costs
- Provides a smoother user experience

---

## ⚠️ Error Handling & Edge Cases

This backend handles errors gracefully to ensure users aren't left stuck:

- **API Failures**: If the Mistral API fails or returns an error, the server returns the original input text with an error message.
- **Redis Failures**: If Redis is unreachable or fails to connect, the system continues to function but skips caching.
- **Invalid Input**: Requests without valid `text` or `toneLevel` are ignored with appropriate client-side validation.
- **Frontend Feedback**: Using `sonner` toasts, users are alerted when:
- Tone adjustment fails
- An undo or redo operation is performed
- Text is reset to its original state

---

## 🛠️ Contribution

We welcome contributions to improve ToneSlider! If you'd like to help:

1. 🍴 Fork the repository
2. 🛠️ Create a new branch (`git checkout -b feature-name`)
3. 💾 Make your changes and commit (`git commit -m "Add some feature"`)
4. 🚀 Push to your branch (`git push origin feature-name`)
5. 🔁 Open a Pull Request

### Guidelines

- Write clean, readable code with comments if needed.
- Ensure all tests pass before submitting.
- Keep commits atomic and descriptive.
- For new features or bug fixes, please open an issue first to discuss the idea.


📦 **Frontend Setup:**  
To view and interact with the full ToneSlider application, please refer to the https://github.com/isid555/ToneSlider and follow its setup instructions.

📫 For major changes or feature discussions, feel free to reach out or open an issue. Let’s build something amazing together!

### Thank you
