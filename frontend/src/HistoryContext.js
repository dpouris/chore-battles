import { createContext, useEffect, useState } from "react";
import { newFetch, refreshToken } from "./helpers/helpers";

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(async () => {
    let historyData = await newFetch("history");
    !historyData.detail && setHistory(historyData);

    if (historyData.detail) {
      const refresh = localStorage.getItem("refresh");
      await refreshToken(refresh);
      historyData = await newFetch("history");
      !historyData.detail && setHistory(historyData);
    }

    return;
  }, [update]);

  return (
    <HistoryContext.Provider value={{ history, setHistory, setUpdate }}>
      {children}
    </HistoryContext.Provider>
  );
};
export default HistoryContext;
