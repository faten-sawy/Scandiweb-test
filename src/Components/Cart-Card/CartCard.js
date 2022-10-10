import React, { PureComponent } from "react";
import styles from "./CartCard.module.css";
import ProductInfo from "../Product-Info/ProductInfo";
import Counter from "../Counter/Counter";
import Slider from "../Slider/Slider";
import { connect } from "react-redux";
import { getProductQuantity } from "../../assets/utilize";
import {
  addQuantity,
  addPrice,
  removeFromCart,
  changeAttribute,
} from "../../Redux/actions/cart";

export class CartCard extends PureComponent {
  state = {
    count: 1,
    price: 0,
    quantity: 1,
  };
  componentDidMount() {
    const { products } = this.props;
    const { uniqId } = this.props.data;
    this.calcPrice();
    getProductQuantity(uniqId, products).then((res) =>
      this.setState({ quantity: res })
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const { products } = this.props;
    const { uniqId } = this.props.data;
    if (
      prevState.count !== this.state.count ||
      prevProps.symbol !== this.props.symbol ||
      prevProps.data.quantity !== this.props.data.quantity
    ) {
      getProductQuantity(uniqId, products).then((res) =>
        this.setState({ quantity: res })
      );
      this.calcPrice();
    }
  }
  getCount(number) {
    const { uniqId } = this.props.data;
    this.setState({ count: number });

    this.props.addQuantity(uniqId, number);
  }
  calcPrice() {
    const { prices, uniqId } = this.props.data;
    const { symbol } = this.props;
    const data = prices.find((item) => item.currency.symbol === symbol);

    this.props.addPrice(uniqId, data.amount * this.state.quantity);
  }

  handleRemove(id) {
    this.props.removeFromCart(id);
  }
  handleChangedAttribute(attribute) {
    const { uniqId } = this.props.data;
    const obj = { type: "attribute", value: attribute };
    this.props.changeAttribute(uniqId, obj);
  }
  render() {
    const { cartPage } = this.props;
    const {
      attributes,
      brand,
      name,
      gallery,
      id,
      selectedAttributes,
      uniqId,
      prices,
      quantity,
    } = this.props.data;
    return (
      <div className={styles.container}>
        <ProductInfo
          attributes={attributes}
          brand={brand}
          prices={prices}
          name={name}
          count={this.state.count}
          cartMood={true}
          cartPage={cartPage}
          id={id}
          selectedAttributes={selectedAttributes}
          handleChangedAttribute={(attribute) =>
            this.handleChangedAttribute(attribute)
          }
        />
        <div className={styles.rightSide}>
          <Counter
            cartPage={cartPage}
            quantity={quantity}
            handleCount={(number) => this.getCount(number)}
          />
          <Slider cartPage={cartPage} gallery={gallery} />
          <button onClick={() => this.handleRemove(uniqId)}>X</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  symbol: state.symbol,
  products: state.cart.cartProducts,
});
const mapDispatchToProps = () => ({
  addQuantity,
  addPrice,
  removeFromCart,
  changeAttribute,
});

export default connect(mapStateToProps, mapDispatchToProps())(CartCard);
