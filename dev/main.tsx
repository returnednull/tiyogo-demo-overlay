import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TiyogoOverlay, addNote } from "../src";

function App() {
  return (
    <main
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        fontFamily: "system-ui, sans-serif",
        color: "#9ca3af",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 13, letterSpacing: ".04em" }}>
          blank page — hover & click the badge ↘
        </p>
        <button
          onClick={() => addNote("Payment & auth are mocked for this demo")}
          style={{
            marginTop: 16,
            padding: "8px 14px",
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#fff",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          + add a note
        </button>
      </div>

      <TiyogoOverlay
        position="bottom-left"
        firstPublished="24 May 2026"
        lastUpdated="25 May 2026"
        description={`This demo is prepared as a visual moodboard preview upon our initial discussions. Bugs and missing functionalities are expected, and won't be existed in post-deal production build.\n\n Content and idea here is timestamped, licensed, and copyrighted intellectual property.\n\nTiyogo Ltd © 2026`}
      />
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
