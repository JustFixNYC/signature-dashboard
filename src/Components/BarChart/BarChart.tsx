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

type BuildingBAndCChartProps = {
  datasets: ChartDataset<"bar", { x?: string; y?: number }[]>[];
  origination_date: string;
  last_sale_date: string;
  yAxisTitle: string;
  className?: string;
};

export const BarChart: React.FC<BuildingBAndCChartProps> = ({
  datasets,
  origination_date,
  last_sale_date,
  yAxisTitle,
  className,
}) => {
  const [timespan, setTimespan] = useState<"two-years" | "all-time">(
    "two-years",
  );
  const radioID = useId();

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          title: (context: TooltipItem<"bar">[]) => {
            const date = new Date(context[0].label).toLocaleDateString("en", {
              year: "numeric",
              month: "long",
            });
            return date;
          },
          footer: (context: TooltipItem<"bar">[]) => {
            let total = 0;
            context.forEach((context) => {
              total += context.raw.y;
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
            display: !!origination_date,
            xMin: origination_date,
            xMax: origination_date,
            borderColor: "black",
            borderWidth: 2,
            label: {
              display: true,
              content:
                "Origination: " +
                new Date(origination_date).toLocaleDateString("en", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }),
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
            display: !!last_sale_date,
            xMin: last_sale_date,
            xMax: last_sale_date,
            borderColor: "black",
            borderWidth: 2,
            label: {
              display: true,
              content:
                "Sold: " +
                new Date(last_sale_date).toLocaleDateString("en", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }),
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
        stacked: true,
        type: "time",
        min: timespan === "two-years" ? twoYearsAgo : null,
        autoSkip: false,
        time: {
          unit: "month",
        },
        ticks: {
          font: {
            family: "Degular",
            size: 13,
          },
          callback: function (value: string | number) {
            const fullDate: string = this.getLabelForValue(value); // Make date value include a day so it can be parsed
            const date = new Date(fullDate);
            const month = date.toLocaleDateString("en", { month: "short" });
            return (
              (date.getMonth() === 0 ? date.getFullYear() + "  " : "") + month
            );
          },
        },
      },
      y: {
        stacked: true,
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
    <>
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
    </>
  );
};
