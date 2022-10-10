import React, { createContext, PureComponent } from "react";
import {
  Container,
  CardImage,
  CardPrice,
  CardTitle,
  CardLabel,
  CardRow,
  CartButton,
} from "./styles/card";
import icon from "../../assets/icons/Vector.png";

/*create context */
const UserContext = createContext();
const UserProvider = UserContext.Provider;

export default class CustomCard extends PureComponent {
  render() {
    const { children, RedirectFunc, ...restProps } = this.props;
    return (
      <UserProvider value={{}}>
        <Container {...restProps}>{children}</Container>
      </UserProvider>
    );
  }
}
CustomCard.Image = class Image extends PureComponent {
  static contextType = UserContext;

  componentDidMount() {
    const user = this.context;
    if (!user) {
      throw new Error(
        "Child components of customCard can't be render outside customCard Component !"
      );
    }
  }
  render() {
    const { src, alt, ...restProps } = this.props;
    return <CardImage src={src} alt={alt} {...restProps} />;
  }
};
CustomCard.Name = class Name extends PureComponent {
  static contextType = UserContext;

  componentDidMount() {
    const user = this.context;
    if (!user) {
      throw new Error(
        "Child components of customCard can't be render outside customCard Component !"
      );
    }
  }

  render() {
    const { children, ...restProps } = this.props;

    return <CardTitle {...restProps}>{children}</CardTitle>;
  }
};
CustomCard.Price = class Price extends PureComponent {
  static contextType = UserContext;

  componentDidMount() {
    const user = this.context;
    if (!user) {
      throw new Error(
        "Child components of customCard can't be render outside customCard Component !"
      );
    }
  }
  render() {
    const { children, ...restProps } = this.props;
    return <CardPrice {...restProps}>{children}</CardPrice>;
  }
};
CustomCard.Label = class Label extends PureComponent {
  static contextType = UserContext;

  componentDidMount() {
    const user = this.context;
    if (!user) {
      throw new Error(
        "Child components of customCard can't be render outside customCard Component !"
      );
    }
  }
  render() {
    const { children, ...restProps } = this.props;
    return <CardLabel {...restProps}>{children}</CardLabel>;
  }
};
CustomCard.Row = class Row extends PureComponent {
  static contextType = UserContext;

  componentDidMount() {
    const user = this.context;
    if (!user) {
      throw new Error(
        "Child components of customCard can't be render outside customCard Component !"
      );
    }
  }
  render() {
    const { children, ...restProps } = this.props;
    return <CardRow {...restProps}>{children}</CardRow>;
  }
};
CustomCard.CartBtn = class CartBtn extends PureComponent {
  static contextType = UserContext;

  componentDidMount() {
    const user = this.context;
    if (!user) {
      throw new Error(
        "Child components of customCard can't be render outside customCard Component !"
      );
    }
  }
  render() {
    const { btnClass, handleClicked, ...restProps } = this.props;
    return (
      <CartButton {...restProps} onClick={handleClicked}>
        <img src={icon} alt="cart" />
      </CartButton>
    );
  }
};
