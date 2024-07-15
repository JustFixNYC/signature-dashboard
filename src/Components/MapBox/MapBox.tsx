import Map, { Source, Layer, NavigationControl } from "react-map-gl";
import type { CircleLayer, LngLatBoundsLike } from "react-map-gl";
import type { FeatureCollection } from "geojson";
import "mapbox-gl/src/css/mapbox-gl.css";
import React, { useState } from "react";
import { MapData } from "../../types/APIDataTypes";
import mapboxgl from "mapbox-gl";
import { Link } from "react-router-dom";
import { Icon } from "@justfixnyc/component-library";

const STYLE_SIGNATURE_LIGHT =
  "mapbox://styles/justfix/clxummt2k047a01qj3ra1gjf6";

const DEFAULT_COLOR = "#43B19F";
const SELECTED_COLOR = "#AF59A0";

const DEFAULT_BOUNDS: LngLatBoundsLike = [
  [-74.43542435256518, 40.56005960547242],
  [-73.50284564953185, 40.91593904663844],
];

const DEFAULT_INITIAL_VIEW_STATE = {
  bounds: DEFAULT_BOUNDS,
  fitBoundsOptions: {
    padding: { top: 40, bottom: 40, left: 40, right: 40 },
    maxZoom: 11,
  },
};

const LAYER_STYLE: CircleLayer = {
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
      default: DEFAULT_COLOR,
      stops: [
        [true, SELECTED_COLOR],
        [false, DEFAULT_COLOR],
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
      default: DEFAULT_COLOR,
      stops: [
        [true, SELECTED_COLOR],
        [false, DEFAULT_COLOR],
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

type MapBoxProps = {
  data: MapData[];
  initialSelectedBBL?: string;
};

export const MapBox: React.FC<MapBoxProps> = ({ data, initialSelectedBBL }) => {
  const [cursor, setCursor] = useState("");

  const initialSelected =
    data.find((x) => x.bbl === initialSelectedBBL) || null;

  const [selectedAddr, setSelectedAddr] = useState<MapData | null>(
    initialSelected
  );

  const selectedInitialViewState = initialSelected && {
    latitude: initialSelected.lat,
    longitude: initialSelected.lng,
    zoom: 13,
  };

  const onMouseEnter = (event: mapboxgl.MapLayerMouseEvent) => {
    if (event.features?.length) {
      setCursor("pointer");
    }
  };

  const onMouseLeave = () => {
    setCursor("");
  };

  const onClick = (event: mapboxgl.MapLayerMouseEvent) => {
    if (!event.features) return;

    const mapPoint = event.features[0]?.properties as MapData;
    setSelectedAddr(mapPoint);
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

  return (
    <>
      <div className="map-container">
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
          initialViewState={
            selectedInitialViewState || DEFAULT_INITIAL_VIEW_STATE
          }
          mapStyle={STYLE_SIGNATURE_LIGHT}
          cursor={cursor}
          interactiveLayerIds={["bbl"]}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          minZoom={10}
        >
          <NavigationControl showCompass={false} visualizePitch={false} />
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...LAYER_STYLE} />
          </Source>
        </Map>
        {!!selectedAddr && (
          <div className="map-sidepane">
            <div className="building-address-row">
              <Link to={`/buildings?bbl=${selectedAddr.bbl}`}>
                {`${selectedAddr.address}, ${selectedAddr.borough.toUpperCase()}`}
              </Link>
              <button onClick={() => setSelectedAddr(null)}>
                <Icon icon="xmark" />
              </button>
            </div>

            <div>
              <span className="label-name">Landlord:</span>{" "}
              {selectedAddr.landlord ? (
                <Link to={`/landlords?landlord=${selectedAddr.landlord_slug}`}>
                  {selectedAddr.landlord}
                </Link>
              ) : (
                <span className="not-available">Not available</span>
              )}
            </div>
            <div>
              <span className="label-name">Lender:</span>{" "}
              <Link to={`/lenders?lender=${selectedAddr.lender_slug}`}>
                {selectedAddr.lender_slug == "cpc" ? "CPC" : "Santander"}
              </Link>
            </div>
            <div>
              <span className="label-name">Zip:</span> {selectedAddr.zip}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
