export default function InfoPanel({ open, onClose, selectedLT, toggleBreaker }) {
  if (!selectedLT) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: open ? 0 : "-420px",
        width: "400px",
        height: "100vh",
        background: "linear-gradient(180deg, #0b1623, #0f1e33)",
        color: "white",
        padding: "24px",
        transition: "right 0.35s ease",
        boxShadow: open ? "-5px 0 20px rgba(0,0,0,0.4)" : "none",
        zIndex: 3000,
        overflowY: "auto"
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "18px",
          right: "18px",
          background: "rgba(255,255,255,0.1)",
          border: "none",
          color: "white",
          padding: "6px 10px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "18px"
        }}
      >
        ✕
      </button>

      <h2 style={{ marginTop: "40px", fontSize: "26px", fontWeight: "600" }}>
        LT Details
      </h2>

      <p style={{ marginTop: "6px", opacity: 0.7 }}>
        Showing status for <b>{selectedLT.name}</b>
      </p>

      {/* BREAKER CARDS */}
      <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
        {selectedLT.breakers.map((b, i) => {
          const glowColor =
            b.status === "ON"
              ? "0 0 14px rgba(10, 120, 194, 0.5)"
              : "0 0 14px rgba(220, 4, 4, 0.5)";

          return (
            <div
              key={i}
              style={{
                background: "#111d2c",
                padding: "18px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: glowColor,
                transition: "0.3s ease"
              }}
            >
              {/* Breaker Name + Toggle */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "14px"
                }}
              >
                <h3 style={{ fontSize: "17px", fontWeight: 600 }}>{b.name}</h3>

                {/* TOGGLE */}
                <div
                  onClick={() => toggleBreaker(selectedLT.id, i)}
                  style={{
                    width: "40px",
                    height: "22px",
                    background: b.status === "ON" ? "#4db8ff" : "#999",
                    borderRadius: "20px",
                    position: "relative",
                    cursor: "pointer",
                    transition: "background 0.3s",
                    display: "flex",
                    alignItems: "center",
                    padding: "2px"
                  }}
                >
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      background: "white",
                      borderRadius: "50%",
                      transition: "transform 0.3s",
                      transform: b.status === "ON" ? "translateX(18px)" : "translateX(0)"
                    }}
                  ></div>
                </div>
              </div>

              {/* VOLTAGE + CURRENT BOXES */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "10px"
                }}
              >
                {/* Voltage Box */}
                <div
                  style={{
                    flex: 1,
                    background: "#0a1520",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 0 10px rgba(77,184,255,0.3)"
                  }}
                >
                  <p style={{ fontSize: "13px", opacity: 0.7 }}>Voltage</p>
                  <p style={{ fontSize: "18px", marginTop: "4px" }}>{b.voltage}</p>
                </div>

                {/* Current Box */}
                <div
                  style={{
                    flex: 1,
                    background: "#0a1520",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 0 10px rgba(62, 74, 243, 0.3)"
                  }}
                >
                  <p style={{ fontSize: "13px", opacity: 0.7 }}>Current</p>
                  <p style={{ fontSize: "18px", marginTop: "4px" }}>{b.current}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
