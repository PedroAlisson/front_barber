import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";
import { useField } from "@unform/core";
import { Container, Error } from "./style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFielld, setIsFielld] = useState(false);
  const [isFocused, setisFocused] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const inputBlur = useCallback(() => {
    setisFocused(false);

    setIsFielld(!!inputRef.current?.value);
  }, []);

  const inputFocus = useCallback(() => {
    setisFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFielld={isFielld} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input onFocus={inputFocus} onBlur={inputBlur} ref={inputRef} {...rest} />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
