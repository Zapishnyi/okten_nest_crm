import React, { FC } from 'react';

import { useSearchParams } from 'react-router-dom';

import { errorHandle } from '../../helpers/error-handle';
import { useAppSelector } from '../../redux/store';
import { CRMApi } from '../../services/crm.api.servise';
import { SvgSaveDocument } from '../SvgSaveDocument/SvgSaveDocument';

import styles from './SaveToExelFile.module.css';

const SaveToExelFile: FC = () => {
  const [query] = useSearchParams();
  const { paginationData: { total } } = useAppSelector(state => state.pagination);
  const saveToExelFileHandel = async () => {
    try {
      const orders = CRMApi.orders.get_all({ ...Object.fromEntries(query.entries()), limit: total.toString() });
      console.log('orders:', orders);
    } catch (e) {
      errorHandle(e);
    }
  };
  return (
    <div className={styles.save_button} onClick={saveToExelFileHandel}>
      <SvgSaveDocument />
    </div>
  );
};

export default SaveToExelFile;