import { useEffect, useState } from "react";
import { exampleAalysisResults } from "./constants";
import "./App.css";

function App() {
  const apiKey = "AIzaSyA9lBrctahbGKYoLQQkNPOFF9JRwggwgs4";

  const metricEmoticons: { [key: string]: string } = {
    runtime_speed: "✅",
    component_count: "🧩",
    external_packages: "📦",
    errors: "❌",
    warnings: "⚠️",
    redundant_components: "🔄",
    objective_completion: "🎯",
  };

  const [analysisResults, setAnalysisResults] = useState();
  const [filesToAnalyze, setFilesToAnalyze] = useState("");
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
      // console.log("Message received:", event.data);
      setFilesToAnalyze(event.data);
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

  useEffect(() => {
    async function fetchEvaluationResults() {
      try {
        if (!filesToAnalyze.length) {
          console.log("No files to analyze yet.");
          return;
        }
        const evaluationResults = JSON.stringify({
          prompt:
            "evaluate the two graphs UserAndGoalState against each other based on the evaluation paradigm runtime speed, component count, external packages, errors, warnings, redundant components and objective completion return the response in a json format that adheres exactly to the example anylysis results. Make sure to fit the exact schema of the example analysis results. Values for UserState are student values and values in GoalState are tutorial values. The penalty is the difference between the two values. The overall score should reflect how the student performed against the tutorial. Include at least 4 suggestions and have them detailed, specially if the score is below 60",
          UserAndGoalState: filesToAnalyze,
          exampleAalysisResults,
        });
        console.log("Evaluation Results:", evaluationResults);
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
                    text: evaluationResults,
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
        // Extract valid JSON from the response text
        const jsonStart = extractedText.indexOf("{");
        const jsonEnd = extractedText.lastIndexOf("}");
        const validJson = extractedText.substring(jsonStart, jsonEnd + 1);

        const parsedResponse = JSON.parse(validJson);
        console.log("Parsed AI response:", parsedResponse);
        console.log("AI response:", data);

        // Extract the AI response text and update the state
        setAnalysisResults(parsedResponse);
      } catch (error) {
        console.error("Error communicating with AI:", error);
      }
    }
    fetchEvaluationResults();
  }, [filesToAnalyze]);

  return (
    <>
      {analysisResults ? (
        <div>
          <div style={{ position: "absolute", top: "10px", left: "10px" }}>
            <img
              src="/Icon/GH_Quest_Icon_Transparent.png"
              alt="App Icon"
              style={{
                width: "350px",
              }}
            />
          </div>
          <h1>🎓</h1>
          <h1>Grasshopper Tutorial Completion Dashboard</h1>
          {analysisResults.score_out_of_100 >= 90 && (
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <h2>✨ Crushing it — you’re in full parametric flow!</h2>
              <p>
                🎉 Outstanding work! You’ve nailed this tutorial with precision
                and efficiency. Your solution reflects a solid understanding of
                Grasshopper components and workflows. Keep this momentum going
                as you take on more complex challenges!
              </p>
            </div>
          )}
          {analysisResults.score_out_of_100 >= 75 &&
            analysisResults.score_out_of_100 < 90 && (
              <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <h2>🚀 Strong execution with room to streamline.</h2>
                <p>
                  ✅ Great job! You’ve done really well on this tutorial. Your
                  graph is functional and mostly optimized. With a bit of
                  refinement — like cleaning up extra components or tightening
                  execution — you’ll be performing like a pro in no time!
                </p>
              </div>
            )}
          {analysisResults.score_out_of_100 >= 60 &&
            analysisResults.score_out_of_100 < 75 && (
              <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <h2>🛠️ Solid effort — let’s tighten things up.</h2>
                <p>
                  👍 You’re getting there! Your effort is showing, and the
                  foundations are solid. There are a few areas that could use
                  improvement, such as simplifying your setup or ensuring full
                  task completion. Stick with it — your parametric skills are
                  growing fast!
                </p>
              </div>
            )}
          {analysisResults.score_out_of_100 >= 40 &&
            analysisResults.score_out_of_100 < 60 && (
              <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <h2>📚 On the path — clarity and cleanup will help.</h2>
                <p>
                  🧱 Solid start, but there’s room to grow. You’ve taken some
                  important steps toward mastering this workflow, but the
                  outcome was either incomplete or could benefit from better
                  structure. Let’s use this as a learning opportunity to refine
                  your graph.
                </p>
              </div>
            )}
          {analysisResults.score_out_of_100 < 40 && (
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <h2>🌱 It’s a start — learning grows from here.</h2>
              <p>
                🌱 Every expert was once a beginner. This attempt didn’t hit the
                mark, but don’t be discouraged! Learning Grasshopper takes time.
                Let’s break things down and take another shot — you’re on the
                right path by showing up and trying.
              </p>
            </div>
          )}
          <div
            style={{
              textAlign: "center",
              marginTop: "4rem",
              borderTop: "1px solid #ccc",
              marginLeft: "15%",
              marginRight: "15%",
            }}
          >
            <h2>📊 Overall Score</h2>
            <p>Score: {analysisResults.score_out_of_100} / 100</p>
            <p>
              Rating:{" "}
              {analysisResults.score_out_of_100 >= 90
                ? "⭐⭐⭐⭐⭐"
                : analysisResults.score_out_of_100 >= 75
                ? "⭐⭐⭐⭐☆"
                : analysisResults.score_out_of_100 >= 60
                ? "⭐⭐⭐☆☆"
                : analysisResults.score_out_of_100 >= 40
                ? "⭐⭐☆☆☆"
                : "⭐☆☆☆☆"}
              (based on thresholds)
            </p>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              marginBottom: "2rem",
              marginLeft: "15%",
              marginRight: "15%",
              borderTop: "1px solid #ccc",
            }}
          >
            <h2>🧪 Evaluation Metrics Breakdown</h2>
            <table
              style={{
                margin: "0 auto",
                borderCollapse: "collapse",
                width: "80%",
              }}
            >
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Metric
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Value (Student)
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Value (Tutorial)
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Penalty
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(analysisResults.scoring_breakdown).map(
                  ([metric, values]) => (
                    <tr key={metric}>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {metricEmoticons[metric]}{" "}
                        {metric
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .replace(/^\w|\s\w/g, (c) => c.toUpperCase())}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {values.student}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {values.tutorial}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {values.penalty}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              marginBottom: "2rem",
              marginLeft: "15%",
              marginRight: "15%",
              borderTop: "1px solid #ccc",
            }}
          >
            <h2>🧠 Suggestions for Improvement</h2>
            <ul
              style={{
                textAlign: "left",
                padding: "20px",
                listStyleType: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {analysisResults.suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  style={{
                    maxWidth: "700px",
                    marginBottom: "10px",
                    padding: "10px",
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f9f9f9",
            color: "#333",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Loading...</h2>
          <p style={{ fontSize: "1.2rem" }}>
            Please wait while we analyze your results.
          </p>
        </div>
      )}
    </>
  );
}

export default App;
