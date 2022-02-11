import React, { createRef, useEffect, useState } from "react";
import arrow from "../imgs/arrow.png";
import ProductCard from "./ProductCard";
import "./ProductsWithBrand.scss";

const ProductsWithBrand = (props) => {
  const { brandname, products } = props;
  const [filterdProducts, setFilterProducts] = useState(products);
  const [showScrollArrows, setScrollArrows] = useState(false);
  const wrapperREF = createRef(null);
  let scrollCounter = 0;

  useEffect(() => {
    let filterd = products.filter(
      (product) => product.brand_name === brandname
    );
    setFilterProducts(filterd);
  }, [products]);

  useEffect(() => {
    if (wrapperREF && wrapperREF.current) {
      const { scrollWidth, clientWidth } = wrapperREF.current;
      scrollWidth > clientWidth
        ? setScrollArrows(true)
        : setScrollArrows(false);
    }
  }, [wrapperREF]);

  const handleScroll = () => {
    let ul = wrapperREF.current;

    scrollCounter >= ul.scrollWidth
      ? (scrollCounter = 0)
      : (scrollCounter += 400);
    ul.scrollTo({
      left: scrollCounter,
      behavior: "smooth",
    });
  };

  if (filterdProducts.length) {
    return (
      <div className="product-with-brand">
        <h3 className="title-3 custom-h">{brandname}</h3>
        <div className="wrap-scroller-products">
          <ul className="wrap-products" ref={wrapperREF}>
            {filterdProducts.map((product) => (
              <li key={Math.random()}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
          {showScrollArrows && (
            <img
              src={arrow}
              className="arrow"
              alt="arrow"
              width="28px"
              height="35px"
              onClick={handleScroll}
            />
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ProductsWithBrand;
