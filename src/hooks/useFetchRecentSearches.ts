import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { setRecentSearches } from '@/store/slices/recentSearchesSlice';

export const useFetchRecentSearches = () => {
  const recentSearches = useSelector((state: RootState) => state.RecentSearches.searches);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (recentSearches.length === 0 && session?.user?.email) {
      const fetchRecentSearches = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`/api/user`);
          console.log("RecentSearches from hook: ",response.data.recentSearches)
          dispatch(setRecentSearches(response.data.recentSearches));
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      };

      fetchRecentSearches();
    }
  }, [recentSearches.length, session, dispatch]);

  return { recentSearches, loading, error };
};
