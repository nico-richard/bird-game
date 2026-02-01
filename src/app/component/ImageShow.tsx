import { Component } from "solid-js";
import { PhotoWithBird } from "~/lib/shared/types";
import "./ImageShow.sass";

interface ImageShowProps {
  photo?: PhotoWithBird;
}

const ImageShow: Component<ImageShowProps> = (props) => {
  return (
    <div class="photo-container">
      <img src={props.photo?.url} alt="" />
    </div>
  );
};

export default ImageShow;
