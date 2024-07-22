"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PmwTvNfrVgf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { KeyboardEvent, useState, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import FeedbackButton from "@/components/FeedbackButton";

interface Message {
  id?: number;
  message: string;
  answer: string;
  feedback: boolean | null;
}

const fetchMessages = async (): Promise<Message[]> => {
  const res = await fetch("/api/messages");
  const data = await res.json();
  return data;
};

const sendMessage = async (message: string): Promise<Message> => {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
  const data = await res.json();
  return data;
};

const updateFeedback = async (
  id: number,
  feedback: boolean | null
): Promise<void> => {
  await fetch("/api/messages", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, feedback }),
  });
};

export default function HomePage() {
  const [answer, setAnswer] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchMessages();
      setMessages(data);
    };
    loadMessages();
  }, []);

  const handleSend = async () => {
    const newMessage: Message = {
      message: input,
      answer: "thinking...",
      feedback: null,
    };
    setMessages([...messages, newMessage]);
    setInput("");
    const result = await sendMessage(input);
    setMessages((prevMessages) =>
      prevMessages.map((msg, index) =>
        index === prevMessages.length - 1
          ? { ...msg, answer: result.answer, id: result.id }
          : msg
      )
    );
  };

  const handleFeedback = async (id: number, feedback: boolean | null) => {
    await updateFeedback(id, feedback);
    setMessages((prevMessages) =>
      prevMessages.map((msg) => (msg.id === id ? { ...msg, feedback } : msg))
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[100vh] w-full">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/sign-in"
          >
            Sign In
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col w-full items-center bg-gray-100  relative top-5 justify-end">
        <section className="flex flex-col justify-end bg-white border-border border py-8 px-4 rounded-lg my-4 border-t p-0 bottom-[8vh] ">
          <div className="h-[70vh] w-[600px] overflow-y-scroll bg-white border-border py-2 border px-4 rounded-md">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div className="flex flex-col" key={index}>
                  <div
                    className={`flex flex-col text-center h-full justify-end my-2`}
                  >
                    <div className="flex flex-col items-end">
                      <p className=" flex flex-col bg-slate-200 text-gray-700 border border-border rounded-lg p-3 md:text-lg items-end ">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                  <div
                    key={index}
                    className={`flex flex-col text-center h-full justify-start`}
                  >
                    <div className="flex flex-col">
                      <p className="flex items-start  flex-col border border-border bg-slate-50 text-gray-700 borde rounded-lg p-3  md:text-lg  ">
                        <Markdown className="text-justify">
                          {msg.answer}
                        </Markdown>
                      </p>
                      <div className="flex flex-col justify-end">
                        <FeedbackButton
                          feedback={msg.feedback}
                          onFeedbackChange={(newFeedback) =>
                            msg.id && handleFeedback(msg.id, newFeedback)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <p className=" text-center mt-52">Send Your Messages</p>
              </>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="flex flex-col w-full my-8 items-center">
            <div className="flex sm:flex-row flex-col sm:space-y-0 sm:space-x-2 ">
              <input
                className="max-w-lg w-96 px-4 border-border border rounded-md "
                placeholder="Chat with AI"
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                onKeyDown={handleKeyDown}
                ref={inputRef}
              />
              <button
                onClick={handleSend}
                className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          © 2024 AI Chat Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
