import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styles from "./Sizes.module.css";
import { setAttributes } from "../../Redux/actions/cart";

export class Sizes extends PureComponent {
  constructor() {
    super();
    this.testRef = React.createRef();
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

  passAttribute(name, value, type, e) {
    const { selectedAttributes, overlayFlag, cartMood } = this.props;
    const element = e.target;

    let selectedType = e.target.dataset.type.replace(/ /g, "");
    let list = document.querySelectorAll(`[data-type~=${selectedType}]`);
    if (!cartMood) {
      [...list].forEach((element) => element.classList.remove(styles.selected));
      if (!element.classList.contains(styles.selected)) {
        element.classList.add(styles.selected);
      }
    }

    if (!selectedAttributes) {
      this.props.passAttributeToCart({ name, type, value });
      this.props.setAttributes({ name, type, value });
    } else if (overlayFlag) {
      return;
    }
  }
  setValues() {
    const { cartMood } = this.props;
    if (!cartMood) {
      const { attributes } = this.props;
      const values = attributes?.filter((item) => item.type === "text");
      this.setState({ values: values });
    } else {
      const { values } = this.props;
      this.setState({ values: values });
    }
  }
  render() {
    const { selectedAttributes, cartMood } = this.props;
    const { values } = this.state;
    return (
      <>
        {values?.map((value, index) => (
          <div key={index}>
            <p className={styles.text}>{value.name} :</p>
            <div ref={this.testRef}>
              {value.items.map((attribute) => (
                <div
                  id="test"
                  key={attribute.value}
                  className={styles.btnContainer}
                >
                  <button
                    data-type={value.name.replace(/ /g, "")}
                    className={
                      selectedAttributes &&
                      cartMood &&
                      value.name === selectedAttributes[index].name &&
                      attribute.value === selectedAttributes[index].value
                        ? styles.selected
                        : styles.btn
                    }
                    key={attribute.value}
                    onClick={(e) =>
                      this.passAttribute(
                        value.name,
                        attribute.value,
                        value.type,
                        e
                      )
                    }
                  >
                    {attribute.value}
                  </button>
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
});
const mapDispatchToProps = () => ({
  setAttributes,
});
export default connect(mapStateToProps, mapDispatchToProps())(Sizes);
