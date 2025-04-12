import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const apiKey = "AIzaSyA9lBrctahbGKYoLQQkNPOFF9JRwggwgs4";
  const json = {
    "6ea52cac-203d-4636-8528-356bbc52d160": {
      componentData: {
        name: "Move",
        description: "Translate (move) an object along a vector",
        runTime: "25",
      },
      nodeData: {
        inputs: [
          {
            name: "Geometry",
            connections: [
              "89c58804-31ff-43b1-a08b-eabcf22f568b",
              "7c40ef27-a8e0-4214-88d5-44303a2502bc",
            ],
          },
          {
            name: "Motion",
            connections: ["c948958a-0a51-4c8a-9ac8-0311f8a45cd5"],
          },
        ],
        outputs: [
          {
            name: "Geometry",
            connections: ["f770882b-ee52-4898-adb4-351b305b24b1"],
          },
          {
            name: "Move",
            connections: [],
          },
        ],
      },
    },
    "89c58804-31ff-43b1-a08b-eabcf22f568b": {
      componentData: {
        name: "Point",
        description: "Point",
        runTime: "3",
      },
      nodeData: {
        inputs: [
          {
            name: "Point",
            connections: [],
          },
        ],
        outputs: [
          {
            name: "Geometry",
            connections: ["6ea52cac-203d-4636-8528-356bbc52d160"],
          },
        ],
      },
    },
    "7c40ef27-a8e0-4214-88d5-44303a2502bc": {
      componentData: {
        name: "Unit Z",
        description: "Z",
        runTime: "2",
      },
      nodeData: {
        inputs: [
          {
            name: "Factor",
            connections: [],
          },
        ],
        outputs: [
          {
            name: "Unit Vector",
            connections: ["6ea52cac-203d-4636-8528-356bbc52d160"],
          },
        ],
      },
    },
  };

  const [messages, setMessages] = useState<string[]>([
    JSON.stringify(json, null, 2),
  ]);
  const [aiResponses, setAIResponses] = useState<string[]>([]);
  const [status, setStatus] = useState("Disconnected");

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket("ws://localhost:8181/ws");

    // Handle connection open
    ws.onopen = () => {
      setStatus("Connected");
      console.log("Connected to WebSocket server");
    };

    // Handle incoming messages
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
      console.log("Message received:", event.data);
    };

    // Handle connection close
    ws.onclose = () => {
      setStatus("Disconnected");
      console.log("WebSocket connection closed");
    };

    // Handle errors
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  const sendMessageToAI = async (input: string) => {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: input,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }

      const data = await response.json();
      const extractedText =
        data.candidates[0]?.content?.parts[0]?.text || "No text found";
      console.log("AI response:", data);

      // Extract the AI response text and update the state
      setAIResponses((prev) => [...prev, `AI: ${extractedText}`]);
    } catch (error) {
      console.error("Error communicating with AI:", error);
      setAIResponses((prev) => [...prev, `Error: ${error.message}`]);
    }
  };
  return (
    <>
      <div>
        <h1>WebSocket Client</h1>
        <p>Status: {status}</p>
        <div>
          <h2>Messages:</h2>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>
                <pre>{JSON.stringify(JSON.parse(msg), null, 2)}</pre>
                <button
                  onClick={async () => {
                    await sendMessageToAI(msg);
                    setAIResponses((prev) => [
                      ...prev,
                      "Sending to AI: " + msg,
                    ]);
                  }}
                >
                  Send to AI
                </button>
              </li>
            ))}
            {aiResponses.map((msg, index) => (
              <li key={index}>
                <p>{msg}</p>
              </li>
            ))}
          </ul>
          {/* <button
            onClick={() => {
              sendMessageToAI("Analayze this: " + JSON.stringify(json));
            }}
          >
            Send to AI
          </button> */}
        </div>
      </div>
    </>
  );
}

export default App;
