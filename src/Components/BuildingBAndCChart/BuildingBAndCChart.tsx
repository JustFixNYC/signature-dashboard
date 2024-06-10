import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  TimeScale,
  Interaction,
} from "chart.js";
import "chartjs-adapter-luxon";
import { ChartData } from "../../types/APIDataTypes";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);
const twoYearsAgo = new Date();
twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

type BuildingBAndCChartProps = {
  data: ChartData[];
  timespan: "two-years" | "all-time";
};

export const BuildingBandCChart: React.FC<BuildingBAndCChartProps> = ({
  data,
  timespan,
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
          title: (context) => {
            const date = new Date(context[0].label).toLocaleDateString("en", {
              year: "numeric",
              month: "long",
            });
            return date;
          },
          footer: (context) => {
            let total = 0;
            context.forEach((context) => {
              total += context.raw.y;
            });
            return "Total: " + total;
          },
        },
      },
    },
    interaction: {
      mode: "index",
    },
    responsive: true,
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
      },
    },
  };

  return (
    <div
      className="chart-container"
      style={{ position: "relative", height: "80vh", width: "80vw" }}
    >
      <Bar options={options} data={chartData}></Bar>
    </div>
  );
};
