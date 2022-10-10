import React, { PureComponent } from "react";
import styles from "./Images.module.css";
import styled from "styled-components";

export class ImagesList extends PureComponent {
  state = {
    imageIndex: 0,
  };
  handleImageShow(index) {
    this.setState({ imageIndex: index });
  }
  render() {
    const { gallery, inStock } = this.props;
    return (
      <div className={styles.imagesContainer}>
        <div className={styles.smallImages}>
          {gallery?.map((item, index) => (
            <img
              key={index}
              src={item}
              alt="images"
              onClick={() => this.handleImageShow(index)}
            />
          ))}
        </div>
        <div className={styles.bannerImage}>
          <Image
            inStock={inStock}
            src={gallery[this.state.imageIndex]}
            alt="product banner"
          />
          {!inStock && <p>Out Of stock</p>}
        </div>
      </div>
    );
  }
}
const Image = styled.img`
  width: 100%;
  height: 100%;
  opacity: ${({ inStock }) => !inStock && "0.3"};
`;

export default ImagesList;
