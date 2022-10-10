import React, { PureComponent } from "react";
import styles from "./ProductDetails.module.css";
import {
  getProductDetails,
  deleteProductDetails,
} from "../../Redux/actions/async";
import ImagesList from "../../Components/ImagesList/Images";
import ProductInfo from "../../Components/Product-Info/ProductInfo";
import Button from "../../Components/Button/Button";
import Parser from "html-react-parser";
import { connect } from "react-redux";
import { addToCart } from "../../Redux/actions/cart";
import { compose } from "redux";
import { withRouter } from "react-router";
import { addQuantity, deleteAttributes } from "../../Redux/actions/cart";
import { addPrice } from "../../Redux/actions/cart";
import { passProductToCart } from "../../assets/utilize";
export class ProductDetails extends PureComponent {
  state = {
    selectedAttributes: [],
    message: "",
  };
  componentDidMount() {
    this.props.getProductDetails(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.deleteAttributes();
    this.props.deleteProductDetails();
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  }
  handlePassProduct() {
    const {
      products,
      PDPProduct,
      constAttributes,
      deleteAttributes,
      addToCart,
      addQuantity,
    } = this.props;
    const { message } = passProductToCart({
      PDPProduct,
      products,
      constAttributes,
      deleteAttributes,
      addToCart,
      addQuantity,
    });
    this.setState({ message });
  }

  handleGettingAttribute(attribute) {
    const newArr = [...this.state.selectedAttributes];
    const index = newArr.findIndex((item) => item.name === attribute.name);
    if (index === -1) {
      this.setState({
        selectedAttributes: [...this.state.selectedAttributes, attribute],
      });
    } else {
      newArr[index].value = attribute.value;
      this.setState({
        selectedAttributes: newArr,
      });
    }
  }

  render() {
    const {
      gallery,
      attributes,
      description,
      brand,
      name,
      inStock,
      prices,
      id,
    } = this.props.PDPProduct;
    const { overlayFlag } = this.props;
    const { message } = this.state;

    return (
      <div className={styles.container}>
        <div
          className={overlayFlag ? styles.overlayLayout : styles.layout}
        ></div>
        <div className={styles.semiContainer}>
          {prices && (
            <>
              <ImagesList gallery={gallery} inStock={inStock} />
              <div className={styles.info}>
                {message && <p>{`we can't order because ${message}`}</p>}

                <ProductInfo
                  attributes={attributes}
                  brand={brand}
                  name={name}
                  prices={prices}
                  price={this.state.price}
                  inStock={inStock}
                  cartPage={true}
                  id={id}
                  getAttribute={(option) => this.handleGettingAttribute(option)}
                />
                <Button
                  handleClicked={() => this.handlePassProduct()}
                  text={inStock ? "order now" : "Out of stock"}
                  btnClass={inStock ? styles.orderBtn : styles.outBtn}
                />
                <div className={styles.description}>{Parser(description)}</div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  symbol: state.symbol,
  cart: state.cart,
  overlayFlag: state.cart.overlayFlag,
  products: state.cart.cartProducts,
  constAttributes: state.cart.constAttributes,
  PDPProduct: state.products.PDPProduct,
});
const mapDispatchToProps = () => ({
  addToCart,
  addQuantity,
  deleteAttributes,
  getProductDetails,
  deleteProductDetails,
  addPrice,
});
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps())
)(ProductDetails);
