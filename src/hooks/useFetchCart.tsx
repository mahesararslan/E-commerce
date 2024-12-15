import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '@/store/slices/cartSlice';
import { RootState } from '@/store/store';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export const useFetchCart = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (cart.length === 0 && session?.user?.email) {
      const fetchCartProducts = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`/api/user`);
          dispatch(setCart(response.data.cart));
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      };

      fetchCartProducts();
    }
  }, [cart.length, session, dispatch]);

  return { cart, loading, error };
};
