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
} from "chart.js";
import "chartjs-adapter-luxon";
import annotationPlugin from "chartjs-plugin-annotation";
import { BuildingInfo, ChartData } from "../../types/APIDataTypes";
import { Bar } from "react-chartjs-2";

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
  data: ChartData[];
  timespan: "two-years" | "all-time";
  buildingInfo: BuildingInfo;
};

export const BuildingBandCChart: React.FC<BuildingBAndCChartProps> = ({
  data,
  timespan,
  buildingInfo,
}) => {
  const chartData = {
    datasets: [
      {
        label: "Class B",
        data: data.map((data) => ({
          x: data.month,
          y: data.hpdviolations_class_b,
        })),
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Class C",
        data: data.map((data) => ({
          x: data.month,
          y: data.hpdviolations_class_c,
        })),
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: false,
        text: "HPD Violations",
      },
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
        position: "bottom",
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            display: !!buildingInfo?.origination_date,
            xMin: buildingInfo?.origination_date,
            xMax: buildingInfo?.origination_date,
            borderColor: "black",
            borderWidth: 2,
            label: {
              display: true,
              content:
                "Origination: " +
                new Date(buildingInfo?.origination_date).toLocaleDateString(
                  "en",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                ),
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
            display: !!buildingInfo?.last_sale_date,
            xMin: buildingInfo?.last_sale_date,
            xMax: buildingInfo?.last_sale_date,
            borderColor: "black",
            borderWidth: 2,
            label: {
              display: true,
              content:
                "Sold: " +
                new Date(buildingInfo?.last_sale_date).toLocaleDateString(
                  "en",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                ),
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
      mode: "index",
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
          display: true,
          text: "HPD Violations",
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

  return (
    <div className="chart-container" style={{ position: "relative" }}>
      <Bar options={options} data={chartData} height={300}></Bar>
    </div>
  );
};
