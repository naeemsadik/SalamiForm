"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useAudioUpload } from "@/hooks/useAudioUpload";

interface AudioUploadStepProps {
  label: string;
  onUpload: (url: string) => void;
  error?: string;
}

export function AudioUploadStep({
  label,
  onUpload,
  error,
}: AudioUploadStepProps) {
  const { file, audioUrl, isLoading, error: uploadError, uploadFile, clearFile } =
    useAudioUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles[0]) {
      await uploadFile(droppedFiles[0]);
      if (audioUrl) {
        onUpload(audioUrl);
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      await uploadFile(selectedFile);
      if (audioUrl) {
        onUpload(audioUrl);
      }
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

        <div className="rounded-2xl bg-white/5 border border-white/20 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">📋 {file.name}</p>
              <p className="text-white/60 text-sm">Uploaded successfully</p>
            </div>
            <span className="text-2xl">✅</span>
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

      <motion.div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        className={`
          rounded-2xl
          border-2
          border-dashed
          p-12
          text-center
          transition-all
          cursor-pointer
          ${
            isLoading
              ? "border-primary-400 bg-primary-500/10"
              : "border-white/30 bg-white/5 hover:border-primary-400 hover:bg-primary-500/5"
          }
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {isLoading ? (
          <div className="space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-4xl mx-auto w-fit"
            >
              ⏳
            </motion.div>
            <p className="text-white/60">Uploading your Eid salam...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-2xl">🎤</p>
            <p className="text-white font-semibold">
              Drop your Eid salam or click to upload
            </p>
            <p className="text-white/60 text-sm">
              Max 15 seconds, MP3/WAV/M4A
            </p>
          </div>
        )}
      </motion.div>

      {(uploadError || error) && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-sm text-center"
        >
          {uploadError || error}
        </motion.p>
      )}
    </motion.div>
  );
}
