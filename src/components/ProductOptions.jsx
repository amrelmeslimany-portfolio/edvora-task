import { useState, useEffect } from "react";

export const ProductOptions = (props) => {
  const {
    products = [],
    productName = null,
    productState = null,
    productCity = null,
  } = props;

  /* 
  
  ---- Thtis Comment For Unrepeated Value
 
  const [filterdOptions, setFilterdOptions] = useState(new Set());
  useEffect(() => {
    let tempArray = new Set();
    products.forEach(({ product_name, address }) => {
      if (productName) {
        tempArray.add(product_name);
      } else if (productState) {
        tempArray.add(address.state);
      } else if (productCity) {
        tempArray.add(address.city);
      }
    });
    setFilterdOptions(tempArray);
  }, []);

  const productsOptions = [...filterdOptions].map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  )); 
  
  */

  const productsOptions = products.map(({ product_name, time, address }) => {
    const { state, city } = address;
    if (productName) {
      return (
        <option key={time + product_name} value={product_name}>
          {product_name}
        </option>
      );
    } else if (productState) {
      return (
        <option key={time + product_name} value={state}>
          {state}
        </option>
      );
    } else if (productCity) {
      return (
        <option key={time + product_name} value={city}>
          {city}
        </option>
      );
    }
  });

  return <>{productsOptions}</>;
};
