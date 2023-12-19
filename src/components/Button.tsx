import { CSSProperties, ReactNode } from "react";
import styled, { css } from "styled-components";
import { useConfig } from "../context/config.context";

type ThemeType = "dark" | "light";
type ButtonSize = "small" | "medium" | "large";
type VariantButton = "flat" | "solid";

type ButtonProps = {
  children: ReactNode;
  onclick?: () => void;
  title?: string;
  size?: ButtonSize;
  style?: CSSProperties;
  variant?: VariantButton;
};

export const Button = ({
  children,
  onclick,
  title = "",
  style,
  size = "medium",
  variant = "flat",
}: ButtonProps) => {
  const { configState } = useConfig();
  return (
    <ButtonStyled
      onClick={onclick}
      $theme={configState.theme}
      style={{ ...style }}
      className="custom-button"
      title={title}
      $size={size}
      $variant={variant}
    >
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<{
  $theme?: ThemeType;
  $size: ButtonSize;
  $variant: VariantButton;
}>`
  border: none;
  padding: ${(props) => {
    if (props.$size === "small") return css`4px;`;
    if (props.$size === "large") return css`12px;`;
    return css`8px;`;
  }};
  font-size: ${(props) => {
    if (props.$size === "small") return css`12px;`;
    if (props.$size === "large") return css`30px;`;
    return css`20px;`;
  }};
  cursor: pointer;
  background: ${(props) => {
    if (props.$variant === "flat") return "transparent";
    return props.$theme === "dark"
      ? props.theme.colors.gray[100]
      : props.theme.colors.gray[800];
  }};
  border-radius: 8px;
  color: ${(props) => {
    if (props.$variant === "flat" && props.$theme === "dark")
      return props.theme.colors.light;
    if (props.$variant === "flat" && props.$theme === "light")
      return props.theme.colors.dark;
    if (props.$variant === "solid" && props.$theme === "dark")
      return props.theme.colors.gray[900];
    if (props.$variant === "solid" && props.$theme === "light")
      return props.theme.colors.gray[100];
  }};
  &:hover {
    background: ${(props) => {
      if (props.$variant === "flat" && props.$theme === "dark")
        return props.theme.colors.gray[900];
      if (props.$variant === "flat" && props.$theme === "light")
        return props.theme.colors.gray[100];
      if (props.$variant === "solid" && props.$theme === "dark")
        return props.theme.colors.gray[200];
      if (props.$variant === "solid" && props.$theme === "light")
        return props.theme.colors.gray[900];
    }};
  }
`;
