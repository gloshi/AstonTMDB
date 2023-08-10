import React, { ButtonHTMLAttributes, FC, ReactNode, memo } from "react";
import styles from "../../styles/Button/Button.module.scss";
import { Mods, classNames } from "../../libs/classNames";

export enum ThemeButtonChanger {
  CLEAR = "clear",
  OUTLINE = "outline",
  OUTLINE_RED = "outline_red",
  OUTLINE_CANCEL = "outline_cancel",
}

export enum ButtonSize {
  M = "size_m",
  L = "size_l",
  XL = "size_xl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButtonChanger;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = memo((props) => {
  const {
    className,
    theme = ThemeButtonChanger.OUTLINE,
    children,
    size = ButtonSize.M,
    ...otherProps
  } = props;
  const mods: Mods = {
    [styles[theme]]: true,
    [styles[size]]: true,
  };
  return (
    <button
      type="button"
      className={classNames(styles.Button, mods, [className])}
      {...otherProps}
    >
      {children}
    </button>
  );
});

export default Button;
