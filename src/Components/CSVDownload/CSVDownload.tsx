import React from "react";
import { Icon, Link } from "@justfixnyc/component-library";
import "./styles.scss";
import { BuildingInfo, CollectionInfo } from "../../types/APIDataTypes";
import { apiKeys, slugify } from "../../util/helpers";
import { INDICATOR_STRINGS } from "../../util/indicators";
import { useCSVDownloader } from "react-papaparse";
import { gtmPush } from "../../google-tag-manager";
import { useAuth } from "../../auth";
import { useLocation } from "react-router-dom";

export const generateBuildingCSV = (data: BuildingInfo) => {
  const api_keys = Object.keys(data);
  const values = Object.values(data);
  const indicator_names = api_keys.map(
    (x) => INDICATOR_STRINGS[x as apiKeys]?.name || "",
  );

  const csvData = [];
  csvData.push(["name", "key", "value"]);
  [...Array(values.length).keys()].forEach((i) => {
    if (["loan_pool_slug", "landlord_slug"].includes(api_keys[i])) return;
    csvData.push([api_keys[i], indicator_names[i], values[i]]);
  });

  const base_url = window.location.host;
  csvData.push([
    "link_loan_pool",
    "",
    "",
    `${base_url}/loan-pools?loan-pool=${data.loan_pool_slug}`,
  ]);
  csvData.push([
    "link_landlord",
    "",
    "",
    `${base_url}/landlords?landlord=${data.landlord_slug}`,
  ]);

  return csvData;
};

export const generateMultiBuildingCSV = (data: CollectionInfo) => {
  const bldgData = data.bldg_data;
  // get all the building data var names in order of the helper object to reorder csv columns
  const api_keys = Object.keys(INDICATOR_STRINGS).filter((x) =>
    Object.keys(bldgData[0]).includes(x),
  ) as Array<keyof BuildingInfo>;
  const indicator_names = api_keys.map((x) => INDICATOR_STRINGS[x]?.name || "");

  const csvData = [];
  csvData.push(indicator_names);
  csvData.push(api_keys);
  [...Array(bldgData.length).keys()].forEach((i) => {
    const row = api_keys.map((x) => bldgData[i][x]);
    csvData.push(row);
  });

  return csvData;
};

type DownloadProps = {
  csvData: string[][] | undefined;
  nameForFile: string;
  labelText: string;
};

export const DownloadCSV: React.FC<DownloadProps> = ({
  csvData,
  nameForFile,
  labelText,
}) => {
  const { CSVDownloader } = useCSVDownloader();
  const { user } = useAuth();
  const location = useLocation();

  const fromPage =
    location.pathname !== "/buildings"
      ? location.pathname
      : location.search.startsWith("?bbl=")
        ? "building"
        : "all-buildings";

  const today = new Date(Date.now()).toISOString().slice(0, 10);

  return csvData ? (
    <CSVDownloader
      className="jfcl-link"
      filename={`signature_${nameForFile}_${today}`}
      bom={true}
      config={{
        delimiter: ",",
      }}
      data={csvData}
    >
      <button
        className="download-button"
        onClick={() =>
          gtmPush("sig_download", { user_type: user, from: fromPage })
        }
      >
        <Icon icon="download" type="regular" />
        {labelText}
      </button>
    </CSVDownloader>
  ) : (
    <Link className="disabled">
      <Icon icon="download" type="regular" />
      {labelText}
    </Link>
  );
};

export const DownloadBuildingCSV: React.FC<{
  data: BuildingInfo | undefined;
  labelText: string;
}> = ({ data, labelText }) => (
  <DownloadCSV
    nameForFile={data ? slugify(data.address) : ""}
    csvData={data && generateBuildingCSV(data)}
    labelText={labelText}
  />
);

export const DownloadMultiBuildingCSV: React.FC<{
  data: CollectionInfo | undefined;
  labelText: string;
}> = ({ data, labelText }) => (
  <DownloadCSV
    nameForFile={data ? data.collection_slug : ""}
    csvData={data && generateMultiBuildingCSV(data)}
    labelText={labelText}
  />
);
