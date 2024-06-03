import { Component } from "react";
import Flicking from "@egjs/react-flicking";

export default class SliderComponent extends Component {
  return() {
    return (
      <Flicking moveType="freeScroll" bound={true}>
        <span className="button mr-2 is-white">🍎 Apple</span>
        <span className="button mr-2 is-white">🍉 Watermelon</span>
        <span className="button mr-2 is-white">🥝 Kiwi</span>
        <span className="button mr-2 is-white">...</span>
      </Flicking>
    );
  }
}
