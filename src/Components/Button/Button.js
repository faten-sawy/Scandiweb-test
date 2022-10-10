import React, { PureComponent } from "react";

export class Button extends PureComponent {
  render() {
    const { text, btnClass, handleClicked} = this.props;
    return (
      <button
        className={btnClass}
        onClick={handleClicked && (() => this.props.handleClicked())}
      >
        {text}
      </button>
    );
  }
}

export default Button;
