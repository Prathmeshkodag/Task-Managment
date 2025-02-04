import { createContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  
  return (
    <TaskContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
