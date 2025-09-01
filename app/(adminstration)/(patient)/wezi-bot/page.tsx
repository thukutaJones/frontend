"use client";

import LoadingAnimation from "@/components/LoadingAnimation";
import InputArea from "@/components/patients/Wez-chat/InputArea";
import MessagesContainer from "@/components/patients/Wez-chat/MessagesContainer";
import WelcomeMessage from "@/components/patients/Wez-chat/WelcomeMessage";
import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

const page = () => {
  const user = useAuth(["patient"]);
  const [messages, setMessages] = useState<any>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [typingText, setTypingText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { t } = useTranslation();

  //user dummy data
  const userName = user?.name;

  // const welcomeText = `${t("greeting.hello")}, ${userName}\n${t(
  //   "greeting.weziBotGreeting"
  // )}?`;

  const welcomeText = `Hello, ${userName} How can Wezi Bot help you today??`;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Typing animation effect for welcome message
  useEffect(() => {
    if (!showWelcome) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index <= welcomeText.length) {
        setTypingText(welcomeText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [welcomeText, showWelcome]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Hide welcome message when first message is sent
    if (showWelcome) {
      setShowWelcome(false);
    }

    const newMessage = {
      message: inputText,
      sender: "user",
      createAt: new Date(),
    };

    setMessages((prev: any) => [...prev, newMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const activeAudio = new Audio("/active.mp3");
      activeAudio.play();
      let payload: any = { message: inputText };
      if (user?.id) {
        payload = { ...payload, userType: "registred", id: user?.id };
      } else {
        const deviceId = localStorage.getItem("device_id") || uuidv4();
        localStorage.setItem("device_id", deviceId);
        payload = { ...payload, userType: "guest", id: deviceId };
      }
      const res = await axios.post(
        `${baseUrl}/api/chat`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const chatReply = res?.data?.message;
      console.log(chatReply);

      setMessages((prev: any) => [...prev, chatReply]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsTyping(false);
    }
  };

  const uploadAudio = async (blob: Blob) => {
    setIsProcessing(true);
    const mimeType = "audio/webm";
    const file = new File([blob], "audio.webm", { type: mimeType });

    if (fileRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileRef.current.files = dataTransfer.files;

      // if (submitButtonRef.current) {
      //   submitButtonRef.current?.click();
      // }
    }
    const formData = new FormData();
    formData.append("audio", file);

    try {
      const res = await axios.post(`${baseUrl}/api/chat/audio`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const chatReply = res?.data?.response;
      const userPrompt = res?.data?.userPrompt;
      console.log(chatReply);

      setMessages((prev: any) => [...prev, userPrompt, chatReply]);

      if ("speechSynthesis" in window) {
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(chatReply?.message);
        utterance.pitch = 1.2;
        utterance.rate = 1;
        utterance.volume = 1;
        utterance.lang = "en-US";

        utterance.onstart = () => {
          setIsProcessing(false);
          setIsSpeaking(true);
        };
        utterance.onend = () => {
          setIsSpeaking(false);
          const notActiveAudio = new Audio("/notactive.mp3");
          notActiveAudio.play();
        };

        speechSynthesis.speak(utterance);
      } else {
        alert("Text-to-Speech is not supported in this browser.");
      }
    } catch (error) {
    } finally {
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoading || !user) return <LoadingAnimation />;

  return (
    <div
      className={`min-h-[calc(100vh-70px)] bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col`}
    >
      <div
        ref={containerRef}
        className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-6 py-6 overflow-hidden flex flex-col"
      >
        {showWelcome && messages?.length === 0 && (
          <WelcomeMessage
            typingText={typingText}
            welcomeText={welcomeText}
            type="bot"
          />
        )}

        {messages?.length > 0 && (
          <MessagesContainer
            messages={messages}
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
            type="patient"
          />
        )}
      </div>
      <InputArea
        setInputText={setInputText}
        inputRef={inputRef}
        handleKeyPress={handleKeyPress}
        inputText={inputText}
        handleSendMessage={handleSendMessage}
        type="bot"
        uploadAudio={uploadAudio}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default page;
