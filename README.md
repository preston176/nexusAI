# Nexus AI

### Secure, Scalable Document Chat Powered by GPT-4o, Gemini, and LangChain

[![Product Hunt – Nexus AI](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=939232&theme=neutral&t=1741334380807)](https://www.producthunt.com/posts/nexus-ai-3)

**Live App:** [https://nexusai-pdf.vercel.app](https://nexusai-pdf.vercel.app)  
**Demo:** [YouTube Walkthrough](https://youtu.be/ABdXAWunyuc)

---

## Overview

**Nexus AI** is a full-stack web application that enables users to securely upload and interact with documents via conversational AI. It combines modern authentication, cloud storage, vector indexing, and multi-provider LLM orchestration through LangChain.

Use cases include document search, compliance QA, personal knowledge bases, and AI research assistants.

---

## Architecture

```mermaid
graph TD
  User[🧑 User] --> UI[🌐 Nexus AI App]
  UI --> Auth[🔐 Sign In<br>via Clerk]
  UI --> Upload[📄 Upload Document]
  Upload --> Store[☁️ Saved to Cloud<br>Firebase]
  Upload --> Understand[🤖 Analyze Content<br>with AI]
  Understand --> Ask[❓ Ask a Question]
  Ask --> Search[🔎 Find Relevant Info]
  Search --> Respond[Get response<br>from LLM]
  UI --> Pay[💳 Upgrade Plan<br>via Paystack]
```

---

## Features

- 🔐 **Multi-factor Authentication** with Clerk
- 📄 **PDF Storage** using Firebase Cloud Storage
- 🧠 **LLM Orchestration** via LangChain
- 🔎 **Vector Search** using Pinecone
- 💬 **Multi-LLM Support**: GPT-4o, Gemini, Azure, Groq
- 💳 **Subscription Billing** powered by Paystack
- 🐳 **Docker Compatible** with environment-driven config

---

## Technology Stack

| Layer         | Technology                             |
| ------------- | -------------------------------------- |
| Frontend      | Next.js, TailwindCSS                   |
| Auth          | Clerk.dev                              |
| File Storage  | Firebase Cloud Storage                 |
| Vector Search | Pinecone                               |
| LLM Runtime   | LangChain                              |
| LLM Providers | OpenAI, Gemini, Azure OpenAI, Groq     |
| Payments      | Paystack                               |
| Deployment    | Docker, Vercel                         |

---

## Setup

### Local Development

```bash
git clone https://github.com/preston176/nexusAI
cd nexusAI
npm install
npm run dev
```

App will be available at `http://localhost:3000`.

---

### Environment Variables

Create a `.env` file with the following:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

# Pinecone
NEXT_PUBLIC_PINECONE_API_KEY=...

# LLM APIs
NEXT_PUBLIC_GEMINI_API_KEY=...
OPENAI_API_KEY=...
GROQ_API_KEY=...

# Paystack
NEXT_PUBLIC_PAYSTECK_PUBLISHABLE_KEY=...
PAYSTACK_API_KEY=...
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=...
PAYSTACK_WEBHOOK_SECRET=...

# Firebase
FIREBASE_STORAGE_BUCKET=nexusai-pdf.firebasestorage.app
FIREBASE_SERVICE_ACCOUNT_JSON=<base64 encoded service_key.json>

# reCAPTCHA / Forms
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
NEXT_PUBLIC_FORMSPREE_API=...
```

### Optional: Azure OpenAI Integration

```env
AZURE_OPENAI_API_INSTANCE_NAME=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_API_VERSION="2024-02-01"
AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME="text-embedding-ada-002"
```

---

## Docker Support

```bash
docker build -t nexusai-pdf .
docker run -p 3000:3000 --env-file .env nexusai-pdf
```

---

## Data Flow (LangChain + Pinecone)

```mermaid
sequenceDiagram
  participant User
  participant UI
  participant Backend
  participant Pinecone
  participant LangChain
  participant LLM

  User->>UI: Upload PDF
  UI->>Backend: Send file (via Clerk session)
  Backend->>Firebase: Store file
  Backend->>LangChain: Extract + Embed text
  LangChain->>Pinecone: Store vector embeddings
  User->>UI: Ask question
  UI->>Backend: Submit query
  Backend->>Pinecone: Perform vector similarity search
  Pinecone-->>LangChain: Return top-k matches
  LangChain->>LLM: Construct prompt + context
  LLM-->>LangChain: Answer
  LangChain-->>Backend: Response
  Backend-->>UI: Display output
```

---

## License

MIT License

---

## Author

Built by [Preston Mayieka](https://preston176.vercel.app)  
GitHub: [@preston176](https://github.com/preston176)  
Twitter: [@preston_mayieka](https://twitter.com/preston_mayieka)
