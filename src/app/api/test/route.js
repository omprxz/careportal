import { NextResponse } from "next/server";
import fs from "fs";

export function GET(req) {
  try {
    // Read the original JSON file
    const data = fs.readFileSync("./src/resourses/datasets/diseases.json", "utf8");
    const jsonData = JSON.parse(data);

    // Create a Set to hold all unique symptoms
    const allSymptomsSet = new Set(); // To store unique symptoms

    // Iterate over each disease in the JSON data
    Object.keys(jsonData).forEach((disease) => {
      const symptomsFlatList = jsonData[disease];

      // Add symptoms to the set to ensure uniqueness
      Object.keys(symptomsFlatList).forEach((symptom) => {
        allSymptomsSet.add(symptom);
      });
    });

    // Convert the set of symptoms to an array (sorted alphabetically for clarity)
    const uniqueSymptoms = Array.from(allSymptomsSet).sort();

    // Save the unique symptoms to the symptoms.json file
    const symptomsJsonData = JSON.stringify(uniqueSymptoms, null, 2); // formatted JSON string
    fs.writeFileSync("./src/resourses/datasets/symptoms.json", symptomsJsonData, "utf8");

    // Return the response with the unique symptoms
    return NextResponse.json({ symptoms: uniqueSymptoms }, { status: 200 });

  } catch (error) {
    console.log(error?.message);
    return NextResponse.json({ error: "Error reading JSON file" }, { status: 500 });
  }
}
