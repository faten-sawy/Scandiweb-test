import React, { PureComponent } from "react";
import Colors from "../ColorList/Colors";
import Sizes from "../SizesList/Sizes";
import styles from "./ProductInfo.module.css";
import { connect } from "react-redux";

export class ProductInfo extends PureComponent {
  constructor() {
    super();
    this.state = {
      colorAttributes: {},
      sizeAttributes: {},
      price: 0,
    };
  }

  componentDidMount() {
    this.setAttributesValues();
    this.getPrice();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.symbol !== this.props.symbol) {
      this.getPrice();
    }
  }
  getPrice() {
    const { symbol } = this.props;
    const { prices } = this.props;
    const data = prices.find((item) => item.currency.symbol === symbol);
    this.setState({ price: data.amount });
  }
  setAttributesValues() {
    const { attributes } = this.props;
    const sizeValues = attributes.filter((item) => item.type === "text");
    const colorValues = attributes.filter((item) => item.type === "swatch");
    this.setState({ colorAttributes: colorValues, sizeAttributes: sizeValues });
  }
  passAttributeToCart(attribute) {
    this.props.getAttribute(attribute);
  }
  passChangedAttributeToCart(attribute) {
    this.props.handleChangedAttribute(attribute);
  }
  render() {
    const {
      attributes,
      brand,
      name,
      symbol,
      selectedAttributes,
      cartMood,
      cartPage,
    } = this.props;

    const { price } = this.state;
    return (
      <div
        className={
          cartMood && !cartPage
            ? styles.smallContainer
            : cartMood && cartPage
            ? styles.cartInfoContainer
            : styles.container
        }
      >
        <h1>{brand}</h1>
        <h2>{name}</h2>

        <div className={cartPage ? styles.semiCont : styles.reverseCont}>
          <div>
            {this.state.sizeAttributes.length > 0 && (
              <Sizes
                values={this.state.sizeAttributes}
                attributes={attributes}
                passAttributeToCart={(att) => this.passAttributeToCart(att)}
                selectedAttributes={selectedAttributes}
                cartMood={cartMood}
              />
            )}
            {this.state.colorAttributes.length > 0 && (
              <Colors
                values={this.state.colorAttributes}
                passAttributeToCart={(att) => this.passAttributeToCart(att)}
                selectedAttributes={selectedAttributes}
                cartMood={cartMood}
              />
            )}
          </div>

          <div className={styles.productPrice}>
            {cartPage && <p className={styles.label}>price:</p>}
            <p className={styles.price}>{`${symbol} ${price.toFixed(2)}`}</p>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  symbol: state.symbol,
  overlayFlag: state.cart.overlayFlag,
  PDPProduct: state.products.PDPProduct,
});

export default connect(mapStateToProps)(ProductInfo);
