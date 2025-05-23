// ProductList.jsx
import ProductCard from "./ProductCard";

const ProductList = ({ product , query , searchQuery }) => {
  return (
    <div className="container mP">
      {
        searchQuery && <p className="text-muted ">Result search for "{ query }"</p>
      }
      <div className="row">
        {product.map((item, index) => (
          <ProductCard key={index} item={item} fromWishlist={false}/>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
