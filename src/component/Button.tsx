import type { ParentComponent } from "solid-js";

interface ButtonProps {
  onClick?: () => void;
  color?: string;
  hidden?: boolean;
  classes?: string[];
}

const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <div
      hidden={props.hidden}
      onClick={props.onClick}
      style={{ background: props.color }}
      class={(props.classes ?? []).join(" ") + " button"}
    >
      {props.children}
    </div>
  );
};

export default Button;
