import React, { PureComponent } from "react";
import CartComponent from "../CartComponent/CartComponent";
import Button from "../Button/Button";
import styles from "./CartOverlay.module.css";
import { Link } from "react-router-dom";
import { setOverlayCart } from "../../Redux/actions/cart";
import { calcQuantity } from "../../assets/utilize";
import cartSrc from "../../assets/icons/Vector.png";

import { connect } from "react-redux";
export class CartOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      clickedItem: 0,
      quantities: 0,
    };

    this.cartRef = React.createRef();
    this.testRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  /* state = {
    quantities: 0,
  }; */
  componentDidMount() {
    const { products } = this.props;
    calcQuantity(products).then((res) => this.setState({ quantities: res }));

    document.addEventListener("mousedown", (e) => this.handleClickOutside(e));
  }
  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      const { products } = this.props;
      calcQuantity(products).then((res) => this.setState({ quantities: res }));
    }
  }
  handleOverlay() {
    this.props.setOverlayCart(false);
  }
  handleClicked() {
    const { overlayFlag, setOverlayCart } = this.props;
    
    setOverlayCart(!overlayFlag);
  }
  handleClickOutside(event) {
    if (this.cartRef && !this.cartRef.current.contains(event.target)) {
      this.props.setOverlayCart(false);
    }
  }
  render() {
    const { cartLength, overlayFlag } = this.props;
    const { quantities } = this.state;
    return (
      <div ref={this.cartRef} className={styles.container}>
        <img onClick={() => this.handleClicked()} src={cartSrc} alt="cart" />
        <span className={styles.test}>{quantities}</span>
        {overlayFlag && (
          <div
            className={styles.semiContainer}
          >
            <p>
              My Bag: <span>{`${cartLength} items`}</span>
            </p>
            <div ref={this.testRef}>
              <CartComponent />
            </div>
            <div className={styles.btns}>
              <Link to="/cart">
                <Button
                  text="view bag"
                  btnClass={styles.bagBtn}
                  handleClicked={() => this.handleOverlay()}
                />
              </Link>
              <Button text="check out" btnClass={styles.checkBtn} />
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartLength: state.cart.cartProducts.length,
  overlayFlag: state.cart.overlayFlag,
  products: state.cart.cartProducts,
});
const mapDispatchToProps = () => ({
  setOverlayCart,
});

export default connect(mapStateToProps, mapDispatchToProps())(CartOverlay);
