import { useEffect, useState } from "react";
import axios from "axios";
import DropdownFilters from "./components/DropdownFilters";
import ProductsWithBrand from "./components/ProductsWithBrand";
import "./App.scss";
import Loading from "./components/Loading";

function App() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [brands, setBrands] = useState(new Set());
  const [form, setForm] = useState({
    productName: "",
    productState: "",
    productCity: "",
  });
  const [error, setError] = useState(false);

  // Get Data From URL

  useEffect(() => {
    axios
      .get("https://assessment-edvora.herokuapp.com")
      .then(({ data }) => {
        if (data) {
          let tempArray = brands;
          setProducts(data);

          data.forEach((product) => {
            tempArray.add(product.brand_name);
          });
          setBrands(tempArray);
          setDisplayedProducts(data);
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  // Filter Data depend on filter values

  useEffect(() => {
    const { productName, productCity, productState } = form;

    if (!productName) {
      setDisplayedProducts(products);
    }

    if (productName) {
      setDisplayedProducts(
        products.filter(({ product_name }) => product_name === productName)
      );
    }

    if (productState) {
      productName
        ? setDisplayedProducts(
            products.filter(
              ({ address, product_name }) =>
                product_name === productName && address.state === productState
            )
          )
        : setDisplayedProducts(
            products.filter(({ address }) => address.state === productState)
          );
    }

    if (productCity) {
      if (productName) {
        setDisplayedProducts(
          products.filter(
            ({ address, product_name }) =>
              product_name === productName && address.city === productCity
          )
        );
      } else if (productName && productState) {
        setDisplayedProducts(
          products.filter(
            ({ address, product_name }) =>
              product_name === productName &&
              address.state === productState &&
              address.city === productCity
          )
        );
      } else {
        setDisplayedProducts(
          products.filter(({ address }) => address.city === productCity)
        );
      }
    }
  }, [form]);

  if (products.length) {
    return (
      <div className="App">
        <aside className="sidebar">
          <div className="box black filter-wrap">
            <h4 className="custom-h title">Filters</h4>
            <DropdownFilters
              filtersState={{ form, setForm }}
              products={products}
            />
          </div>
        </aside>
        <section className="mainbar">
          <article>
            <h2 className="custom-h title-1">Edvora</h2>
            <p className="title-2">
              {displayedProducts.length < products.length
                ? "Filterd Products"
                : "Products"}
            </p>
          </article>
          {[...brands].map((brand, index) => (
            <ProductsWithBrand
              key={index}
              brandname={brand}
              products={displayedProducts}
            />
          ))}
        </section>
      </div>
    );
  } else if (error) {
    let center = { textAlign: "center" };
    return [
      <h2 key={Math.random()} style={center}>
        Something wrong
      </h2>,
      <p key={Math.random()} style={center}>
        Open The Console Log
      </p>,
    ];
  } else {
    return <Loading />;
  }
}

export default App;
