import API from 'consts/api';
import PAGES from 'consts/pages';
import { GlobalContext } from 'context/GlobalProvider';
import axios from 'lib/axios';
import {
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAlert from './useAlert';
import useEffectOnce from './useEffectOnce';
import useLoading from './useLoading';

/**
 * Custom hook for getting breeds and searching breeds
 */
const useBreeds = () => {
  const { store, setStore } = useContext(GlobalContext);
  const { setError } = useAlert();
  const { isLoading, setLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const search = new URLSearchParams(location.search);
  const selectedBreed = search.get('breed');

  const getBreeds = useCallback(() => {
    if (isLoading('breeds')) {
      return;
    }

    setLoading('breeds', true);

    axios().get(API.BREEDS)
      .then((res) => {
        setStore((prev) => ({ ...prev, breeds: { ...prev.breeds, data: res.data } }));
      })
      .catch(() => {
        setError('breeds', true);
      })
      .finally(() => {
        setLoading('breeds', false);
      });
  }, [isLoading, setError, setLoading, setStore]);

  useEffectOnce(() => {
    // get breeds on first mount
    getBreeds();
  });

  const searchBreeds = useCallback(() => {
    if (isLoading('search')) {
      return;
    }

    setLoading('search', true);

    const params = {
      page,
      limit: 10,
      breed_ids: selectedBreed
    };

    axios().get(API.IMAGE_SEARCH, { params })
      .then((res) => {
        let arr = [...res.data];
        if (page > 1) {
          arr = [...store.search.data, ...res.data];
        }

        const arrUniq = [...new Map(arr.map((v) => [v.id, v])).values()];

        if (res.headers['pagination-count'] === arrUniq.length.toString()) {
          setIsLastPage(true);
        }

        setStore((prev) => ({ ...prev, search: { ...prev.search, data: arrUniq } }));
      })
      .catch(() => {
        setError('search', true);
      })
      .finally(() => {
        setLoading('search', false);
      });
  }, [isLoading, setLoading, page, selectedBreed, setStore, store.search, setError]);

  useEffect(() => {
    // search breeds on breed change and page
    if (selectedBreed) {
      searchBreeds();
    } else {
      setStore((prev) => ({ ...prev, search: { ...prev.search, data: [] } }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBreed, page]);

  const onChangeBreed = (e) => {
    // onChange breed, reset states
    setPage(1);
    setIsLastPage(false);
    if (e.target.value) {
      const newSearch = new URLSearchParams({ breed: e.target.value });
      navigate({ pathname: PAGES.HOME, search: newSearch.toString() });
    } else {
      navigate({ pathname: PAGES.HOME });
    }
  };

  const loadMore = (e) => {
    // increase page counter when load more button is clicked
    e.preventDefault();
    setPage((prev) => prev + 1);
  };

  return {
    isLoading,
    isLastPage,
    selectedBreed,
    breeds: store?.breeds?.data,
    searchBreeds: store?.search?.data,
    onChangeBreed,
    loadMore
  };
};

export default useBreeds;
