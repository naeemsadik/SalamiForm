"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useAudioUpload } from "@/hooks/useAudioUpload";

interface AudioUploadStepProps {
  label: string;
  onUpload: (url: string) => void;
  error?: string;
  helperText?: string;
}

export function AudioUploadStep({
  label,
  onUpload,
  error,
  helperText,
}: AudioUploadStepProps) {
  const { file, audioUrl, isLoading, error: uploadError, uploadFile, clearFile } =
    useAudioUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);

  const stopTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    setRecordingSeconds(0);
    timerRef.current = window.setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
  };

  const cleanupStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      const uploadedUrl = await uploadFile(droppedFile);
      onUpload(uploadedUrl);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const uploadedUrl = await uploadFile(selectedFile);
      onUpload(uploadedUrl);
    }
  };

  const startRecording = async () => {
    setRecordingError(null);

    try {
      if (typeof MediaRecorder === "undefined") {
        setRecordingError("Recording is not supported in this browser. Please upload an audio file.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        stopTimer();
        setIsRecording(false);

        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const fileFromRecording = new File(
          [blob],
          `voice-recording-${Date.now()}.webm`,
          { type: "audio/webm" }
        );

        try {
          const uploadedUrl = await uploadFile(fileFromRecording);
          onUpload(uploadedUrl);
        } catch {
          setRecordingError("Failed to upload recording. Please try again.");
        } finally {
          cleanupStream();
        }
      };

      mediaRecorder.start();
      startTimer();
      setIsRecording(true);
    } catch {
      setRecordingError("Microphone access was denied. Please allow microphone access and try again.");
      cleanupStream();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  if (audioUrl && file) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-white">{label}</h2>

        {helperText && (
          <p className="text-white/60 text-sm">{helperText}</p>
        )}

        <div className="rounded-2xl bg-white/5 border border-white/20 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">📋 {file.name}</p>
              <p className="text-white/60 text-sm">Uploaded successfully</p>
            </div>
            <span className="text-sm text-green-300">Ready</span>
          </div>

          <audio controls className="w-full rounded-lg">
            <source src={audioUrl} type={file.type} />
          </audio>

          <motion.button
            onClick={clearFile}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white/70 transition-all"
          >
            Replace
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-white">{label}</h2>

      {helperText && (
        <p className="text-white/60 text-sm">{helperText}</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <motion.button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          className={`rounded-2xl border p-5 text-left transition-all ${
            isRecording
              ? "border-red-400 bg-red-500/10"
              : "border-white/30 bg-white/5 hover:border-primary-400"
          }`}
        >
          <p className="text-white font-semibold">
            {isRecording ? "Stop recording" : "Start recording"}
          </p>
          <p className="text-white/60 text-sm mt-1">
            {isRecording
              ? `Recording ${recordingSeconds}s`
              : "Use your microphone to record a short voice message."}
          </p>
        </motion.button>

        <motion.div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl border border-dashed border-white/30 bg-white/5 p-5 text-left transition-all cursor-pointer hover:border-primary-400"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <p className="text-white font-semibold">Upload an audio file</p>
          <p className="text-white/60 text-sm mt-1">
            Drag and drop or click here. Max duration is 15 seconds.
          </p>
        </motion.div>
      </div>

      {isLoading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/70 text-sm text-center"
        >
          Uploading audio...
        </motion.p>
      )}

      {(recordingError || uploadError || error) && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-sm text-center"
        >
          {recordingError || uploadError || error}
        </motion.p>
      )}
    </motion.div>
  );
}
