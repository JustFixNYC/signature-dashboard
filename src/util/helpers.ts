import {
  APIChartData,
  BuildingInfo,
  CollectionInfo,
  Indicators,
  IndicatorsTimeSpan,
  LandlordInfo,
} from "../types/APIDataTypes";
import { INDICATOR_STRINGS } from "./indicators";

export function splitBBL(bbl: string) {
  const bblArr = bbl.split("");
  const boro = bblArr.slice(0, 1).join("");
  const block = bblArr.slice(1, 6).join("");
  const lot = bblArr.slice(6, 10).join("");
  return { boro, block, lot };
}

export function formatMoney(amount: number): string {
  if (typeof amount !== "number") {
    return amount;
  }
  const formatmoney = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  return formatmoney.format(amount);
}

export const formatPercent = (value: number) => {
  if (typeof value !== "number") {
    return value;
  }
  return value.toFixed(0) + "%";
};

export const formatNumber = (value: number) => {
  if (typeof value !== "number") {
    return value;
  }
  return new Intl.NumberFormat("en").format(value);
};

export const formatNumberNoComma = (value: number) => {
  if (typeof value !== "number") {
    return value;
  }
  return value.toString();
};

export const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export type yearlyChartData = {
  [x in keyof Omit<APIChartData, "month">]: number;
} & {
  year: string;
};
/** Returns grouped data to match selected time span */
export const groupData = (
  dataArray: APIChartData[],
  apiKey: keyof Omit<APIChartData, "month">,
  timeSpan: IndicatorsTimeSpan
) => {
  // if (dataArray && timeSpan === "quarter") {
  // const dataByQuarter = [];
  // for (let i = 2; i < dataArray.length; i = i + 3) {
  //   const sumQuarter = dataArray[i] + dataArray[i - 1] + dataArray[i - 2];
  //   dataByQuarter.push(sumQuarter);
  // }
  // return dataByQuarter;
  // } else
  if (timeSpan === "year") {
    const dataByYear = [];
    for (let i = 11; i < dataArray.length; i = i + 12) {
      const chartData = dataArray[i];
      const year = new Date(chartData.month).getFullYear().toString();
      const sumYear = dataArray
        .slice(i - 11, i + 1)
        .reduce((total, chartData) => total + chartData[apiKey], 0);
      dataByYear.push({ year: year, [apiKey]: sumYear });
    }
    return dataByYear;
  } else {
    return dataArray;
  }
};

export type apiKeys =
  | keyof BuildingInfo
  | keyof CollectionInfo
  | keyof Indicators
  | keyof LandlordInfo;

export const getColumnHeader = (apiKey: apiKeys) => {
  const indicator = INDICATOR_STRINGS[apiKey];
  if (indicator) {
    return indicator.short_name ? indicator.short_name : indicator.name;
  } else {
    return apiKey;
  }
};

export const round = (value: number) => {
  if (typeof value !== "number") {
    return value;
  }
  return value.toFixed(2);
};

export const showYesNo = (value: boolean) => {
  if (value === true) {
    return "yes";
  } else if (value === false) {
    return "no";
  }
};

export const slugify = (text: string) => {
  // https://gist.github.com/codeguy/6684588?permalink_comment_id=4325476#gistcomment-4325476
  return text
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/_/g, "-") // Replace _ with -
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/-$/g, ""); // Remove trailing -
};
