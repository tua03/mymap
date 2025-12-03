import MapComponent from "./MapComponent";
import Header from "./Header";

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>

      {/* FIXED HEADER */}
      <Header
        stats={{
          substations: 1,
          ltHouses: 7,
          ltLines: 3,
          online: 5,
          warnings: 2,
          faults: 1
        }}
      />

      {/* MAP WRAPPER with padding so header won’t overlap */}
      <div style={{ paddingTop: "110px", height: "100%", width: "100%" }}>
        <MapComponent />
      </div>

    </div>
  );
}
