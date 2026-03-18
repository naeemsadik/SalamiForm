"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface UseAudioUploadReturn {
  file: File | null;
  audioUrl: string | null;
  isLoading: boolean;
  error: string | null;
  uploadFile: (file: File) => Promise<string>;
  clearFile: () => void;
  duration: number;
}

export function useAudioUpload(): UseAudioUploadReturn {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);

  const uploadFile = async (selectedFile: File): Promise<string> => {
    setError(null);
    setIsLoading(true);

    try {
      // Validate file type
      if (!selectedFile.type.startsWith("audio/")) {
        throw new Error("Only audio files are allowed.");
      }

      // Validate duration
      const audio = document.createElement("audio");
      audio.src = URL.createObjectURL(selectedFile);

      await new Promise((resolve) => {
        audio.onloadedmetadata = () => {
          setDuration(audio.duration);
          resolve(null);
        };
      });

      if (audio.duration > 15) {
        throw new Error("Max 15 seconds allowed");
      }

      // Upload to Supabase
      const fileName = `${Date.now()}-${selectedFile.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from("eid-audio")
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("eid-audio")
        .getPublicUrl(fileName);

      setAudioUrl(urlData.publicUrl);
      setFile(selectedFile);
      return urlData.publicUrl;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Upload failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setAudioUrl(null);
    setDuration(0);
    setError(null);
  };

  return { file, audioUrl, isLoading, error, uploadFile, clearFile, duration };
}
