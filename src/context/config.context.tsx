import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { ConfigState, DispatchConfigActions, INITIAL_CONFIG_STATE, configReducer } from "../reducers/config.reducer";

const ThemeContext = createContext<{configState:ConfigState,configDispatch:React.Dispatch<DispatchConfigActions>} | null>(null);

type ConfigProviderProps = {children:ReactNode}
export const ConfigProvider = ({children}:ConfigProviderProps) => {
  const [configState,configDispatch] = useReducer(configReducer,INITIAL_CONFIG_STATE)

  return <ThemeContext.Provider value={{configState,configDispatch}}>{children}</ThemeContext.Provider>;
};

export const useConfig = ()=>{
  const themeContextValue = useContext(ThemeContext)
  if(!themeContextValue)  throw Error('🚨 Set up "ConfigProvider" to access to the config context')

  return themeContextValue
}
