import React, { PureComponent } from "react";
import styles from "./Counter.module.css";
import { connect } from "react-redux";
export class Counter extends PureComponent {
  state = {
    sum: this.props.quantity,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.sum !== this.state.sum) {
      this.props.handleCount(this.state.sum);
    }
  }
  handleCounterValue(type) {
    const { quantity } = this.props;
    if (type === "+") {
      this.setState({ sum: quantity + 1 });
    } else {
      this.props.quantity !== 1 && this.setState({ sum: quantity - 1 });
    }
  }

  render() {
    const { overlayFlag, quantity, cartPage } = this.props;
    return (
      <div
        className={
          overlayFlag
            ? styles.smallCounter
            : cartPage
            ? styles.cartCounter
            : styles.counter
        }
      >
        <button onClick={() => this.handleCounterValue("+")}>+</button>
        <p>{quantity}</p>
        <button onClick={() => this.handleCounterValue("-")}>-</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  overlayFlag: state.cart.overlayFlag,
});

export default connect(mapStateToProps)(Counter);
