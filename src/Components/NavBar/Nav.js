import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getAllData } from "../../Redux/actions/category";
import { setOverlayCart } from "../../Redux/actions/cart";
import styles from "./Nav.module.css";
import Currencies from "../CurrencyList/Currencies";
import { getAllCategories } from "../../assets/utilize";
import { CategoriesQuery } from "../../Queries";

import CartOverlay from "../CartOverlay/CartOverlay";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Brand icon.png"
export class NavBar extends PureComponent {
  state = {
    categories: [],
  };
  componentDidMount() {
    getAllCategories(CategoriesQuery).then((response) =>
      this.setState({ categories: response })
    );
  }
  handleCategory(category) {
    this.props.getAllData(category);
  }
  render() {
    const { categoryType } = this.props;
    return (
      <div className={styles.nav}>
        <ul>
          {this.state.categories?.map((item, index) => (
            <Link to="/" key={index}>
              <li
                className={
                  item.name === categoryType
                    ? styles.clicked
                    : styles.nonClicked
                }
                key={index}
                onClick={() => this.handleCategory(item.name)}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
        <img src={logo} alt="logo" className={styles.logo} />
        <div>
          <div className={styles.rightSide}>
            <Currencies />
            <CartOverlay />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  categoryType: state.categoryType,
});
const mapDispatchToProps = () => ({
  getAllData,
  setOverlayCart,
});

export default connect(mapStateToProps, mapDispatchToProps())(NavBar);
