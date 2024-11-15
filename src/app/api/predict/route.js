import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a medical assistant that analyzes user symptoms and provides disease predictions. Given the user's symptoms and other medical information, your task is to predict the most likely diseases, explain the match accuracy, and provide detailed information about the disease. The user will provide the following inputs:\n\n1. Symptoms and their corresponding severity (out of 10)\n2. Duration of the symptoms\n3. Location of pain/discomfort (optional)\n4. Recent travels (optional)\n5. Allergies (optional)\n6. Pre-existing conditions (optional)\n7. Family medical history (optional)\n\nFor each of these inputs, respond with the disease details, including the disease name, a description of the disease, match accuracy (out of 10), and any red-flag warnings. If any optional inputs are missing, skip them and provide relevant responses based on the available information.\n\n---\n\nInput: \n- Symptoms: {list of symptoms with severity score out of 10}\n- Duration: {duration in days/weeks, e.g., 3 days}\n- Location of pain/discomfort: {location, e.g., chest, abdomen, head} (if provided)\n- Recent travels: {place or region, if applicable} (if provided)\n- Allergies: {list of allergies, if applicable} (if provided)\n- Pre-existing conditions: {list of conditions, if applicable} (if provided)\n- Family medical history: {relevant family history, if applicable} (if provided)\n\n---\n\n### Instructions:\n\n1. Based on the provided symptoms, and severity, use your medical knowledge to suggest up to 3 of the most likely diseases.\n2. For each disease:\n   - Provide a brief disease description.\n   - Indicate the accuracy of the match between the symptoms provided and the disease (out of 10).\n   - If applicable, give a disease match description to explain how the symptoms align.\n   - Provide potential cures or treatments for the disease.\n   - List any red-flag warnings or serious symptoms to watch out for.\n3. If certain inputs like location of pain, recent travels, allergies, pre-existing conditions, or family medical history are missing, adjust the analysis accordingly, but still consider the available symptoms and information.\n4. Ensure that the output is clear, concise, and medically informative.\n5. Limit the disease predictions to **3 diseases** based on the user's input, even if more diseases could be relevant.\n\n---\n\n### Example Input for ChatGPT API:\nSymptoms: \n- Cough (Severity: 8/10)\n- Fever (Severity: 9/10)\n- Fatigue (Severity: 7/10)\n\nDuration: 4 days\n\nLocation of pain/discomfort: Headache (if applicable)\n\nRecent travels: Recent travel to a region with a flu outbreak (if applicable)\n\nAllergies: None reported\n\nPre-existing conditions: Asthma (if applicable)\n\nFamily medical history: Family history of heart disease (if applicable)\n\n---\n\n### Example Output:\n\nFor the input provided, the expected response should include the following:\n\n1. **Disease Name**: Influenza\n2. **Disease Details**: Influenza (Flu) is a contagious respiratory illness caused by influenza viruses. It can lead to severe symptoms, especially in children, elderly, and those with compromised immune systems. Common symptoms include fever, cough, fatigue, and body aches.\n3. **Accuracy**: 9/10 (The symptoms of cough, fever, and fatigue strongly align with the flu, though the location of pain and additional factors could refine the match further.)\n4. **Disease Match Description**: The user's reported cough, fever, and fatigue closely match the typical symptoms of influenza. The severity of the symptoms also aligns with moderate to severe flu cases.\n5. **Disease Cure**: Rest, hydration, and over-the-counter medications for fever and body aches. Antiviral medications like oseltamivir (Tamiflu) may be prescribed if detected early.\n6. **Red-Flag Warnings**: Watch for difficulty breathing, chest pain, or confusion, as these could indicate a more severe form of the disease or a complication.\n\n---\n\n**Note**: If the user has provided additional information (like allergies, pre-existing conditions, etc.), factor that into the disease prediction and modify the disease recommendations as necessary.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: {
    type: "object",
    properties: {
      predictedDiseases: {
        type: "array",
        items: {
          type: "object",
          properties: {
            diseaseName: { type: "string" },
            diseaseDetails: { type: "string" },
            accuracy: { type: "integer" },
            diseaseMatchDescription: { type: "string" },
            diseaseCure: { type: "string" },
            redFlagWarnings: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: [
            "diseaseName",
            "diseaseDetails",
            "accuracy",
            "diseaseMatchDescription",
            "diseaseCure",
          ],
        },
      },
    },
    required: ["predictedDiseases"],
  },
};

export async function POST(req) {
  try {
    const body = await req.json();

    let {symptoms, duration, location_discomfort, recent_travel, allergies, pre_existing_conditions, family_medical_history, } = body;

    console.log(body)
    console.log("++++++++++++++++++++++++++")

    if (!symptoms){
      return NextResponse.json(
        { error: "Atleast one symptom is required." },
        { status: 400 }
      );
    }

    if(!duration){
      return NextResponse.json(
        { error: "Duration is required." },
        { status: 400 }
      )
    }

    if(!location_discomfort){
      return NextResponse.json(
        { error: "Location of discomfort is required." },
        { status: 400 }
      )
    }

    let prompt = "Input:\n";

    prompt = "Symptoms: " + symptoms.map(item => `${item}`).join(', ');
    prompt += `\nDuration: ${duration}\nLocation of discomfort: ${location_discomfort}\n`;

    if(recent_travel){
      prompt += `Recent Travel: ${recent_travel}\n`;
    }
    if(allergies){
      prompt += `Allergies: ${allergies}\n`;
    }
    if(pre_existing_conditions){
      prompt += `Pre-existing Conditions: ${pre_existing_conditions}\n`;
    }
    if(family_medical_history){
      prompt += `Family Medical History: ${family_medical_history}\n`;
    }

    console.log(prompt);


    

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    console.log(result);
    console.log("--------------------------")
    console.log(result.response.text())

    return NextResponse.json({ response: JSON.parse(result.response.text()) });
  } catch (error) {
    console.error("Error in prediction route:", error?.message);

    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
