import type { ParentComponent } from "solid-js";
import "./Input.sass";

interface InputProps {
  type?: string;
  onInput?: (name: string) => void;
  value?: string;
}

const Input: ParentComponent<InputProps> = (props) => {
  return (
    <input
      type={props.type}
      onInput={props.onInput && ((e) => props.onInput!(e.target.value))}
      value={props.value}
    />
  );
};

export default Input;
