import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWishlist } from '@/store/slices/wishlistSlice';
import { RootState } from '@/store/store';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export const useFetchWishlist = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (wishlist.length === 0 && session?.user?.email) {
      const fetchWishlistProducts = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`/api/user`);
          dispatch(setWishlist(response.data.wishlist));
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      };

      fetchWishlistProducts();
    }
  }, [wishlist.length, session, dispatch]);

  return { wishlist, loading, error };
};
