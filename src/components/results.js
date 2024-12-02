"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, Activity, Thermometer, Pill } from "lucide-react";
import { useRouter } from "next/navigation";
import AccuracyChart from "./AccuracyChart";

const resultVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function Results({ results, setResults }) {
  const disease = results.predictedDiseases[0];
  const router = useRouter();

  return (
    <motion.div
      variants={resultVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-md mx-auto"
    >
      <Card className="bg-gradient-to-br from-indigo-100 to-purple-100 shadow-lg overflow-hidden">
        <CardHeader className="bg-indigo-600 text-white">
          <CardTitle className="text-2xl font-bold">
            Disease : {disease.diseaseName}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-700">
            <Activity size={24} />
            <span className="font-semibold">Disease Details:</span>
          </div>
          <p className="text-gray-700">{disease.diseaseDetails}</p>

          <div className="flex items-center space-x-2 text-indigo-700">
            <Thermometer size={24} />
            <span className="font-semibold">Symptoms Match:</span>
          </div>
          <p className="text-gray-700">{disease.diseaseMatchDescription}</p>

          <div className="flex items-center space-x-2 text-indigo-700">
            <Pill size={24} />
            <span className="font-semibold">Potential Treatment:</span>
          </div>
          <p className="text-gray-700">{disease.diseaseCure}</p>

          {disease.redFlagWarnings && (
            <div className="mt-4 bg-red-100 p-4 rounded-lg">
              <h4 className="font-semibold flex items-center text-red-700">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Red Flag Warnings:
              </h4>
              <ul className="list-disc list-inside text-sm text-red-600 mt-2">
                {disease.redFlagWarnings.map((warning, idx) => (
                  <li key={idx}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-8">
        <div>
          <AccuracyChart accuracy={disease.accuracy * 10} />
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3 pt-5">
        <Button
          onClick={() => router.push("/dashboard/prediction")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Send To Doctor
        </Button>
        <Button
          onClick={() => router.push("/dashboard/prediction")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Save Prediction
        </Button>
        <Button
          onClick={() => router.push("/dashboard/prediction")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Download Prediction
        </Button>
        <Button
          onClick={() => router.push("/dashboard/prediction")}
          variant="destructive"
        >
          Cancel
        </Button>
      </div>

      <div>
        <p className="text-red-500 text-sm text-center">
          Care portal can make mistake. Consult a professional.
        </p>
      </div>
    </motion.div>
  );
}
