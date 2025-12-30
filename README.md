## 🧠 RAG Project: Elon Musk Biography Chatbot
A Retrieval-Augmented Generation (RAG) application that allows users to chat with a PDF document (specifically Elon Musk's biography). This project leverages Google Gemini for reasoning/embeddings and Pinecone for vector storage to provide accurate, context-aware answers.

## 🚀 Features

PDF Ingestion: Loads and parses PDF documents using pdf-parse.

Smart Chunking: Splits text into manageable chunks using LangChain's RecursiveCharacterTextSplitter.

Vector Embeddings: Generates embeddings using Google's text-embedding-004. 

Semantic Search: Uses Pinecone Vector Database to retrieve the most relevant document sections.

Contextual AI: Uses Gemini 2.5 Flash to answer questions based strictly on the provided context.

CLI Chat Interface: Interactive command-line chat experience.

## 🛠️ Tech Stack

Runtime: Node.js

Framework: LangChain (@langchain/community, @langchain/core)

LLM & Embeddings: Google GenAI (@google/genai, @langchain/google-genai)

Vector Database: Pinecone (@pinecone-database/pinecone)

Utilities: dotenv, readline-sync

## 📋 Prerequisites

Before running this project, ensure you have:

Node.js installed (v18+ recommended).
  
A Google Gemini API Key (Get it from Google AI Studio).

A Pinecone API Key and a Serverless Index created (Get it from Pinecone.io).

## ⚙️ Installation & Setup

Clone the repository
```
git clone https://github.com/ansh3637/rag-project-elonmusk.git
cd ansh3637-rag-project-elonmusk
```

Install dependencies
```
npm install
```

Configure Environment Variables
Rename the example file to .env:
```
cp .env.example .env
```

Open .env and fill in your details:
```
GEMINI_API_KEY=your_google_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_INDEX_NAME=your_index_name_here
# PINECONE_ENVIRONMENT is often not needed for serverless indexes, but add if required
```

Add your PDF
Place your PDF file (e.g., elonmusk.pdf) in the root directory.

Open index.js and update line 12 with your specific filename:
```
const PDF_PATH = './elonmusk.pdf'; // Update this path
```

# Usage
## Step 1: Ingest Data (Run Once)

This script loads the PDF, chunks it, generates embeddings, and uploads vectors to Pinecone.
```
node index.js
```

Step 2: Start Chatting

Run the query script to start the interactive CLI chatbot.

```
node query.js
```

You can now ask questions like:

"How did Elon Musk start SpaceX?"

"What companies does Elon own?"

## 📂 Project Structure
index.js: The Ingestion Pipeline. Handles PDF loading, text splitting, embedding generation, and Pinecone upsertion.

query.js: The Chat Application. Handles user input, vector search, context retrieval, and LLM response generation. Includes memory for conversation history.

.env.example: Template for environment variables.

package.json: Project dependencies and scripts.
