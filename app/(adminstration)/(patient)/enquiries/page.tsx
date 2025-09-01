"use client";

import InputArea from "@/components/patients/Wez-chat/InputArea";
import WelcomeMessage from "@/components/patients/Wez-chat/WelcomeMessage";
import { useAuth } from "@/hooks/useAuth";
import React, { useState, useRef, useEffect } from "react";
import { connectSocket, disconnectSocket } from "@/utils/socket";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import EnquiriesEmptyState from "@/components/hods/EnquiresEmptyState";
import MessagesContainer from "@/components/patients/enquires/MessagesContainer";
import LoadingAnimation from "@/components/LoadingAnimation";
import EnquirySidebar from "@/components/hods/EnquirySidear";
import NoActivePatient from "@/components/hods/NoActivePatient";

interface Message {
  text: string;
  sender: "patient" | "hod";
  timestamp: Date;
  senderId: string;
  _id?: string;
  receiverId?: string;
}

const page = () => {
  const user = useAuth(["patient", "hod"]);
  const [enquires, setEnquiries] = useState<Message[]>([]);
  const [inputText, setInputText] = useState(""); 
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [typingText, setTypingText] = useState("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [socket, setSocket] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activePatient, setActivePatient] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const welcomeText = `Hello, ${
    user?.name || ""
  }\nHow can the Wezi Team help you today?`;

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
  }, [enquires]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    const newSocket = connectSocket({ userId: user?.id });
    setSocket(newSocket);

    const handleNewEnquiry = async (newEnquiry: any) => {
      if (user?.role === "hod") {
        await fetchConversations();
      }
      // if (user?.role === "hod" && activePatient) return;

      setEnquiries((prev: any[]) => [...prev, newEnquiry]);
    };

    newSocket.on("receiveEnquiry", handleNewEnquiry);

    return () => {
      disconnectSocket();
    };
  }, [user]);

  const handleSendEnquiry = async () => {
    try {
      if (!user) return;
      if (!inputText.trim()) return;
      setIsSending(true); 
      if (showWelcome) {
        setShowWelcome(false);
      }

      const newEnquiry: Message = {
        text: inputText,
        sender: user?.role === "patient" ? "patient" : "hod",
        timestamp: new Date(),
        senderId: user?.id,
        receiverId: user?.role === "patient" ? null : activePatient?._id,
      };
      await socket.emit("sendEnquiry", newEnquiry);
      setEnquiries((prev) => [...prev, newEnquiry]);
      setInputText("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendEnquiry();
    }
  };

  const fetchEnquires = async () => {
    if (!user) return;
    if (user?.role === "hod" && !activePatient) return;
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${baseUrl}/api/enquires/${
          user?.role === "hod" ? activePatient?._id : user?.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setEnquiries(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchConversations = async () => {
    if (!user || user?.role !== "hod") return;
    try {
      setIsLoading(true);
      const res = await axios.get(`${baseUrl}/api/enquires/hod/conversations`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setConversations(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquires();
  }, [user, activePatient]);

  useEffect(() => {
    fetchConversations();
  }, [user]);

  if (!user || isLoading) return <LoadingAnimation />;

  return (
    <div
      className={`h-[calc(100vh-70px)] relative bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-row overflow-hidden`}
    >
      {user?.role === "hod" && (
        <div className="flex h-[50px]">
          <EnquirySidebar
            enquiries={conversations}
            onEnquiryClick={(patient: any) => setActivePatient(patient)}
            activeEnquiryId={activePatient?._id}
          />
        </div>
      )}
      <div className={`flex flex-1 flex-col h-[calc(100vh-70px)]`}>
        <div
          ref={containerRef}
          className="flex-1 overflow-hidden flex flex-col"
        >
          {enquires?.length === 0 && showWelcome && user?.role === "patient" ? (
            <WelcomeMessage
              typingText={typingText}
              welcomeText={welcomeText}
              type="patient"
            />
          ) : conversations?.length > 0 &&
            !activePatient &&
            user?.role === "hod" ? (
            <NoActivePatient />
          ) : (
            user?.role === "hod" &&
            enquires?.length === 0 && <EnquiriesEmptyState />
          )}

          {enquires?.length > 0 && user?.role === "patient" ? (
            <MessagesContainer
              messages={enquires}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
              type={"patient"}
              userId={user?.id || ""}
            />
          ) : (
            enquires?.length > 0 &&
            user?.role === "hod" &&
            activePatient && (
              <MessagesContainer
                messages={enquires}
                isTyping={isTyping}
                messagesEndRef={messagesEndRef}
                type={"hod"}
                userId={user?.id || ""}
              />
            )
          )}
        </div>

        {user?.role === "patient" ? (
          <InputArea
            setInputText={setInputText}
            inputRef={inputRef}
            handleKeyPress={handleKeyPress}
            inputText={inputText}
            handleSendMessage={handleSendEnquiry}
            type="patient"
          />
        ) : (
          enquires?.length > 0 &&
          user?.role === "hod" &&
          activePatient && (
            <InputArea
              setInputText={setInputText}
              inputRef={inputRef}
              handleKeyPress={handleKeyPress}
              inputText={inputText}
              handleSendMessage={handleSendEnquiry}
              type="hod"
            />
          )
        )}
      </div>
    </div>
  );
};

export default page;
