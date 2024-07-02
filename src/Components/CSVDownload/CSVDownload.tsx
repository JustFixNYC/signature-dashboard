import React from "react";
import { Icon } from "@justfixnyc/component-library";
import "./styles.scss";
import { BuildingInfo, CollectionInfo } from "../../types/APIDataTypes";
import { INDICATOR_STRINGS, apiKeys, slugify } from "../../util/helpers";
import { useCSVDownloader } from "react-papaparse";

export const generateBuildingCSV = (data: BuildingInfo) => {
  const api_keys = Object.keys(data);
  const values = Object.values(data);
  const indicator_names = api_keys.map(
    (x) => INDICATOR_STRINGS[x as apiKeys]?.name || ""
  );
  const descriptions = api_keys.map(
    (x) => INDICATOR_STRINGS[x as apiKeys]?.description || ""
  );

  const csvData = [];
  csvData.push(["name", "key", "description", "value"]);
  [...Array(values.length).keys()].forEach((i) => {
    if (["lender_slug", "landlord_slug"].includes(api_keys[i])) return;
    csvData.push([api_keys[i], indicator_names[i], descriptions[i], values[i]]);
  });

  const base_url = window.location.host;
  csvData.push([
    "link_lender",
    "",
    "",
    `${base_url}/lenders?lender=${data.lender_slug}`,
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
    Object.keys(bldgData[0]).includes(x)
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
  csvData: string[][];
  nameForFile: string;
  labelText: string;
};

export const DownloadCSV: React.FC<DownloadProps> = ({
  csvData,
  nameForFile,
  labelText,
}) => {
  const { CSVDownloader, Type } = useCSVDownloader();

  const today = new Date(Date.now()).toISOString().slice(0, 10);

  return (
    <CSVDownloader
      type={Type.Link}
      className="jfcl-link"
      filename={`signature_${nameForFile}_${today}`}
      bom={true}
      config={{
        delimiter: ",",
      }}
      data={csvData}
    >
      <Icon icon="download" className="" />
      {labelText}
    </CSVDownloader>
  );
};

export const DownloadBuildingCSV: React.FC<{
  data: BuildingInfo;
  labelText: string;
}> = ({ data, labelText }) => (
  <DownloadCSV
    nameForFile={slugify(data.address)}
    csvData={generateBuildingCSV(data)}
    labelText={labelText}
  />
);

export const DownloadMultiBuildingCSV: React.FC<{
  data: CollectionInfo;
  labelText: string;
}> = ({ data, labelText }) => (
  <DownloadCSV
    nameForFile={data.collection_slug}
    csvData={generateMultiBuildingCSV(data)}
    labelText={labelText}
  />
);
