/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../context/AppContext";
import { CHART_DATA } from "../data/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
);

export function BarChart() {
  const { t } = useTranslation();
  const { dispatch, currentDay, expenses } = useAppContext();
  const [selectedIndex, setSelectedIndex] = useState(currentDay);

  const translatedLabels = t("daysLabel", { returnObjects: true });

  const options = {
    onClick: (_: any, elements: any[]) => {
      if (elements.length > 0) {
        const element = elements[0];
        const index = element.index;
        const label = CHART_DATA.labels[index];
        dispatch({ type: "CHANGE_DAY", payload: { index, label } });
        setSelectedIndex(index);
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    ...CHART_DATA,
    labels: translatedLabels,
    datasets: CHART_DATA.datasets.map((dataset) => ({
      ...dataset,
      data: expenses,
      backgroundColor: expenses.map((_, i) =>
        i === selectedIndex
          ? "rgba(99, 168, 176, 0.8)"
          : "rgba(228, 95, 74, 0.8)",
      ),
      borderColor: expenses.map((_, i) =>
        i === selectedIndex ? "rgba(99, 168, 176, 1)" : "rgba(228, 95, 74, 1)",
      ),
    })),
  };
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}
