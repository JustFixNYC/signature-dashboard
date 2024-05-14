import Map, { Source, Layer } from "react-map-gl";
import type { CircleLayer } from "react-map-gl";
import type { FeatureCollection } from "geojson";
import { useSearchForBBL } from "../../api/hooks";
import { useSearchParams } from "react-router-dom";
import "mapbox-gl/src/css/mapbox-gl.css";
import { useState } from "react";
import { AddressRecord } from "../../types/APIDataTypes";

export const MapBox: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bbl = searchParams.get("bbl") || "";

  const { data } = useSearchForBBL(bbl);
  const [cursor, setCursor] = useState("");
  const [selectedAddr, setSelectedAddr] = useState<AddressRecord | null>(null);
  const [hoveredAddr, sethoveredAddr] = useState<AddressRecord | null>(null);

  const onMouseEnter = (event) => {
    if (event.features?.length) {
      setCursor("pointer");
      sethoveredAddr(event.features[0].properties);
    }
  };

  const onMouseLeave = (event) => {
    setCursor("");
    sethoveredAddr(null);
  };

  const onClick = (event) => {
    if (event.features?.length) {
      setSelectedAddr(event.features[0].properties);
    }
  };

  // Type error on "features" because addr.lng and addr.lat might be null
  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: data?.addrs.map((addr) => {
      return {
        type: "Feature",
        geometry: { type: "Point", coordinates: [addr.lng, addr.lat] },
        properties: {
          housenumber: addr.housenumber,
          streetname: addr.streetname,
          zip: addr.zip,
        },
      };
    }),
  };

  const layerStyle: CircleLayer = {
    id: "addresses",
    type: "circle",
    paint: {
      "circle-stroke-width": 1.25,
      "circle-radius": 8,
      "circle-color": "#FF9800",
      "circle-opacity": 0.8,
      "circle-stroke-color": "#000000",
    },
  };
  return (
    <>
      MapBox Page
      <Map
        mapboxAccessToken="pk.eyJ1Ijoic3RldmUxbnljIiwiYSI6ImNqOG84N2V1eTAwajkyd25udTRvbjVnMDkifQ.kJFmnCbpj4X0m5QYYydcUQ"
        initialViewState={{
          bounds: [
            [-74.0802831, 40.6267844],
            [-73.8545909, 40.8667808],
          ],
          fitBoundsOptions: {
            padding: { top: 50, bottom: 50, left: 50, right: 50 },
            maxZoom: 20,
          },
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{ width: 600, height: 400 }}
        cursor={cursor}
        interactiveLayerIds={["addresses"]}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
      {hoveredAddr && (
        <div>
          Hover Address: {hoveredAddr.housenumber} {hoveredAddr.streetname}{" "}
          {hoveredAddr.zip}
        </div>
      )}
      {selectedAddr && (
        <div>
          Selecterd Address: {selectedAddr.housenumber}{" "}
          {selectedAddr.streetname} {selectedAddr.zip}
        </div>
      )}
    </>
  );
};
