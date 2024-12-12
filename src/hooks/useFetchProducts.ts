import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '@/store/slices/productSlice';
import { RootState } from '@/store/store';
import axios from 'axios';

export const useFetchProducts = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (products.length === 0) {
      const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
          const { data } = await axios.get('/api/products');
          dispatch(setProducts(data.products));
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [products.length, dispatch]);

  return { products, loading, error };
};
