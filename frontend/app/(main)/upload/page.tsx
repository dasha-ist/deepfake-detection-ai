"use client"; // Required for using React Hooks (useState, useEffect, etc.)

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef, ChangeEvent, DragEvent } from 'react';

// Define interfaces for API responses
interface PredictionResponse {
  prediction_percentage: number;
  result: "Fake" | "Real";
}

interface ErrorResponse {
  error: string; // The key from our backend JSON
}

export default function PublicUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection from input or drag/drop
  const handleFileSelected = (file: File | undefined) => {
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setError("Invalid file type. Please upload a PNG, JPG, or JPEG image.");
        setSelectedFile(null);
        setPreviewUrl(null);
        setPrediction(null);
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError("File is too large. Maximum size is 5MB.");
        setSelectedFile(null);
        setPreviewUrl(null);
        setPrediction(null);
        return;
      }

      setSelectedFile(file);
      setPrediction(null);
      setError(null);

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileSelected(event.target.files?.[0]);
    if (event.target) {
        event.target.value = "";
    }
  };

  const handleDivClick = () => {
    if (!isLoading) {
        fileInputRef.current?.click();
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (isLoading) return;

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFileSelected(event.dataTransfer.files[0]);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const uploadImage = async () => {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/upload`;
        const response = await fetch(apiUrl, {
          method: "POST",
          body: formData,
          signal: signal,
        });

        // This block is now updated to handle the custom error
        if (!response.ok) {
          let errorData: ErrorResponse;
          try {
            errorData = await response.json();
          } catch (e) {
            // Fallback if the JSON parsing itself fails
            throw new Error(`Server returned a bad response. Status: ${response.status}`);
          }
          // *** THE FIX IS HERE ***
          // We now use errorData.error, which matches the backend response.
          throw new Error(errorData.error || `An unknown error occurred. Status: ${response.status}`);
        }

        const data: PredictionResponse = await response.json();
        setPrediction(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || "An unknown error occurred during upload.");
        }
      } finally {
        if (!controller.signal.aborted) {
            setIsLoading(false);
        }
      }
    };

    uploadImage();

    return () => {
      controller.abort();
    };
  }, [selectedFile]);

  useEffect(() => {
    const currentPreviewUrl = previewUrl;
    return () => {
      if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
      }
    };
  }, [previewUrl]);

  const resetState = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPrediction(null);
    setError(null);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const UploadInteractionArea = () => {
    if (isLoading) {
      return (
        <div className="text-center p-12 min-h-[280px] flex flex-col justify-center items-center">
          <div role="status" className="flex flex-col items-center justify-center">
              <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <p className="text-lg font-medium text-gray-300">Analyzing your image...</p>
              <p className="text-gray-500 mt-1">This might take a moment.</p>
              {previewUrl && <img src={previewUrl} alt="Uploading preview" className="max-h-32 mx-auto mt-4 rounded-lg shadow-md opacity-50" />}
          </div>
        </div>
      );
    }
    // This component now correctly displays the backend error message
    if (error) {
      return (
        <div className="border-2 border-dashed border-red-700 bg-red-900/30 rounded-lg p-12 text-center min-h-[280px] flex flex-col justify-center items-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <p className="text-red-400 text-lg font-semibold mb-2">An Error Occurred</p>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">{error}</p>
          <Button onClick={resetState} className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
            Try Again
          </Button>
        </div>
      );
    }
    if (prediction) {
      return (
        <div className="text-center p-8 min-h-[280px] flex flex-col justify-center items-center">
          {previewUrl && <img src={previewUrl} alt="Uploaded preview" className="max-h-60 mx-auto mb-6 rounded-lg shadow-lg" />}
          <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
          <h3 className="text-2xl font-semibold mb-2 text-gray-100">Analysis Complete</h3>
          <div className="mb-4">
            <span className="text-lg text-gray-300">Result: </span>
            <Badge className={`text-lg px-3 py-1 ${prediction.result === "Fake" ? "bg-red-600 text-white border-red-700" : "bg-green-600 text-white border-green-700"}`}>
              {prediction.result}
            </Badge>
          </div>
          <div className="mb-6">
            <span className="text-lg text-gray-300">Confidence: </span>
            <span className="text-xl font-bold text-purple-400">{prediction.prediction_percentage.toFixed(1)}%</span>
          </div>
          <Button onClick={resetState} className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
            Upload Another Image
          </Button>
        </div>
      );
    }
    return (
      <div className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors min-h-[280px] flex flex-col justify-center items-center ${isLoading ? 'cursor-default' : 'cursor-pointer hover:border-purple-500'} ${error ? 'border-red-700' : 'border-gray-700'}`} onClick={handleDivClick} onDragOver={handleDragOver} onDrop={handleDrop}>
        <input type="file" ref={fileInputRef} onChange={handleFileInputChange} accept=".png,.jpg,.jpeg" className="hidden" disabled={isLoading} />
        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-500" />
        <p className="text-lg font-medium text-gray-200">Drag and drop your image here</p>
        <p className="text-gray-500 mt-1">or click to browse files</p>
        <p className="text-gray-600 text-sm mt-3">Supports JPG, PNG, JPEG up to 5MB</p>
        <Button onClick={(e) => { e.stopPropagation(); handleDivClick(); }} className="mt-6 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600" disabled={isLoading}>
            Select File
        </Button>
      </div>
    );
  };

  return (
    // The rest of your component remains the same
    <>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="px-5 py-1.5 bg-purple-900/30 text-purple-400 hover:bg-purple-900/40 border-purple-800 text-sm mb-4">
              Free Analysis
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              Detect DeepFakes{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                with Precision
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Upload an image to analyze for potential deepfake manipulation using our advanced AI technology.
            </p>
          </div>

          <Card className="bg-gray-900/50 border-gray-800 mb-8 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Upload Image for Analysis</CardTitle>
              <CardDescription className="text-gray-400">
                Our AI will analyze your image and provide a detailed report on its authenticity.
                Supports JPG, PNG, JPEG files up to 5MB.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadInteractionArea />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-900/30 rounded-lg p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-900/50 text-purple-400 flex items-center justify-center text-xl font-bold mb-4 mx-auto">1</div>
              <h3 className="text-lg font-medium mb-2">Upload Image</h3>
              <p className="text-gray-400 text-sm">Upload any image you want to analyze for potential manipulation</p>
            </div>
            <div className="bg-gray-900/30 rounded-lg p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-900/50 text-purple-400 flex items-center justify-center text-xl font-bold mb-4 mx-auto">2</div>
              <h3 className="text-lg font-medium mb-2">AI Analysis</h3>
              <p className="text-gray-400 text-sm">Our advanced AI analyzes the image for signs of deepfake manipulation</p>
            </div>
            <div className="bg-gray-900/30 rounded-lg p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-900/50 text-purple-400 flex items-center justify-center text-xl font-bold mb-4 mx-auto">3</div>
              <h3 className="text-lg font-medium mb-2">Get Results</h3>
              <p className="text-gray-400 text-sm">Receive a detailed report with confidence score and analysis</p>
            </div>
          </div>

          <div className="bg-gray-900/20 border border-gray-800 rounded-lg p-8">
            <h3 className="text-xl font-medium mb-4 flex items-center">
              <Badge className="mr-2 bg-purple-500/20 text-purple-400">Pro Tip</Badge>
              Create an account for more features
            </h3>
            <p className="text-gray-400 mb-4">Sign up for a free account to access additional features:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Save your analysis history and access it anytime</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Analyze larger images with higher resolution</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>Access detailed manipulation heatmaps and AI model detection</span>
              </li>
            </ul>
            <Link href="/auth">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}