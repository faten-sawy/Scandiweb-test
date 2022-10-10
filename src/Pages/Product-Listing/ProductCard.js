import React, { PureComponent } from "react";
import CustomCard from "../../Components/Cards";
import styles from "./ProductCard.module.css";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../Redux/actions/cart";
import { uniqId } from "../../assets/utilize";
import {
  addQuantity,
  deleteAttributes,
  setAttributes,
} from "../../Redux/actions/cart";

export class ProductCard extends PureComponent {
  state = {
    currencyData: {},
  };
  componentDidMount() {
    this.updatePrice();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.symbol !== this.props.symbol) {
      this.updatePrice();
    }
  }
  componentWillUnmount() {
    this.props.deleteAttributes();
  }
  updatePrice() {
    const { prices } = this.props.data;
    const { symbol } = this.props;
    const data = prices.find((item) => item.currency.symbol === symbol);
    this.setState({ currencyData: data });
  }
  handlePassProductToCart(e) {
    e.preventDefault();
    const { gallery, name, id, attributes, brand, prices, inStock } =
      this.props.data;
    const { products, deleteAttributes } = this.props;
    deleteAttributes();

    const initAttributes = this.getInitialAttributes(attributes);

    const order = {
      gallery,
      attributes,
      brand,
      name,
      prices,
      id,
      realPrice: this.state.currencyData.amount,
      quantity: 1,
      selectedAttributes: initAttributes,
      uniqId: uniqId(),
    };
    const check = products.find(
      (item) =>
        item.id === order.id &&
        JSON.stringify(item.selectedAttributes) ===
          JSON.stringify(initAttributes)
    );

    if (inStock) {
      if (check) {
        const { uniqId, quantity } = check;
        this.props.addQuantity(uniqId, quantity + 1);
      } else {
        this.props.addToCart(order);
      }
    } else {
      alert("Can't order because product out of stock");
    }
  }
  getInitialAttributes(attributes) {
    let arr = [];
    attributes.forEach((element) => {
      const obj = {
        name: element.name,
        type: element.type,
        value: element.items[0].value,
      };
      this.props.setAttributes(obj);
      arr.push(obj);
    });
    return arr;
  }

  render() {
    const { gallery, name, id, brand, inStock } = this.props.data;
    const { currencyData } = this.state;
    return (
      <Link to={`/details/${id}`} className={styles.container}>
        <CustomCard inStock={inStock}>
          <CustomCard.Image src={gallery[0]} inStock={inStock} />
          {inStock && (
            <CustomCard.CartBtn
              handleClicked={(e) => this.handlePassProductToCart(e)}
            />
          )}

          <div className={styles.content}>
            <CustomCard.Name>{`${brand}  ${name}`}</CustomCard.Name>
            <CustomCard.Row>
              {Object.keys(this.state.currencyData).length !== 0 && (
                <CustomCard.Price className={styles.price}>
                  {`
                   ${currencyData.currency.symbol}
                   ${currencyData.amount.toFixed(2)}
                  `}
                </CustomCard.Price>
              )}
            </CustomCard.Row>
          </div>
          {!inStock && (
            <CustomCard.Label stock={inStock}>out of stock</CustomCard.Label>
          )}
        </CustomCard>
      </Link>
    );
  }
}
const mapStateToProps = (state) => ({
  symbol: state.symbol,
  products: state.cart.cartProducts,
  constAttributes: state.cart.constAttributes,
});
const mapDispatchToProps = () => ({
  addToCart,
  addQuantity,
  deleteAttributes,
  setAttributes,
});
export default connect(mapStateToProps, mapDispatchToProps())(ProductCard);
