import Map, { Source, Layer } from "react-map-gl";
import type { CircleLayer } from "react-map-gl";
import type { FeatureCollection } from "geojson";
import "mapbox-gl/src/css/mapbox-gl.css";
import { useState } from "react";
import { MapData } from "../../types/APIDataTypes";
import mapboxgl from "mapbox-gl";
import { Link } from "react-router-dom";
// import { Icon } from "@justfixnyc/component-library";

const STYLE_SIGNATURE_LIGHT =
  "mapbox://styles/justfix/clxummt2k047a01qj3ra1gjf6";
// const STYLE_STABILIZING_NYC =
// "mapbox://styles/justfix/clxopp04602yz01qmg0w5dg6i";

type MapBoxProps = { data: MapData[] };

export const MapBox: React.FC<MapBoxProps> = ({ data }) => {
  const [cursor, setCursor] = useState("");
  const [selectedAddr, setSelectedAddr] = useState<MapData | null>(null);

  const onMouseEnter = (event: mapboxgl.MapLayerMouseEvent) => {
    if (event.features?.length) {
      setCursor("pointer");
    }
  };

  const onMouseLeave = () => {
    setCursor("");
  };

  const onClick = (event: mapboxgl.MapLayerMouseEvent) => {
    if (event.features?.length) {
      setSelectedAddr(event.features[0].properties as MapData);
    } else {
      setSelectedAddr(null);
    }
  };

  // Type error on "features" because bldg.lng and bldg.lat might be null
  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: data.map((bldg) => {
      return {
        type: "Feature",
        geometry: { type: "Point", coordinates: [bldg.lng, bldg.lat] },
        properties: {
          bbl: bldg.bbl,
          address: bldg.address,
          borough: bldg.borough,
          zip: bldg.zip,
          landlord: bldg.landlord,
          landlord_slug: bldg.landlord_slug,
          lender_slug: bldg.lender_slug,
          selected: bldg.bbl === selectedAddr?.bbl,
        },
      };
    }),
  };

  const layerStyle: CircleLayer = {
    id: "bbl",
    type: "circle",
    paint: {
      "circle-stroke-width": {
        stops: [
          [8, 0],
          [11, 0.25],
          [16, 2.5],
        ],
      },
      "circle-radius": {
        stops: [
          [8, 1],
          [11, 4],
          [16, 10],
        ],
      },
      "circle-color": {
        property: "selected",
        type: "categorical",
        default: "#4BC0C0",
        stops: [
          [true, "#EFB083"],
          [false, "#4BC0C0"],
        ],
      },
      "circle-opacity": {
        property: "selected",
        type: "categorical",
        default: 0.6,
        stops: [
          [true, 1],
          [false, 0.6],
        ],
      },
      "circle-stroke-color": {
        property: "selected",
        type: "categorical",
        default: "#4BC0C0",
        stops: [
          [true, "#EFB083"],
          [false, "#4BC0C0"],
        ],
      },
      "circle-stroke-opacity": {
        property: "selected",
        type: "categorical",
        default: 0.6,
        stops: [
          [true, 1],
          [false, 0.8],
        ],
      },
    },
  };
  return (
    <>
      {!!selectedAddr && (
        <div className="map-sidepane">
          <div className="building-address-row">
            <Link to={`/buildings?bbl=${selectedAddr.bbl}`}>
              {`${selectedAddr.address}, ${selectedAddr.borough.toUpperCase()}`}
            </Link>
            <button onClick={() => setSelectedAddr(null)}>
              X{/* <Icon icon="xmark" /> */}
            </button>
          </div>

          <div>
            Landlord:{" "}
            <Link to={`/landlords?landlord=${selectedAddr.landlord_slug}`}>
              {selectedAddr.landlord}
            </Link>
          </div>
          <div>
            Lender:{" "}
            <Link to={`/lenders?lender=${selectedAddr.lender_slug}`}>
              {selectedAddr.lender_slug == "cpc" ? "CPC" : "Santander"}
            </Link>
          </div>
          <div>Zip: {selectedAddr.zip}</div>
        </div>
      )}
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          bounds: [
            [-74.0802831, 40.6267844],
            [-73.8545909, 40.8667808],
          ],
          fitBoundsOptions: {
            padding: { top: 50, bottom: 50, left: 50, right: 50 },
            maxZoom: 10,
          },
        }}
        mapStyle={STYLE_SIGNATURE_LIGHT}
        cursor={cursor}
        interactiveLayerIds={["bbl"]}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </>
  );
};
