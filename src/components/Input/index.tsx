import { InputHTMLAttributes, memo } from "react";
import styles from "../../styles/Input/Input.module.scss";
import { classNames } from "../../libs/classNames";

type HtmlInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>;

interface InputProps extends HtmlInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const Input = memo((props: InputProps) => {
  const { className, value, placeholder, type = "text", onChange } = props;
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <input
      className={classNames(styles.Input, {}, [className])}
      type={type}
      placeholder={placeholder}
      onChange={onChangeHandler}
      value={value}
    />
  );
});

export default Input;
