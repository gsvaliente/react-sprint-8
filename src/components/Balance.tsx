import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { useAppContext } from "../context/AppContext";

const SIZE = 26;

export function Balance() {
  const { balance, dispatch, expenses, week, numOfData } = useAppContext();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch({ type: "BALANCE" });
  }, [dispatch, expenses, week]);

  return (
    <div className="rounded-xl bg-[#D35845] px-5 py-3 text-stone-200 transition-all sm:px-7 sm:py-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs sm:text-sm">{t("mainTitle")}</div>
          <span className="text-lg font-bold sm:text-2xl">${balance}</span>
        </div>
        <div className="flex flex-row">
          <button
            className="disabled:cursor-not-allowed"
            onClick={() => dispatch({ type: "PREV_WEEK" })}
            disabled={week < 1 ? true : false}
          >
            <BsArrowLeftShort size={SIZE} />
          </button>
          <button
            className="disabled:cursor-not-allowed"
            onClick={() => dispatch({ type: "NEXT_WEEK" })}
            disabled={numOfData - 1 === week ? true : false}
          >
            <BsArrowRightShort size={SIZE} />
          </button>
        </div>
      </div>
    </div>
  );
}
