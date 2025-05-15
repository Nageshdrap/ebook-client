// productDisplay.jsx
import { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./spinner";
import Pagination from "./pagination";
import Loader from "./loader";

const ProductList = lazy(() => import('./ProductList'));

export function ProductDisplay() {
  let [product, setproduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [seed, setSeed] = useState(Math.random().toFixed(2));
  const [loading, setLoading] = useState(false);

  async function LoadProducts() {
    setLoading(true);
    try {
      const Res = await axios.get(`https://ebook-server-4izu.onrender.com/api/product?page=${page}?seed=${seed}`);
      setproduct(Res.data.products);
      setTotalPage(Res.data.totalPage);
      setSeed(Res.data.seed);
    } catch (error) {
      console.log('error fetching', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    LoadProducts();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [page]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <Spinner />
        </div>
      ) : (
        <Suspense fallback={<Loader loading={true} />}>
          <ProductList product={product} />
          <Pagination totalPage={totalPage} page={page} setPage={setPage} />
        </Suspense>
      )}
    </>
  );
}


export default ProductDisplay;