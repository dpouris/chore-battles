import { createContext, useEffect, useState } from "react";
import baseAxios from "../helpers/axios";

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [points, setPoints] = useState(0);
  const [update, setUpdate] = useState(true);

  useEffect(async () => {
    const historyData = await baseAxios.get("history/");

    setHistory(historyData.data);

    setPoints(() => {
      const sum = historyData.data.reduce((prevValue, currValue) => {
        if (currValue.completed) {
          return prevValue + currValue.points;
        }
        return prevValue + 0;
      }, 0);
      return sum;
    });
  }, [update]);

  return (
    <HistoryContext.Provider
      value={{ history, setHistory, setUpdate, points, setPoints }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
export default HistoryContext;
