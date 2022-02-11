import { useState, useEffect } from "react";
import "./DropdownFilter.scss";
import { ProductOptions } from "./ProductOptions";

const DropdownFilters = (props) => {
  const {
    products,
    filtersState: { form, setForm },
  } = props;

  const [updatedProducts, setUpdatedProducts] = useState({
    productsWithName: [],
    productsWithState: [],
  });

  const handleChangesFunction = (e, changedValue) => {
    let newFormValues = { ...form };
    if (changedValue === "productName") {
      newFormValues[changedValue] = e.target.value;
      newFormValues.productState = "";
      newFormValues.productCity = "";
    } else {
      newFormValues[changedValue] = e.target.value;
    }
    setForm(newFormValues);
  };

  const productNameHandle = (e) => handleChangesFunction(e, "productName");

  const productStateHandle = (e) => handleChangesFunction(e, "productState");

  const productCityHandle = (e) => handleChangesFunction(e, "productCity");

  const filterProducts = () => {
    if (form.productName) {
      let filterd = products.filter(
        (product) => product.product_name === form.productName
      );

      updatedProducts.productsWithName = filterd;
      updatedProducts.productsWithState = filterd;

      setUpdatedProducts({
        ...updatedProducts,
      });
    }

    if (form.productState) {
      let willFilter = form.productName
        ? updatedProducts.productsWithName
        : products;
      let filterd = willFilter.filter(
        (product) => product.address.state === form.productState
      );

      updatedProducts.productsWithState = filterd;

      setUpdatedProducts({
        ...updatedProducts,
      });
    }
  };

  useEffect(() => filterProducts(), [form]);

  return (
    <form className="wrap-dropdowns">
      <select name="products_name" onChange={productNameHandle}>
        <option value="">Products</option>
        <ProductOptions productName products={products} />
      </select>

      <select name="products_state" onChange={productStateHandle}>
        <option value="">State</option>
        <ProductOptions
          productState
          products={
            form.productName ? updatedProducts.productsWithName : products
          }
        />
      </select>

      <select name="products_city" onChange={productCityHandle}>
        <option value="">City</option>
        <ProductOptions
          productCity
          products={
            form.productName || form.productState
              ? updatedProducts.productsWithState
              : products
          }
        />
      </select>
    </form>
  );
};

export default DropdownFilters;
