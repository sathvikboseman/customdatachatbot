import { createClient } from "@supabase/supabase-js";
import { Configuration, OpenAIApi } from "openai";

// Initialize our Supabase client
const supabaseClient = createClient("https://pekbxlntxvraydqebjzw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBla2J4bG50eHZyYXlkcWVianp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEwODAwMzMsImV4cCI6MjAwNjY1NjAzM30.u-CIyn8aiwy2QGRChPOQe2-zlMqZHWrfNqakVRqf3QQ");

// generateEmbeddings
async function generateEmbeddings() {
    // Initialize OpenAI API
    const configuration = new Configuration({ apiKey: "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" });
    const openai = new OpenAIApi(configuration);
    // Create some custom data (Cooper Codes)
    const documents = [
        "Sathvik is 19 years old",
        "Sathvik studies in BITS Dubai",
        "Sathvik loves driving",
        "Sathvik loves Formula 1"
    ];

    for(const document of documents) {
        const input = document.replace(/\n/g, '');

        // Turn each string (custom data) into an embedding
        const embeddingResponse = await openai.createEmbedding({
            model: "text-embedding-ada-002", // Model that creates our embeddings
            input
        });

        const [{ embedding }] = embeddingResponse.data.data;

        // Store the embedding and the text in our supabase DB
        await supabaseClient.from('documents').insert({
            content: document,
            embedding
        });
    }
}

async function askQuestion() {
    const { data, error } = await supabaseClient.functions.invoke('askcustomdata', {
        body: JSON.stringify({ query: "Who is Sathvik" }),
      })
    console.log(data);
    console.log(error);
}

askQuestion();

// /ask-custom-data -> getting relevant documents, asking chatgpt, returning the response
// Supabase command line interface