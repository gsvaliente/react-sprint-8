import { createContext, useContext, useEffect, useReducer } from "react";
import { CHART_DATA } from "../data/data";

interface AppProviderProps {
  children: JSX.Element | JSX.Element[];
}

enum AppActionType {
  BALANCE = "BALANCE",
  CHANGE_DAY = "CHANGE_DAY",
  VARIATION = "VARIATION",
  PREV_WEEK = "PREV_WEEK",
  NEXT_WEEK = "NEXT_WEEK",
}

interface AppActions {
  type: AppActionType;
  payload: {
    index: number;
    label: string;
  };
}

interface AppState {
  week: number;
  balance: number;
  expenses: number[];
  currentDay: number;
  variation: number;
  dayExpense: number;
  numOfData: number;
}

const AppContext = createContext({});

const NUM_OF_WEEKS = CHART_DATA.datasets[0].data.length - 1;

const initialState = {
  week: NUM_OF_WEEKS,
  balance: 0,
  expenses: CHART_DATA.datasets[0].data[NUM_OF_WEEKS],
  currentDay: 6,
  variation: 16.7,
  dayExpense: CHART_DATA.datasets[0].data[NUM_OF_WEEKS].at(6),
  numOfData: CHART_DATA.datasets[0].data.length,
};

function reducer(state: AppState, action: AppActions) {
  switch (action.type) {
    case "BALANCE": {
      const total = state.expenses.reduce(
        (acc: number, curr: number) => acc + curr,
        0,
      );
      return { ...state, balance: total };
    }
    case "PREV_WEEK": {
      const newWeek = state.week - 1;
      return {
        ...state,
        week: newWeek,
        expenses: CHART_DATA.datasets[0].data[newWeek],
        dayExpense: CHART_DATA.datasets[0].data[newWeek].at(6),
      };
    }
    case "NEXT_WEEK": {
      const newWeek = state.week + 1;
      return {
        ...state,
        week: newWeek,
        expenses: CHART_DATA.datasets[0].data[newWeek],
        dayExpense: CHART_DATA.datasets[0].data[newWeek].at(6),
      };
    }
    case "CHANGE_DAY": {
      return {
        ...state,
        currentDay: action.payload.index,
        dayExpense: state.expenses[action.payload.index],
        label: action.payload.label,
      };
    }
    case "VARIATION": {
      const prevDay = state.currentDay - 1;
      const total =
        prevDay < 0
          ? 0
          : ((state.expenses[state.currentDay] - state.expenses[prevDay]) /
              state.expenses[prevDay]) *
            100;
      return { ...state, variation: total.toFixed(1) };
    }

    default:
      throw new Error(`${action.type} is unknown`);
  }
}

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
    dispatch({ type: "VARIATION" });
    dispatch({ type: "BALANCE" });
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
