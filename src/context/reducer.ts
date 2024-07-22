import { CHART_DATA } from "../data/data";

export const enum REDUCER_ACTION_TYPE {
  BALANCE = "BALANCE",
  CHANGE_DAY = "CHANGE_DAY",
  VARIATION = "VARIATION",
  PREV_WEEK = "PREV_WEEK",
  NEXT_WEEK = "NEXT_WEEK",
}

export interface AppActions {
  type: REDUCER_ACTION_TYPE;
  payload?: {
    index: number;
    label: string;
  };
}

export interface AppStateType {
  week: number;
  balance: number;
  expenses: number[];
  currentDay: number;
  variation: number;
  dayExpense: number;
  numOfData: number;
  label: string;
}

export function reducer(state: AppStateType, action: AppActions): AppStateType {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.BALANCE: {
      const total = state.expenses.reduce(
        (acc: number, curr: number) => acc + curr,
        0,
      );
      return { ...state, balance: total };
    }
    case REDUCER_ACTION_TYPE.PREV_WEEK: {
      const newWeek = state.week - 1;
      return {
        ...state,
        week: newWeek,
        expenses: CHART_DATA.datasets[0].data[newWeek],
        dayExpense: CHART_DATA.datasets[0].data[newWeek][6] || 0,
      };
    }
    case REDUCER_ACTION_TYPE.NEXT_WEEK: {
      const newWeek = state.week + 1;
      return {
        ...state,
        week: newWeek,
        expenses: CHART_DATA.datasets[0].data[newWeek],
        dayExpense: CHART_DATA.datasets[0].data[newWeek].at(6) || 0,
      };
    }
    case REDUCER_ACTION_TYPE.CHANGE_DAY: {
      return {
        ...state,
        currentDay: action.payload?.index ?? 0,
        dayExpense: state.expenses[action.payload?.index ?? 0],
        label: action.payload?.label ?? "",
      };
    }
    case REDUCER_ACTION_TYPE.VARIATION: {
      const prevDay = state.currentDay - 1;
      const total =
        prevDay < 0
          ? 0
          : ((state.expenses[state.currentDay] - state.expenses[prevDay]) /
              state.expenses[prevDay]) *
            100;
      return { ...state, variation: Number(total.toFixed(1)) };
    }

    default:
      throw new Error(`${action.type} is unknown`);
  }
}
