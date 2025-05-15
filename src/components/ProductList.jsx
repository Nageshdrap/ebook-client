// ProductList.jsx
import ProductCard from "./ProductCard";

const ProductList = ({ product }) => {
  return (
    <div className="container mP">
      <div className="row">
        {product.map((item, index) => (
          <ProductCard key={index} item={item} fromWishlist={false}/>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
