import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

const schema = {
  description: "List of movies",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      movieName: {
        type: SchemaType.STRING,
        description: "Name of the movie",
        nullable: false,
      },
      movieDescription: {
        type: SchemaType.STRING,
        description: "Short description of the movie",
        nullable: false,
      },
    },
    required: ["movieName"],
  },
};

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a movie suggester.",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

app.get("/api/get-movies", async (req, res) => {
  try {
    const query = req.query["query"];
    const genre = req.query["genre"];
    const mood = req.query["mood"];
    const type = req.query["type"];

    const prompt = `List three popular movies. Movie must be of 
    ${genre || "any"} genre,
     ${mood || "any"} mood,
     ${type || "any"} type. 
     Movie must satisfy this requirement: ${query || "any"}`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    return res.json(JSON.parse(text));
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started");
});
