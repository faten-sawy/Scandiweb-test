import React, { PureComponent } from "react";
import { getCurrency } from "../../assets/utilize";
import { CurrencyQuery } from "../../Queries";
import { connect } from "react-redux";
import styles from "./Currencies.module.css";
import arrowSrc from "../../assets/icons/arrow.png";
import { getSymbol } from "../../Redux/actions/symbol";

export class Currencies extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      flag: false,
    };

    this.listRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.updateCurrency();
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.symbol !== this.props.symbol) {
      this.updateCurrency();
    }
  }
  handleShow() {
  
    this.setState({ flag: !this.state.flag });
  }
  handleCurrency(symbol) {
   
    this.props.getSymbol(symbol);
    this.setState({ flag: !this.state.flag });
   
  }
  updateCurrency() {
    getCurrency(CurrencyQuery).then((response) =>
      this.setState({
        data: response.filter((item) => item.symbol !== this.props.symbol),
      })
    );
  }
  handleClickOutside(event) {
   
    if (this.listRef.current && !this.listRef.current.contains(event.target)) {
      this.setState({ flag: false });
   
    }
  }
  render() {
    const { symbol } = this.props;

    return (
      <ul ref={this.listRef} className={styles.list}>
        <li onClick={() => this.handleShow()}>
          {symbol}
          <img src={arrowSrc} alt="currency symbol" />
        </li>
        <div
          className={styles.inner}
        >
          {this.state.flag &&
            this.state.data?.map((item, index) => (
              <li
                key={index}
                onClick={() => this.handleCurrency(item.symbol)}
              >{`${item.symbol} ${item.label}`}</li>
            ))}
        </div>
      </ul>
    );
  }
}
const mapStateToProps = (state) => ({
  symbol: state.symbol,
  overlayFlag: state.cart.overlayFlag,
});
const mapDispatchToProps = () => ({ getSymbol });

export default connect(mapStateToProps, mapDispatchToProps())(Currencies);
