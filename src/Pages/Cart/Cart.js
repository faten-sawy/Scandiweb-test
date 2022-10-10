import React, { PureComponent } from "react";
import Button from "../../Components/Button/Button";
import CartComponent from "../../Components/CartComponent/CartComponent";
import styles from "./Cart.module.css";
import { connect } from "react-redux";
class Cart extends PureComponent {
  render() {
    const { overlayFlag } = this.props;
    return (
      <div className={styles.container}>
        <div className={overlayFlag ? styles.overlay : null}></div>
        <CartComponent cartPage={true} />
        <Button text="order now" btnClass={styles.orderBtn} />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  overlayFlag: state.cart.overlayFlag,
});

export default connect(mapStateToProps)(Cart);
