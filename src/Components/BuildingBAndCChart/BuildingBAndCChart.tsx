import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { ChartData } from "../../types/APIDataTypes";
import { Bar } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    title: {
      display: true,
      text: 'HPD Violations',
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

type BuildingBAndCChartProps = {
  data: ChartData[];
};

export const BuildingBandCChart: React.FC<BuildingBAndCChartProps> = ({data}) => {
  const chartData = {
    datasets: [
      {
        label: 'Class B',
        data: data.map((data => ({
          x: data.month,
          y: data.hpdviolations_class_b,
        }))),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Class C',
        data: data.map((data => ({
          x: data.month,
          y: data.hpdviolations_class_c
        }))),
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  return (
    <div className="chart-container"  style={{position: "relative", height:"50vh", width:"80vw"}}>
      <Bar options={options} data={chartData}></Bar>
    </div>
  );
};