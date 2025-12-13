// PDF load karne ka
import * as dotenv from 'dotenv';
dotenv.config();
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { index } from '@langchain/core/indexing';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/pinecone';

async function indexDocument(params) {

    const PDF_PATH = 'GIVE_YOUR_PDF_PATH (for example, ./elonmusk.pdf)';
    const pdfLoader = new PDFLoader(PDF_PATH);
    const rawDocs = await pdfLoader.load();

    console.log("PDF configure successfully");

    //chunking karo
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1500,
        chunkOverlap: 500,
    });
    const chunkedDocs = await textSplitter.splitDocuments(rawDocs);
    console.log("PDF chunks successfully");
    
    //vector Embedding model
    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: 'text-embedding-004',
    });
    console.log("Embedding successfully");

    //Databse configure
    //Initialize Pinecone Client
    const pinecone = new Pinecone();
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);
    console.log("Pinecone configure successfully")

    //langchain (chunking, embedding, database)
    await PineconeStore.fromDocuments(chunkedDocs, embeddings, {
        pineconeIndex,
        maxConcurrency: 8,
    });
    console.log("data store successfully");
}

indexDocument();
