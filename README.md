# Nexus AI

> An intelligent document management platform that enables users to upload, store, and interact with their documents through natural language conversation.

<p align="center">
  <a href="https://www.producthunt.com/posts/nexus-ai-3" target="_blank">
    <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=939232&theme=neutral&t=1741334380807" alt="Nexus AI on Product Hunt" style="max-width: 100%;" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/preston176/nexusAI" target="_blank">
    <img src="https://img.shields.io/github/stars/preston176/nexusAI?style=social" alt="GitHub stars" />
  </a>
  <a href="https://github.com/preston176/nexusAI/issues" target="_blank">
    <img src="https://img.shields.io/github/issues/preston176/nexusAI" alt="GitHub issues" />
  </a>
  <a href="https://github.com/preston176/nexusAI" target="_blank">
    <img src="https://img.shields.io/github/last-commit/preston176/nexusAI" alt="Last commit" />
  </a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Demo](#demo)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

Nexus AI is a production-ready web application that transforms how users interact with their document collections. By combining document storage with retrieval-augmented generation (RAG), the platform allows users to query their documents using natural language and receive contextually accurate responses.

The system processes uploaded documents by extracting text content, generating vector embeddings, and storing them in a high-performance vector database. When users ask questions, the platform retrieves relevant document segments and uses large language models to generate precise, source-grounded answers.

### Use Cases

- **Research & Analysis**: Query academic papers, research documents, and technical reports
- **Compliance & Legal**: Search through contracts, policies, and regulatory documents
- **Knowledge Management**: Build searchable repositories of organizational documentation
- **Education**: Interactive learning with textbooks and course materials
- **Personal Archive**: Organize and query personal document collections

---

## Demo

<p align="center">
  <a href="https://nexusai-pdf.vercel.app" target="_blank">
    <img src="./public/demo.png" alt="Nexus AI Application Interface" style="border-radius: 8px; max-width: 100%; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);" />
  </a>
</p>

<div align="center">
  <a href="https://nexusai-pdf.vercel.app" target="_blank"><strong>Live Application</strong></a> |
  <a href="https://youtu.be/ABdXAWunyuc" target="_blank"><strong>Video Walkthrough</strong></a>
</div>

---

## Key Features

### Document Management

- **Multi-format Support**: Upload and process PDF documents with automatic text extraction
- **Cloud Storage**: Secure document storage using Firebase Cloud Storage with user isolation
- **Document Organization**: Track upload history, metadata, and processing status

### Intelligent Querying

- **Semantic Search**: Vector-based similarity search using Pinecone for relevant context retrieval
- **Contextual Responses**: Generate answers grounded in actual document content
- **Multi-provider Support**: Choose from OpenAI GPT-4o, Google Gemini, Azure OpenAI, or Groq
- **Conversation History**: Maintain context across multiple queries within a session

### Authentication & Security

- **Enterprise Authentication**: Clerk integration with email, OAuth, and multi-factor authentication
- **User Isolation**: Complete data separation between users with role-based access
- **Secure Storage**: Encrypted document storage and secure credential management

### Subscription & Billing

- **Tiered Plans**: Free and premium subscription tiers with usage limits
- **Payment Processing**: Integrated Paystack payment gateway for African markets
- **Usage Tracking**: Monitor document uploads, query counts, and storage utilization

### Developer Experience

- **Docker Support**: Containerized deployment with environment-based configuration
- **TypeScript**: Full type safety across the entire application
- **Modular Architecture**: Clean separation of concerns with reusable components
- **Error Handling**: Comprehensive error management and user feedback

---

## Architecture

```mermaid
graph TB
    subgraph Client["Client Layer"]
        UI[Next.js Application<br/>TailwindCSS UI]
    end

    subgraph Auth["Authentication Layer"]
        Clerk[Clerk Auth<br/>User Management]
    end

    subgraph Storage["Storage Layer"]
        Firebase[Firebase Cloud Storage<br/>Document Files]
    end

    subgraph Processing["Processing Pipeline"]
        Extract[Text Extraction<br/>PDF Parser]
        Chunk[Document Chunking<br/>Semantic Segmentation]
        Embed[Embedding Generation<br/>Vector Transformation]
    end

    subgraph Vector["Vector Database"]
        Pinecone[Pinecone Index<br/>Similarity Search]
    end

    subgraph LLM["Language Model Layer"]
        LangChain[LangChain Orchestration]
        OpenAI[OpenAI GPT-4o]
        Gemini[Google Gemini]
        Azure[Azure OpenAI]
        Groq[Groq]
    end

    subgraph Payment["Payment Processing"]
        Paystack[Paystack Gateway<br/>Subscription Management]
    end

    UI -->|Authenticate| Clerk
    UI -->|Upload Document| Firebase
    Firebase -->|Process| Extract
    Extract --> Chunk
    Chunk --> Embed
    Embed -->|Store Vectors| Pinecone
    UI -->|Query| LangChain
    LangChain -->|Retrieve Context| Pinecone
    LangChain -->|Generate Response| OpenAI
    LangChain -->|Generate Response| Gemini
    LangChain -->|Generate Response| Azure
    LangChain -->|Generate Response| Groq
    UI -->|Upgrade Plan| Paystack
```

### Data Flow

1. **Document Upload**: User uploads PDF through Next.js interface
2. **Storage**: Document stored in Firebase with user-specific path
3. **Processing**: Text extracted and split into semantic chunks
4. **Embedding**: Each chunk converted to vector embeddings
5. **Indexing**: Vectors stored in Pinecone with metadata
6. **Query**: User asks question in natural language
7. **Retrieval**: Relevant document chunks retrieved via similarity search
8. **Generation**: Language model generates answer using retrieved context
9. **Response**: Answer returned to user with source attribution

### Document Processing Pipeline

```mermaid
sequenceDiagram
    participant User
    participant NextJS as Next.js App
    participant Firebase as Firebase Storage
    participant Parser as PDF Parser
    participant Embedder as Embedding Engine
    participant Pinecone as Pinecone DB

    User->>NextJS: Upload PDF Document
    NextJS->>Firebase: Store Original PDF
    Firebase-->>NextJS: Return Storage URL

    NextJS->>Parser: Extract Text Content
    Parser->>Parser: Split into Chunks<br/>(1000 tokens per chunk)
    Parser-->>NextJS: Return Text Chunks

    loop For Each Chunk
        NextJS->>Embedder: Generate Vector Embedding
        Embedder-->>NextJS: Return 1536-dim Vector
        NextJS->>Pinecone: Store Vector + Metadata
        Pinecone-->>NextJS: Confirm Storage
    end

    NextJS-->>User: Document Ready for Queries
```

### Query Processing Flow

```mermaid
sequenceDiagram
    participant User
    participant NextJS as Next.js App
    participant Embedder as Embedding Engine
    participant Pinecone as Pinecone DB
    participant LLM as Language Model

    User->>NextJS: Ask Question
    NextJS->>Embedder: Generate Query Embedding
    Embedder-->>NextJS: Return Query Vector

    NextJS->>Pinecone: Similarity Search<br/>(top 4 matches)
    Pinecone-->>NextJS: Return Relevant Chunks

    NextJS->>NextJS: Build Context Prompt<br/>(Question + Chunks)
    NextJS->>LLM: Send Augmented Prompt
    LLM-->>NextJS: Generate Answer

    NextJS-->>User: Display Answer + Sources
```

### Authentication Flow

```mermaid
flowchart LR
    A[User Visits Site] --> B{Authenticated?}
    B -->|No| C[Clerk Login Page]
    C --> D{Login Method}
    D -->|Email/Password| E[Credentials Auth]
    D -->|OAuth| F[Google/GitHub Auth]
    D -->|Magic Link| G[Email Link Auth]

    E --> H[Create Session]
    F --> H
    G --> H

    B -->|Yes| I[Dashboard Access]
    H --> I

    I --> J{Check Subscription}
    J -->|Free Tier| K[Limited Features]
    J -->|Premium| L[Full Access]

    K --> M[Upload Documents]
    L --> M
    M --> N[Chat with Documents]
```

### Subscription Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Free: User Signs Up

    Free --> InitiateUpgrade: Click Upgrade
    InitiateUpgrade --> PaystackCheckout: Redirect to Payment
    PaystackCheckout --> ProcessingPayment: Enter Card Details

    ProcessingPayment --> Premium: Payment Success
    ProcessingPayment --> Free: Payment Failed

    Premium --> PremiumActive: Monthly Renewal
    PremiumActive --> Premium: Auto-Renewal Success
    PremiumActive --> Expired: Payment Failed

    Expired --> Free: Grace Period Ended
    Expired --> Premium: Manual Renewal

    Premium --> Cancelled: User Cancels
    Cancelled --> Free: Subscription Ends

    Free --> [*]: User Deletes Account
    Premium --> [*]: User Deletes Account
```

### Vector Similarity Search

```mermaid
graph TD
    A["User Query:<br/>'What is machine learning?'"] --> B[Embedding Engine]
    B --> C["Query Vector:<br/>[-0.02, 0.15, ..., 0.08]"]

    C --> D[Pinecone Index Search]

    subgraph DocumentVectors["Document Vectors"]
        E1[Chunk 1: 0.92 similarity]
        E2[Chunk 2: 0.87 similarity]
        E3[Chunk 3: 0.79 similarity]
        E4[Chunk 4: 0.73 similarity]
        E5[Chunk 5: 0.45 similarity]
    end

    D --> E1
    D --> E2
    D --> E3
    D --> E4
    D --> E5

    E1 --> F[Top 4 Results]
    E2 --> F
    E3 --> F
    E4 --> F

    F --> G[Context Assembled]
    G --> H[LLM Prompt]
    H --> I["Generated Answer with<br/>Source Attribution"]
```

---

## Technology Stack

| Layer               | Technology             | Purpose                                                |
| ------------------- | ---------------------- | ------------------------------------------------------ |
| **Frontend**        | Next.js 14             | React framework with App Router and Server Components  |
|                     | TailwindCSS            | Utility-first CSS framework for responsive design      |
|                     | TypeScript             | Type-safe development with enhanced IDE support        |
| **Authentication**  | Clerk                  | User management, session handling, and OAuth           |
| **Storage**         | Firebase Cloud Storage | Scalable object storage for documents                  |
| **Vector Database** | Pinecone               | High-performance similarity search and vector indexing |
| **Orchestration**   | LangChain              | LLM abstraction and RAG pipeline management            |
| **Language Models** | OpenAI GPT-4o          | Primary language model for response generation         |
|                     | Google Gemini          | Alternative model with multimodal capabilities         |
|                     | Azure OpenAI           | Enterprise-grade OpenAI deployment                     |
|                     | Groq                   | High-speed inference for supported models              |
| **Payments**        | Paystack               | Payment gateway optimized for African markets          |
| **Deployment**      | Vercel                 | Edge network deployment with automatic scaling         |
|                     | Docker                 | Containerization for consistent environments           |

### System Architecture Layers

```mermaid
graph TB
    subgraph Presentation["Presentation Layer"]
        UI[React Components<br/>TailwindCSS Styling]
        Router[Next.js App Router]
    end

    subgraph Application["Application Layer"]
        ServerActions[Server Actions<br/>askQuestion, generateEmbeddings]
        APIRoutes[API Routes<br/>Webhooks, Payments]
        Middleware[Clerk Middleware<br/>Auth Protection]
    end

    subgraph Business["Business Logic Layer"]
        RAG[RAG Pipeline<br/>LangChain Orchestration]
        EmbedGen[Embedding Generation<br/>Text Vectorization]
        DocProc[Document Processing<br/>PDF Parsing & Chunking]
    end

    subgraph Integration["Integration Layer"]
        LLMProviders[LLM Providers<br/>OpenAI, Gemini, Groq]
        VectorDB[Pinecone Client<br/>Vector Operations]
        Storage[Firebase SDK<br/>Storage Operations]
        Auth[Clerk SDK<br/>Auth Operations]
        Payment[Paystack SDK<br/>Payment Operations]
    end

    subgraph External["External Services"]
        OpenAI[OpenAI API]
        Gemini[Gemini API]
        PineconeDB[(Pinecone Database)]
        FirebaseStore[(Firebase Storage)]
        ClerkAuth[Clerk Service]
        PaystackAPI[Paystack API]
    end

    UI --> ServerActions
    Router --> Middleware
    ServerActions --> RAG
    ServerActions --> DocProc
    APIRoutes --> Payment

    RAG --> EmbedGen
    RAG --> LLMProviders
    EmbedGen --> VectorDB
    DocProc --> Storage

    LLMProviders --> OpenAI
    LLMProviders --> Gemini
    VectorDB --> PineconeDB
    Storage --> FirebaseStore
    Auth --> ClerkAuth
    Payment --> PaystackAPI

    Middleware --> Auth
```

---

## Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **Package Manager**: npm, yarn, pnpm, or bun
- **Firebase Account**: For document storage
- **Pinecone Account**: For vector database
- **Clerk Account**: For authentication
- **LLM Provider API Key**: At least one of OpenAI, Gemini, Azure OpenAI, or Groq
- **Paystack Account**: For payment processing (optional)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/preston176/nexusAI.git
cd nexusAI
```

2. **Install dependencies**

```bash
npm install
# or
pnpm install
# or
bun install
```

3. **Set up Firebase**

- Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
- Enable Cloud Storage in your project
- Generate a service account key from Project Settings > Service Accounts
- Save the JSON key file as `service_key.json` in the project root

4. **Set up Pinecone**

- Create an account at [pinecone.io](https://www.pinecone.io)
- Create a new index with dimension 1536 (for OpenAI embeddings) or 768 (for other models)
- Note your API key and environment

5. **Set up Clerk**

- Create an account at [clerk.dev](https://clerk.dev)
- Create a new application
- Copy your publishable key and secret key

6. **Obtain LLM API Keys**

- **OpenAI**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Google Gemini**: [ai.google.dev](https://ai.google.dev)
- **Groq**: [console.groq.com](https://console.groq.com)

### Configuration

Create a `.env.local` file in the project root with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Pinecone Vector Database
NEXT_PUBLIC_PINECONE_API_KEY=xxxxx

# Language Model APIs
NEXT_PUBLIC_GEMINI_API_KEY=xxxxx
OPENAI_API_KEY=sk-xxxxx
GROQ_API_KEY=gsk_xxxxx

# Firebase Storage
FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
FIREBASE_SERVICE_ACCOUNT_JSON=<base64_encoded_service_key.json>

# Paystack Payment Gateway
NEXT_PUBLIC_PAYSTECK_PUBLISHABLE_KEY=pk_test_xxxxx
PAYSTACK_API_KEY=sk_test_xxxxx
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
PAYSTACK_WEBHOOK_SECRET=xxxxx

# Optional: Contact Form
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxxxx
NEXT_PUBLIC_FORMSPREE_API=xxxxx
```

**Note on Firebase Configuration**: Encode your `service_key.json` to base64:

```bash
base64 -i service_key.json | tr -d '\n' | pbcopy  # macOS
base64 service_key.json | tr -d '\n' | xclip -selection clipboard  # Linux
```

### Optional: Azure OpenAI Configuration

If using Azure OpenAI instead of standard OpenAI:

```env
AZURE_OPENAI_API_INSTANCE_NAME=your-instance
AZURE_OPENAI_API_KEY=xxxxx
AZURE_OPENAI_API_VERSION=2024-02-01
AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME=text-embedding-ada-002
AZURE_OPENAI_API_DEPLOYMENT_NAME=gpt-4o
```

### Running the Application

**Development Mode**

```bash
npm run dev
# or
pnpm dev
# or
bun dev
```

The application will be available at `http://localhost:3000`.

**Production Build**

```bash
npm run build
npm start
```

---

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

Vercel will automatically detect Next.js and configure the build settings.

### Docker Deployment

**Build the image**

```bash
docker build -t nexusai .
```

**Run the container**

```bash
docker run -p 3000:3000 --env-file .env.local nexusai
```

**Docker Compose**

Create a `docker-compose.yml`:

```yaml
version: "3.8"
services:
  nexusai:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.local
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

---

## Project Structure

```
nexusAI/
├── actions/                    # Server actions for data mutations
│   ├── askQuestion.ts         # Query processing and LLM interaction
│   ├── deleteDocument.ts      # Document deletion logic
│   └── generateEmbeddings.ts  # Vector embedding generation
├── app/                        # Next.js App Router
│   ├── (landing)/             # Landing page routes
│   │   ├── about/
│   │   ├── contact/
│   │   ├── features/
│   │   ├── pricing/
│   │   ├── privacy-policy/
│   │   └── terms-of-service/
│   ├── api/                   # API routes
│   │   └── paystack/         # Payment webhooks
│   ├── dashboard/             # Protected dashboard routes
│   │   ├── files/[id]/       # Individual file viewer
│   │   ├── upload/           # Document upload interface
│   │   └── upgrade/          # Subscription management
│   ├── layout.tsx            # Root layout with providers
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── components/                # React components
│   ├── Chat.tsx              # Chat interface
│   ├── ChatMessage.tsx       # Individual message component
│   ├── Document.tsx          # Document card
│   ├── Documents.tsx         # Document list
│   ├── FileUploader.tsx      # Upload component
│   ├── PdfView.tsx           # PDF viewer
│   └── ui/                   # UI primitives
├── hooks/                     # Custom React hooks
│   ├── use-toast.ts          # Toast notifications
│   └── useSubscription.ts    # Subscription status
├── lib/                       # Utility libraries
│   ├── langChain.ts          # LangChain configuration
│   ├── pinecone.ts           # Pinecone client setup
│   ├── Paystack-js.ts        # Paystack integration
│   └── utils.ts              # Helper functions
├── firebase.ts               # Firebase client initialization
├── firebaseAdmin.ts          # Firebase Admin SDK
├── middleware.ts             # Clerk authentication middleware
└── next.config.ts            # Next.js configuration
```

### Component Interaction Diagram

```mermaid
graph TB
    subgraph ClientComponents["Client Components"]
        FileUploader[FileUploader.tsx<br/>Document Upload UI]
        Documents[Documents.tsx<br/>Document List Display]
        Document[Document.tsx<br/>Individual Document Card]
        Chat[Chat.tsx<br/>Question Input & History]
        ChatMessage[ChatMessage.tsx<br/>Message Bubble Display]
        PdfView[PdfView.tsx<br/>PDF Viewer Iframe]
    end

    subgraph ServerActions["Server Actions"]
        GenerateEmbeddings[generateEmbeddings<br/>Process & Index Document]
        AskQuestion[askQuestion<br/>Query Processing]
        DeleteDocument[deleteDocument<br/>Remove Document]
    end

    subgraph ExternalServices["External Services"]
        FirebaseStorage[(Firebase Storage)]
        PineconeDB[(Pinecone DB)]
        LLM[Language Models]
    end

    FileUploader -->|Upload File| GenerateEmbeddings
    GenerateEmbeddings -->|Store File| FirebaseStorage
    GenerateEmbeddings -->|Index Vectors| PineconeDB

    Documents -->|Display List| Document
    Document -->|View Document| PdfView
    Document -->|Delete| DeleteDocument

    DeleteDocument -->|Remove File| FirebaseStorage
    DeleteDocument -->|Delete Vectors| PineconeDB

    Chat -->|Submit Question| AskQuestion
    AskQuestion -->|Search Vectors| PineconeDB
    AskQuestion -->|Generate Answer| LLM
    AskQuestion -->|Return Response| ChatMessage

    PdfView -->|Open Chat| Chat
```

### Data Model Relationships

```mermaid
erDiagram
    USER ||--o{ DOCUMENT : uploads
    USER ||--o| SUBSCRIPTION : has
    DOCUMENT ||--o{ VECTOR_CHUNK : contains
    DOCUMENT ||--o{ CHAT_MESSAGE : generates

    USER {
        string userId PK
        string email
        string name
        timestamp createdAt
    }

    SUBSCRIPTION {
        string userId PK
        string tier
        timestamp startDate
        timestamp endDate
        boolean isActive
    }

    DOCUMENT {
        string documentId PK
        string userId FK
        string fileName
        string storageUrl
        number fileSize
        timestamp uploadedAt
        string status
    }

    VECTOR_CHUNK {
        string chunkId PK
        string documentId FK
        string textContent
        array embedding
        number chunkIndex
        object metadata
    }

    CHAT_MESSAGE {
        string messageId PK
        string documentId FK
        string userId FK
        string question
        string answer
        array sources
        timestamp createdAt
    }
```

---

## API Documentation

### Server Actions

#### `askQuestion(question: string, documentId: string)`

Processes a user question against a specific document.

**Parameters:**

- `question` (string): The user's natural language query
- `documentId` (string): ID of the target document

**Returns:**

- `success` (boolean): Operation status
- `answer` (string): Generated response
- `sources` (array): Relevant document chunks used

**Example:**

```typescript
const result = await askQuestion("What is the main topic?", "doc123");
```

#### `generateEmbeddings(documentId: string)`

Generates and stores vector embeddings for a document.

**Parameters:**

- `documentId` (string): ID of the document to process

**Returns:**

- `success` (boolean): Operation status
- `message` (string): Status message

#### `deleteDocument(documentId: string)`

Deletes a document and its associated embeddings.

**Parameters:**

- `documentId` (string): ID of the document to delete

**Returns:**

- `success` (boolean): Operation status

### API Routes

#### `POST /api/paystack`

Webhook endpoint for Paystack payment events.

**Headers:**

- `x-paystack-signature`: Webhook signature for verification

**Body:**

- `event` (string): Event type (e.g., "charge.success")
- `data` (object): Event payload with subscription details

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices and maintain type safety
- Write descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure code passes linting: `npm run lint`

### Reporting Issues

Use the [GitHub issue tracker](https://github.com/preston176/nexusAI/issues) to report bugs or request features. Please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

**Preston Mayieka**

- Website: [preston176.vercel.app](https://preston176.vercel.app)
- GitHub: [@preston176](https://github.com/preston176)
- Twitter: [@preston_mayieka](https://twitter.com/preston_mayieka)

For questions or support, please open an issue on GitHub or reach out through the contact form on the live application.

---

**Built with Next.js, LangChain, and modern web technologies**
