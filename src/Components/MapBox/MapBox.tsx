import React, { useId, useState } from "react";
import Map, { Source, Layer, NavigationControl } from "react-map-gl";
import type { CircleLayer, LngLatBoundsLike } from "react-map-gl";
import type { FeatureCollection } from "geojson";
import classNames from "classnames";
import mapboxgl from "mapbox-gl";
import { Link } from "react-router-dom";
import "mapbox-gl/src/css/mapbox-gl.css";
import { MapData } from "../../types/APIDataTypes";
import { Button, RadioButton } from "@justfixnyc/component-library";
import "./style.scss";
import { useAuth } from "../../auth";

const STABILIZING_USERS = ["user-stabilizingnyc", "user-staff"];

const STYLE_SIGNATURE_LIGHT =
  "mapbox://styles/justfix/clxummt2k047a01qj3ra1gjf6";
const STYLE_STABILIZING_NYC =
  "mapbox://styles/justfix/clyrhqh8802he01qjb8jn66mw";

const COLOR_UNSELECTED_DEFAULT = "#43B19F";
const COLOR_SELECTED_DEFAULT = "#AF59A0";

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

const LAYER_STYLE_DEFAULT: CircleLayer = {
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
      default: COLOR_UNSELECTED_DEFAULT,
      stops: [
        [true, COLOR_SELECTED_DEFAULT],
        [false, COLOR_UNSELECTED_DEFAULT],
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
      default: COLOR_UNSELECTED_DEFAULT,
      stops: [
        [true, COLOR_SELECTED_DEFAULT],
        [false, COLOR_UNSELECTED_DEFAULT],
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

const LAYER_STYLE_STABILIZING: CircleLayer = {
  ...LAYER_STYLE_DEFAULT,
  paint: {
    ...LAYER_STYLE_DEFAULT.paint,
    "circle-stroke-color": "#FFF",
  },
};

type MapBoxProps = {
  data: MapData[];
  initialSelectedBBL?: string;
  preventScrollZoom?: boolean;
  className?: string;
};

export const MapBox: React.FC<MapBoxProps> = ({
  data,
  initialSelectedBBL,
  preventScrollZoom = false,
  className,
}) => {
  const { user } = useAuth();
  const [cursor, setCursor] = useState("");
  const [mapStyle, setMapStyle] = useState("default");

  const showStabilizingToggle = STABILIZING_USERS.includes(user);

  const layerStyle =
    mapStyle === "stabilizing" ? LAYER_STYLE_STABILIZING : LAYER_STYLE_DEFAULT;

  const initialSelected =
    data.find((x) => x.bbl === initialSelectedBBL) || null;

  const [selectedAddr, setSelectedAddr] = useState<MapData | null>(
    initialSelected
  );

  const radioID = useId();

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
          loan_pool_slug: bldg.loan_pool_slug,
          selected: bldg.bbl === selectedAddr?.bbl,
        },
      };
    }),
  };

  return (
    <>
      <div
        className={classNames(
          "map-style-radios",
          !showStabilizingToggle && "map-type-radios-hidden"
        )}
      >
        <RadioButton
          name={`default-style-${radioID}`}
          labelText="Default"
          id={`radio-default-${radioID}`}
          value="default"
          checked={mapStyle === "default"}
          onChange={() => setMapStyle("default")}
        />
        <RadioButton
          name={`stabilzing-style-${radioID}`}
          labelText="Stabilizing NYC"
          id={`radio-stabilizing-${radioID}`}
          value="stabilizing"
          checked={mapStyle === "stabilizing"}
          onChange={() => setMapStyle("stabilizing")}
        />
      </div>
      <div
        className={classNames(
          "map-container",
          !showStabilizingToggle && "map-type-radios-hidden",
          className
        )}
      >
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
          initialViewState={
            selectedInitialViewState || DEFAULT_INITIAL_VIEW_STATE
          }
          mapStyle={
            mapStyle === "stabilizing"
              ? STYLE_STABILIZING_NYC
              : STYLE_SIGNATURE_LIGHT
          }
          cursor={cursor}
          interactiveLayerIds={["bbl"]}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          minZoom={10}
          // prevent scroll zoom, allows cmd+scroll and pinch zoom
          cooperativeGestures={preventScrollZoom}
        >
          <NavigationControl showCompass={false} visualizePitch={false} />
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
        {!!selectedAddr && (
          <div className="map-sidepane">
            <div className="building-address-row">
              <Link to={`/buildings?bbl=${selectedAddr.bbl}`}>
                {`${selectedAddr.address}, ${selectedAddr.borough.toUpperCase()}`}
              </Link>
              <Button
                iconOnly
                labelText="Clsoe"
                labelIcon="xmark"
                variant="tertiary"
                size="small"
                onClick={() => setSelectedAddr(null)}
              />
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
              <span className="label-name">Loan pool:</span>{" "}
              <Link to={`/loan-pools?loan-pool=${selectedAddr.loan_pool_slug}`}>
                {selectedAddr.loan_pool_slug == "cpc" ? "CPC" : "Santander"}
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
