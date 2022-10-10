import React, { PureComponent } from "react";
import CartCard from "../Cart-Card/CartCard";
import { addPrice } from "../../Redux/actions/cart";
import { getQuantities } from "../../Redux/actions/cart";
import { connect } from "react-redux";
import { calcTotalPrice } from "../../Redux/actions/cart";
import styles from "./CartComponent.module.css";

export class CartComponent extends PureComponent {
  componentDidMount() {
    this.props.getQuantities();
    this.props.calcTotalPrice();
  }
  componentDidUpdate(prevProps, prevStatus) {
    if (
      prevProps.products !== this.props.products ||
      prevProps.quantity !== this.props.quantity
    ) {
      this.props.getQuantities();
      this.props.calcTotalPrice();
    }
  }

  render() {
    const { products, quantity, total, cartPage, symbol } = this.props;
    return (
      <>
        <div className={styles.cartContainer}>
          {products.map((item) => (
            <CartCard data={item} key={item.uniqId} cartPage={cartPage} />
          ))}
        </div>
        <div className={styles.price}>
          {cartPage && (
            <>
              <h2>
                Tax 21%: <span>{total.tax}</span>
              </h2>
              <h2>
                Quantity: <span>{quantity}</span>
              </h2>
            </>
          )}
          <div className={cartPage ? styles.cart : styles.overlay}>
            <p>Total:</p>
            <p>
              {symbol}
              {cartPage ? total.price : (total.price - total.tax).toFixed(2)}
            </p>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  products: state.cart.cartProducts,
  total: state.cart.total,
  quantity: state.cart.quantities,
  overlayFlag: state.cart.overlayFlag,
  symbol: state.symbol,
});
const mapDispatchToProps = () => ({
  addPrice,
  getQuantities,
  calcTotalPrice,
});

export default connect(mapStateToProps, mapDispatchToProps())(CartComponent);
