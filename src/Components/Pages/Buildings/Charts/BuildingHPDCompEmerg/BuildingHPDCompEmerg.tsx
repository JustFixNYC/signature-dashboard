import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { ChartData } from "../../../../../types/APIDataTypes";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  plugins: {
    title: {
      display: false,
      text: "HPD Complaints",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

type BuildingHPDCompEmergProps = {
  data: ChartData[];
};

export const BuildingHPDCompEmerg: React.FC<BuildingHPDCompEmergProps> = ({
  data,
}) => {
  const chartData = {
    datasets: [
      {
        label: "Emergency",
        data: data.map((data) => ({
          x: data.month,
          y: data.hpdcomplaints_emergency,
        })),
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Non-Emergency",
        data: data.map((data) => ({
          x: data.month,
          y: data.hpdcomplaints_nonemergency,
        })),
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  return (
    <div
      className="chart-container"
      style={{ position: "relative", height: "50vh", width: "80vw" }}
    >
      <Bar options={options} data={chartData}></Bar>
    </div>
  );
};
