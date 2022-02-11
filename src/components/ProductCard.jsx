import React from "react";
import "./ProductCard.scss";
const ProductCard = (props) => {
  const { product } = props;
  let { address, brand_name, product_name, date, image, price, discription } =
    product;
  date = new Date(date);

  const validateNumber = (number) => (number < 10 ? `0${number}` : number);
  return (
    <>
      <div className="product-header">
        <div className="product-img">
          <img src={image} width="100%" alt="toote" />
        </div>
        <div className="product-intro">
          <h3 className="product-intro-name">{product_name}</h3>
          <p className="product-intro-brand">{brand_name}</p>
          <strong className="product-intro-price">$ {price}</strong>
        </div>
      </div>

      <div className="product-info">
        <small className="info-location">
          {address.state}, <br /> {address.city}
        </small>
        <small className="info-date">
          Date: {validateNumber(date.getDay())}:
          {validateNumber(date.getMonth())}:{validateNumber(date.getFullYear())}
        </small>
      </div>

      <p className="product-descrption">{discription}</p>
    </>
  );
};

export default ProductCard;
