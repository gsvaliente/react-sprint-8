import { createContext, useContext, useEffect, useReducer } from "react";
import { CHART_DATA } from "../data/data";
import { AppStateType, reducer, REDUCER_ACTION_TYPE } from "./reducer";

interface AppProviderProps {
  children: JSX.Element | JSX.Element[];
}

const initContext = {
  week: 0,
  balance: 0,
  expenses: [0],
  currentDay: 0,
  variation: 0,
  dayExpense: 0,
  numOfData: 0,
  label: "",
  dispatch: (type) => {},
};

const AppContext = createContext(initContext);

const NUM_OF_WEEKS = CHART_DATA.datasets[0].data.length - 1;

const initialState: AppStateType = {
  week: NUM_OF_WEEKS,
  balance: 0,
  expenses: CHART_DATA.datasets[0].data[NUM_OF_WEEKS],
  currentDay: 6,
  variation: 16.7,
  dayExpense: CHART_DATA.datasets[0].data[NUM_OF_WEEKS]?.at(6) || 0,
  numOfData: CHART_DATA.datasets[0].data.length,
  label: "",
};

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    week,
    expenses,
    currentDay,
    balance,
    variation,
    dayExpense,
    label,
    numOfData,
  } = state;

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPE.VARIATION,
    });
    dispatch({ type: REDUCER_ACTION_TYPE.BALANCE });
  }, [currentDay]);

  return (
    <AppContext.Provider
      value={{
        week,
        expenses,
        currentDay,
        balance,
        label,
        variation,
        numOfData,
        dayExpense,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within the AppProvider");
  }
  return context;
}
