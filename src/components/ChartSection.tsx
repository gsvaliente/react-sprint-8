import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../context/AppContext";
import { BarChart } from "./BarChart";

export function ChartSection() {
  const { variation, dayExpense, expenses, dispatch, week, numOfData } =
    useAppContext();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch({ type: "VARIATION" });
  }, [dispatch, expenses]);

  return (
    <div className="space-y-2 rounded-xl bg-[#FFFEFB] px-5 py-3">
      <div className="text-xl font-bold uppercase">
        {week === numOfData - 1 ? t("chartTitle") : t("chartAltTitle")}
      </div>
      <BarChart />
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-stone-400">{t("dailyExpense")}</div>
          <div className="text-2xl font-bold sm:text-3xl">${dayExpense}</div>
        </div>
        <div className="font-bold">
          <div className="text-right">
            {variation > 0 ? `+${variation}%` : `${variation}%`}
          </div>
          <div className="text-xs">{t("varianceToDay")}</div>
        </div>
      </div>
    </div>
  );
}
