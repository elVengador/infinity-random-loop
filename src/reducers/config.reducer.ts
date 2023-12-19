export type UserTheme = "light" | "dark";
export type ConfigState = { theme: UserTheme };

type ChangeThemeAction = { type: "changeTheme"; payload: UserTheme };
export type DispatchConfigActions = ChangeThemeAction;

export const INITIAL_CONFIG_STATE: ConfigState = { theme: "dark" };

export const configReducer = (
  state: ConfigState,
  action: DispatchConfigActions
): ConfigState => {
  if (action.type === "changeTheme") return { ...state, theme: action.payload };
  return state;
};
