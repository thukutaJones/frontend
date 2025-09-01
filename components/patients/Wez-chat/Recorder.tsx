"use client";

import FastBouncingDots from "@/components/BouncingAnimation";
import { useEffect, useRef, useState } from "react";
import { IoIosMic } from "react-icons/io";
import { RiMicLine } from "react-icons/ri";

const mimeType = "audio/webm";

function Recorder({
  uploadAudio,
  isProcessing,
}: {
  uploadAudio: (blob: Blob) => void;
  isProcessing: boolean;
}) {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    getMicrophonePermission();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const getMicrophonePermission = async () => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      alert("The MediaRecorder API is not supported in your browser.");
      return;
    }

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      setPermission(true);
      setStream(streamData);
    } catch (err: any) {
      alert(err.message || "Failed to access the microphone.");
    }
  };

  const startRecording = () => {
    if (!stream || !permission) {
      alert("Microphone permission is required to record audio.");
      return;
    }

    const activeAudio = new Audio("/active.mp3");
    activeAudio.play();

    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;

    const localAudioChunks: Blob[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        localAudioChunks.push(event.data);
      }
    };

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(localAudioChunks, { type: mimeType });
      uploadAudio(audioBlob);

      // free memory
      localAudioChunks.length = 0;
    };

    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      const notActiveAudio = new Audio("/notactive.mp3");
      notActiveAudio.play();

      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <button
      onClick={!isRecording ? startRecording : stopRecording}
      disabled={isProcessing}
      className={`p-3 md:p-4 rounded-2xl md:rounded-3xl transition-all duration-300 hover:scale-110 shadow-lg group relative overflow-hidden
        ${
          isRecording
            ? "bg-red-500 text-white animate-pulse shadow-red-500/25"
            : "bg-gray-100 text-gray-600 hover:bg-blue-900 hover:text-white hover:shadow-blue-900/25"
        }
      `}
    >
      <div className="absolute inset-0 bg-white/10 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      {isRecording ? (
        <IoIosMic className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
      ) : isProcessing ? (
        <div className="flex items-center justify-center space-x-1">
          <span
            className="w-2 h-2 bg-blue-900 rounded-full bounce-fast"
            style={{ animationDelay: "-0.2s" }}
          ></span>
          <span
            className="w-2 h-2 bg-blue-900 rounded-full bounce-fast"
            style={{ animationDelay: "-0.1s" }}
          ></span>
          <span className="w-2 h-2 bg-blue-900 rounded-full bounce-fast"></span>
        </div>
      ) : (
        <RiMicLine className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
      )}
    </button>
  );
}

export default Recorder;
