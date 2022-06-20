import API from 'consts/api';
import PAGES from 'consts/pages';
import { GlobalContext } from 'context/GlobalProvider';
import axios from 'lib/axios';
import {
  useCallback, useContext
} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useEffectOnce from './useEffectOnce';
import useLoading from './useLoading';
import useAlert from './useAlert';

const useCatDetail = () => {
  const { catId } = useParams();
  const { setError } = useAlert();
  const { isLoading, setLoading } = useLoading();
  const { store, setStore } = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();

  const getCatDetail = useCallback(() => {
    if (isLoading('detail')) {
      return;
    }

    setLoading('detail', true);

    axios().get(API.CAT_DETAIL(catId))
      .then((res) => {
        setStore((prev) => ({ ...prev, detail: { ...prev.detail, data: res.data } }));
      })
      .catch(() => {
        setError('detail', true);
      })
      .finally(() => {
        setLoading('detail', false);
      });
  }, [isLoading, setLoading, catId, setStore, setError]);

  useEffectOnce(() => {
    getCatDetail();
  });

  const handleBack = (e) => {
    e.preventDefault();
    navigate({ pathname: PAGES.HOME, search: location.state.search });
  };

  return {
    isLoading,
    handleBack,
    catDetail: store?.detail.data,
  };
};

export default useCatDetail;
