import type { ParentComponent } from "solid-js";

interface ButtonProps {
  onClick?: () => void;
  color?: string;
  hidden?: boolean;
}

const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <div
      hidden={props.hidden}
      class="button"
      onClick={props.onClick}
      style={{ background: props.color }}
    >
      {props.children}
    </div>
  );
};

export default Button;
