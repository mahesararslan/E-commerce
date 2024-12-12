import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '@/store/slices/categorySlice';
import { RootState } from '@/store/store';
import axios from 'axios';

export const useFetchCategories = () => {
  const categories = useSelector((state: RootState) => state.category.categories);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (categories.length === 0) {
      const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
          const { data } = await axios.get('/api/categories');
          dispatch(setCategories(data.categories));
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      };

      fetchCategories();
    }
  }, [categories.length, dispatch]);

  return { categories, loading, error };
};
