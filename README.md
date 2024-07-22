# Simple AI Chatbot using Vercel AI SDK and Next.js

This repository contains a simple conversational chatbot built using Vercel's AI SDK, Next.js, and Prisma. The chatbot allows a single user to interact with AI, stores conversation history, and lets users provide feedback on AI responses.

## Features

- Single user conversational chatbot
- Stores conversation history using SQLite and Prisma
- Like/dislike buttons for each AI response
- AI responses in Markdown format

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Vercel AI SDK](https://vercel.com/docs)
- [Prisma](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/index.html)

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Gemini API Key

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/conversational-chatbot.git
cd conversational-chatbot
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
DATABASE_URL="file:./dev.db"
GEMINI_API_KEY="your-vercel-ai-sdk-api-key"
```

### 4. Set Up Prisma

Generate the Prisma client and set up the SQLite database:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the Development Server

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

## API Endpoints

### POST /api/messages

- **Description**: Sends a message to the AI and receives a response.
- **Request Body**:
  ```json
  {
    "message": "Your message here"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "message": "Your message here",
    "answer": "AI response here",
    "feedback": null
  }
  ```

### PUT /api/messages

- **Description**: Updates the feedback for a specific message.
- **Request Body**:
  ```json
  {
    "id": 1,
    "feedback": true
  }
  ```
- **Response**: Status 200 OK

## Project Structure

```
.
├── prisma
│   ├── schema.prisma      # Prisma schema
├── public                 # Public assets
├── src
│   ├── app
│   │   └── page.tsx       # Main page component
│   ├── lib
│   │   └── db
│   │       └── index.ts   # Prisma client
│   ├── pages
│   │   └── api
│   │       └── messages
│   │           └── route.ts # API routes
└── .env                   # Environment variables
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
