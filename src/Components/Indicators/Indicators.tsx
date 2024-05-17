import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  ScriptableScaleContext,
  ChartOptions,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line, getElementAtEvent } from "react-chartjs-2";
import { useSearchParams } from "react-router-dom";
import { useGetIndicatorHistory } from "../../api/hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
);

export const Indicators: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bbl = searchParams.get("bbl") || "";
  const chartRef = useRef();

  const { indicators } = useGetIndicatorHistory(bbl);

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    parsing: {
      xAxisKey: "month",
      yAxisKey: "hpdcomplaints_total",
    },
    scales: {
      x: {
        type: "time",
        min: "2022-01-01",
        time: {
          tooltipFormat: "MMM yyyy",
          displayFormats: {
            month: "MM yyyy",
          },
          unit: "month",
        },
        title: {
          display: true,
          text: "Month",
        },
        grid: {
          color: function (context: ScriptableScaleContext) {
            console.log({ context });
            return context.tick.label == "09 2022" ? "black" : "#ddd";
          },
          lineWidth: function (context: ScriptableScaleContext) {
            return context.tick.label == "09 2022" ? 3 : 1;
          },
        },
        ticks: {
          font: {
            weight: function (context: ScriptableScaleContext) {
              return context.tick.label == "09 2022" ? "bold" : "normal";
            },
          },
          color: function (context: ScriptableScaleContext) {
            return context.tick.label == "09 2022" ? "black" : "#aaa";
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "HPD Total Violations",
        },
      },
    },
  };
  const data = {
    datasets: [
      {
        data: indicators,
      },
    ],
  };
  const onClick = function (e: React.MouseEvent<HTMLCanvasElement>) {
    const { current: chart } = chartRef;
    if (chart) {
      const { index } = getElementAtEvent(chart, e)[0];
      console.log(indicators[index]);
    }
  };
  return (
    <Line ref={chartRef} options={options} data={data} onClick={onClick} />
  );
};
