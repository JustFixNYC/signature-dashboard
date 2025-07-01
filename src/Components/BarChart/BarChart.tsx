// @ts-nocheck
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  TimeScale,
  TooltipItem,
  ChartDataset,
} from "chart.js";
import "chartjs-adapter-luxon";
import annotationPlugin from "chartjs-plugin-annotation";
import { Bar } from "react-chartjs-2";
import classNames from "classnames";
import { useId, useState } from "react";
import { RadioButton } from "@justfixnyc/component-library";
import { formatDate } from "../../util/helpers";
import { IndicatorsTimeSpan } from "../../types/APIDataTypes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  annotationPlugin,
);

const twoYearsAgo = new Date();
twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

export type BarChartDataset = ChartDataset<"bar", { x?: string; y?: number }[]>;
export type BarChartProps = {
  datasets: BarChartDataset[];
  title: React.ReactNode;
  note: React.ReactNode;
  originationDate?: string;
  lastSaleDate?: string;
  yAxisTitle: string;
  className?: string;
  stacked?: boolean;
  timeUnit?: IndicatorsTimeSpan;
  xAxisStartDate?: Date;
};

const getTooltipDate = (value: string, timeUnit: IndicatorsTimeSpan) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
  };

  if (timeUnit === "month") {
    options.month = "long";
  }

  const formattedDate = new Date(value).toLocaleDateString("en", options);
  return formattedDate;
};

const getXTickLabel = (value: number, timeUnit: IndicatorsTimeSpan) => {
  const date = new Date(value);
  if (timeUnit === "year") {
    return date.getFullYear();
  } else {
    const month = date.toLocaleDateString("en", { month: "short" });
    return (date.getMonth() === 0 ? date.getFullYear() + "  " : "") + month;
  }
};

export const BarChart: React.FC<BarChartProps> = ({
  datasets,
  title,
  note,
  originationDate,
  lastSaleDate,
  stacked,
  yAxisTitle,
  timeUnit = "month",
  xAxisStartDate,
  className,
}) => {
  const [timespan, setTimespan] = useState<"two-years" | "all-time">(
    timeUnit !== "year" ? "two-years" : "all-time",
  );
  const radioID = useId();

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          title: (context: TooltipItem<"bar">[]) => {
            return getTooltipDate(context[0].label, timeUnit);
          },
          footer: (context: TooltipItem<"bar">[]) => {
            let total = 0;
            context.forEach((context) => {
              // in cace the y value is null or undefined
              const value = context.raw.y || 0;
              total += value;
            });
            return "Total: " + total;
          },
        },
      },
      legend: {
        labels: {
          font: {
            family: "Degular",
            size: 14,
          },
        },
        position: "bottom" as const,
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            display: !!originationDate,
            xMin: originationDate,
            xMax: originationDate,
            borderColor: "black",
            borderWidth: 2,
            label: {
              display: true,
              content: `Origination: ${originationDate && formatDate(originationDate)}`,
              font: {
                family: "Degular",
                size: 14,
              },
              padding: 10,
              backgroundColor: "rgb(68, 77, 93)",
              position: "center",
              borderRadius: 0,
              z: 10,
            },
          },
          line2: {
            type: "line",
            display: !!lastSaleDate,
            xMin: lastSaleDate,
            xMax: lastSaleDate,
            borderColor: "black",
            borderWidth: 2,
            label: {
              display: true,
              content: `Sold: ${lastSaleDate && formatDate(lastSaleDate)}`,
              font: {
                family: "Degular",
                size: 14,
              },
              padding: 10,
              backgroundColor: "rgb(68, 77, 93)",
              position: "end",
              borderRadius: 0,
              z: 10,
            },
          },
        },
      },
    },
    interaction: {
      mode: "index" as const,
    },
    scales: {
      x: {
        stacked: stacked,
        type: "time",
        min: timespan === "two-years" ? twoYearsAgo : xAxisStartDate || null,
        autoSkip: false,
        time: {
          unit: timeUnit,
        },
        ticks: {
          font: {
            family: "Degular",
            size: 13,
          },
          callback: function (value: number) {
            return getXTickLabel(value, timeUnit);
          },
        },
      },
      y: {
        stacked: stacked,
        title: {
          display: !!yAxisTitle,
          text: yAxisTitle,
          font: {
            family: "Degular",
            size: 16,
          },
        },
        ticks: {
          font: {
            family: "Degular",
            size: 13,
          },
        },
      },
    },

    maintainAspectRatio: false,
  };

  const classes = classNames("chart-container", className);

  return (
    <div className="chart__card card">
      {title}
      {note}
      <div className="chart__timespan_filter">
        <RadioButton
          name={`b-and-c-timespan-${radioID}`}
          labelText="Past 2 years"
          id={`radio-two-years-${radioID}`}
          value="two-years"
          checked={timespan === "two-years"}
          onChange={() => setTimespan("two-years")}
        />
        <RadioButton
          name={`b-and-c-timespan-${radioID}`}
          labelText="All time"
          id={`radio-all-time-${radioID}`}
          value="all-time"
          checked={timespan === "all-time"}
          onChange={() => setTimespan("all-time")}
        />
      </div>
      <div className={classes} style={{ position: "relative" }}>
        <Bar options={options} data={{ datasets }} height={300}></Bar>
      </div>
    </div>
  );
};
