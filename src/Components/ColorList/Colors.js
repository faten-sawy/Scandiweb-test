import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styles from "./Colors.module.css";
import { setAttributes } from "../../Redux/actions/cart";
import { Button } from ".";

export class Colors extends PureComponent {
  constructor() {
    super();
    this.divRef = React.createRef();
  }
  state = {
    values: [],
  };
  componentDidMount() {
    this.setValues();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.cartMood !== this.props.cartMood) {
      this.setValues();
    }
  }

  passAttribute(name, value, type, e, index) {
    const { selectedAttributes } = this.props;
    if (!selectedAttributes) {
      this.props.passAttributeToCart({ name, value, type });
      this.props.setAttributes({ name, type, value });
      this.handleClick(e, index);
    } else {
      return;
    }
  }
  handleClick(e, index) {
    const { cartMood } = this.props;

    let list = this.divRef.current.children;

    if (!cartMood) {
      [...list].forEach((element) => element.classList.remove(styles.selected));
      if (![...list][index].classList.contains(styles.selected)) {
        [...list][index].classList.add(styles.selected);
      }
    }
  }
  setValues() {
    const { cartMood } = this.props;
    if (!cartMood) {
      const { attributes } = this.props.PDPProduct;
      const values = attributes.filter((item) => item.type === "swatch");
      this.setState({ values: values });
    } else {
      const { values } = this.props;
      this.setState({ values: values });
    }
  }
  render() {
    const { selectedAttributes, cartMood } = this.props;
    const { values } = this.state;
    let x;
    const s = values[0];
    if (s) {
      x =
        selectedAttributes &&
        selectedAttributes.find((item) => item.name === s.name);
    }
    return (
      <>
        {values.length > 0 &&
          values.map((value, index) => (
            <div key={index}>
              <p className={styles.text}>{value.name} :</p>
              <div ref={this.divRef}>
                {value.items.map((attribute, innerIndex) => (
                  <div
                    key={attribute.value}
                    className={
                      selectedAttributes &&
                      cartMood &&
                      attribute.value === x.value
                        ? styles.selected
                        : styles.btnContainer
                    }
                  >
                    <Button
                      color={attribute.value}
                      key={attribute.value}
                      onClick={(e) =>
                        this.passAttribute(
                          value.name,
                          attribute.value,
                          value.type,
                          e,
                          innerIndex
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  overlayFlag: state.cart.overlayFlag,
  PDPProduct: state.products.PDPProduct,
});
const mapDispatchToProps = () => ({
  setAttributes,
});
export default connect(mapStateToProps, mapDispatchToProps())(Colors);
