import { Fragment, useEffect, useState, useMemo } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import InfoPanel from "./InfoPanel";

function MapContent() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);
  return null;
}

export default function MapComponent() {

  // CHECK CLIENT
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  function toggleBreaker(ltId, breakerIndex) {

    setLtNodes(prev =>
      prev.map(lt => {
        if (lt.id !== ltId) return lt;

        return {
          ...lt,
          breakers: lt.breakers.map((b, i) => {
            if (i === breakerIndex) {
              return { ...b, status: b.status === "ON" ? "OFF" : "ON" };
            }
            return b;
          })
        };
      })
    );

    setSelectedLT(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        breakers: prev.breakers.map((b, i) => {
          if (i === breakerIndex) {
            return { ...b, status: b.status === "ON" ? "OFF" : "ON" };
          }
          return b;
        })
      };
    });
  }


  // FIX LEAFLET ICONS SAFELY (client only)
  useEffect(() => {
    if (!isClient) return;
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
  }, [isClient]);


  // PANEL STATE
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedLT, setSelectedLT] = useState(null);


  // SUBSTATION ICON
  const substationIcon = useMemo(() => {
    if (!isClient) return null;
    return L.divIcon({
      className: 'substation-icon',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      html: '<div class="substation-icon__box">SS</div>',
    });
  }, [isClient]);


  // LT ICON
  const ltIcon = useMemo(() => {
    if (!isClient) return null;
    return L.divIcon({
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      html: `
        <div class="bg-yellow-400 border-2 border-yellow-600 text-black font-bold
                    w-[16px] h-[16px] flex items-center justify-center rounded-md shadow-md">
          LT
        </div>
      `,
    });
  }, [isClient]);


  // SUBSTATION POSITION
  const substationPosition = [10.8505, 76.2711];


  // LT BOXES (manual)
  const [ltNodes, setLtNodes] = useState(() => {

    const manualLTPositions = {
      "LT-1": [10.9784, 76.3341],
      "LT-2": [10.9055, 76.4382],
      "LT-3": [10.7122, 76.3470],
      "LT-4": [10.6891, 76.2015],
      "LT-5": [10.7834, 76.1038],
      "LT-6": [10.9302, 76.1299],
    };

    return Array.from({ length: 6 }, (_, i) => {
      const id = `LT-${i + 1}`;
      return {
        id,
        name: id,
        position: manualLTPositions[id],
        breakers: [
          { name: `CB-${i + 1}-1`, voltage: "11 kV", current: "140 A", status: "ON" },
          { name: `CB-${i + 1}-2`, voltage: "13 kV", current: "160 A", status: "ON" },
          { name: `CB-${i + 1}-3`, voltage: "15 kV", current: "180 A", status: "ON" }
        ]
      };
    });

  });


  // FIXED MANUAL DOTS
  const manualLTDots = {
  "LT-1": {
    0: [
      [10.9920, 76.3450],
      [11.0050, 76.3600],
      [11.0180, 76.3750],
      [11.0305, 76.3922],
      [11.0450, 76.4100],
    ],
    
  1: [
    [10.9790, 76.3150],  // near west
    [10.9805, 76.2900],  // deeper west
    [10.9820, 76.2600],  // far west
    [10.9840, 76.2250],  // very far west
    [10.9865, 76.1850],  // extreme west spread
  ]
,

  2: [
    [11.0000, 76.3300],
    [11.0200, 76.3350],
    [11.0400, 76.3400],
    [11.0600, 76.3450],
    [11.0800, 76.3500],
  ]
  },

  "LT-2": {
    0: [
      [10.9300, 76.4600],
      [10.9470, 76.4850],
      [10.9630, 76.5100],
      [10.9805, 76.5350],
      [10.9980, 76.5600],
    ],
     1: [
    [10.9100, 76.4600],
    [10.9200, 76.4800],
    [10.9300, 76.5000],
    [10.9400, 76.5200],
    [10.9500, 76.5400],
  ],
    2: [
      [10.9000, 76.4500],
      [10.8850, 76.4650],
      [10.8700, 76.4780],
      [10.8550, 76.4920],
      [10.8400, 76.5050],
    ],
  },

  "LT-3": {
    0: [
  [10.7125, 76.3600],
  [10.7128, 76.3750],
  [10.7132, 76.3900],
  [10.7138, 76.4050],
  [10.7145, 76.4200],
],
     1: [
    [10.7000, 76.3650],
    [10.6850, 76.3800],
    [10.6700, 76.3950],
    [10.6550, 76.4100],
    [10.6400, 76.4250],
  ],
    2: [
      [10.7000, 76.3550],
      [10.6830, 76.3500],
      [10.6660, 76.3450],
      [10.6490, 76.3400],
      [10.6320, 76.3350],
    ],
  },

  "LT-4": {
    0: [
      [10.6750, 76.2250],
      [10.6550, 76.2400],
      [10.6350, 76.2550],
      [10.6150, 76.2700],
      [10.5950, 76.2850],
    ],
    1: [
    [10.6700, 76.1500],
    [10.6550, 76.1350],
    [10.6400, 76.1200],
    [10.6250, 76.1050],
    [10.6100, 76.0900],
  ],
    2: [
      [10.6800, 76.2000],
      [10.6600, 76.1900],
      [10.6400, 76.1800],
      [10.6200, 76.1700],
      [10.6000, 76.1600],
    ],
  },

  "LT-5": {
  0: [
    [10.7800, 76.0600],
    [10.7700, 76.0400],
    [10.7600, 76.0200],
    [10.7500, 76.0000],
    [10.7400, 75.9800],
  ],
  1: [
    [10.8000, 76.0800],
    [10.8150, 76.0650],
    [10.8300, 76.0500],
    [10.8450, 76.0350],
  ],
  2: [
    [10.7600, 76.0850],
    [10.7450, 76.0700],
    [10.7300, 76.0550],
    [10.7150, 76.0400],
    [10.7000, 76.0250],
  ]
}
,

"LT-6": {
  0: [
    [10.9500, 76.1100],
    [10.9650, 76.0900],
    [10.9800, 76.0700],
    [11.0000, 76.0500],
    [11.0200, 76.0300],
  ],
  1: [
    [10.9050, 76.0800],
    [10.8900, 76.0600],
    [10.8750, 76.0400],
    [10.8600, 76.0200],
    [10.8450, 76.0000],
  ],
  2: [
    [10.9550, 76.1300],   // slight north
    [10.9750, 76.1295],   // more north
    [10.9950, 76.1290],   // straight north
    [11.0150, 76.1285],   // deep north
    [11.0350, 76.1280],   // very far north
  ]
}

};


  // CONNECT BRANCHES FROM LT TO LAST DOT
  const ltBranchLines = useMemo(() => {
    const segments = [];

    ltNodes.forEach((node) => {
      const [lat, lng] = node.position;

      for (let b = 0; b < 3; b++) {
        const dots = manualLTDots[node.id]?.[b] || [];
        const finalPoint = dots.length ? dots[dots.length - 1] : [lat, lng];

        segments.push({
          key: `${node.id}-${b}`,
          ltId: node.id,
          breakerIndex: b,
          positions: [[lat, lng], ...dots],
          dots,
        });
      }
    });

    return segments;
  }, [ltNodes]);


  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", backgroundColor: "#020617" }}>

      <div style={{ flex: 1, position: "relative" }}>
        {isClient ? (
          <MapContainer
            center={[10.8505, 76.2711]}
            zoom={10}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
          >
            <MapContent />

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            <Marker position={substationPosition} icon={substationIcon}>
              <Popup>Substation</Popup>
            </Marker>

            {ltNodes.map((node) => (
              <Fragment key={node.id}>
                <Marker
                  position={node.position}
                  icon={ltIcon}
                  eventHandlers={{
                    click: () => {
                      setSelectedLT(node);
                      setPanelOpen(true);
                    }
                  }}
                >
                  <Popup>{node.id}</Popup>
                </Marker>

                <Polyline
                  positions={[substationPosition, node.position]}
                  pathOptions={{ color: "#198754", weight: 3 }}
                />
              </Fragment>
            ))}

            {ltBranchLines.map((s) => {
              const lt = ltNodes.find(n => n.id === s.ltId);
              const breakerStatus = lt.breakers[s.breakerIndex].status;

              return (
                <Fragment key={s.key}>
                  <Polyline
                    positions={s.positions}
                    pathOptions={{
                      color: breakerStatus === "ON" ? "#4db8ff" : "red",
                      weight: 2
                    }}
                  />

                  {s.dots.map((dot, idx) => (
                    <CircleMarker
                      key={idx}
                      center={dot}
                      radius={3}
                      pathOptions={{
                        color: breakerStatus === "ON" ? "#0d6efd" : "red",
                        fillColor: "#fff",
                        fillOpacity: 0.9
                      }}
                    />
                  ))}
                </Fragment>
              );
            })}

          </MapContainer>
        ) : (
          <div>Loading map…</div>
        )}
      </div>

      <InfoPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        selectedLT={selectedLT}
        toggleBreaker={toggleBreaker}
      />
    </div>
  );
}
