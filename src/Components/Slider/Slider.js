import React, { PureComponent } from "react";
import styles from "./Slider.module.css";
import { connect } from "react-redux";
export class Slider extends PureComponent {
  state = {
    index: 0,
  };
  handleClicked(type) {
    if (type === "<") {
      if (this.state.index + 1 === this.props.gallery.length) {
        return;
      } else {
        this.setState({ index: this.state.index + 1 });
      }
    } else {
      if (this.state.index === 0) {
        return;
      } else if (type === ">") {
        this.setState({ index: this.state.index - 1 });
      }
    }
  }
  render() {
    const { gallery, overlayFlag, cartPage } = this.props;

    return (
      <div
        className={
          overlayFlag
            ? styles.smallSlider
            : cartPage
            ? styles.cartSlider
            : styles.slider
        }
      >
        <img src={gallery[this.state.index]} alt="product" />
        {!overlayFlag && gallery.length > 1 && (
          <>
            <button onClick={() => this.handleClicked("<")}>{"<"}</button>
            <button onClick={() => this.handleClicked(">")}> {">"} </button>
          </>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  overlayFlag: state.cart.overlayFlag,
});

export default connect(mapStateToProps)(Slider);
