import React, { FC, useState } from 'react';

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useSearchParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { errorHandle } from '../../helpers/error-handle';
import { orderToReduced } from '../../helpers/order-to-reduced';
import IOrderReduced from '../../interfaces/IOrderReduced';
import { useAppSelector } from '../../redux/store';
import { CRMApi } from '../../services/crm.api.servise';
import { SvgExelFile } from '../SvgExelFile/SvgExelFile';
import { SvgFile } from '../SvgFile/SvgFile';

import styles from './SaveToExelFile.module.css';

const SaveToExelFile: FC = () => {
  const [query] = useSearchParams();
  const [isPending, setIsPending] = useState(false);
  const { paginationData: { total } } = useAppSelector(state => state.pagination);
  const saveToExelFileHandel = async () => {
    let orders: IOrderReduced[] = [];
    setIsPending(true);
    try {
      const { data } = await CRMApi.orders.get_all({ ...Object.fromEntries(query.entries()), limit: total.toString() });
      orders = data.map(order => orderToReduced(order));
    } catch (e) {
      errorHandle(e);
    } finally {
      setIsPending(false);
      // Add headers
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Orders');

      worksheet.columns = Object.keys(orders[0]).map(key => ({ header: key, key }));

      // Add rows
      orders.forEach(item => {
        worksheet.addRow(item);
      });

      // Write to buffer
      const buffer = await workbook.xlsx.writeBuffer();

      // Save file
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      //  Use FileSaver to prompt the Save File dialog
      saveAs(blob, `orders.xlsx`);

    }
  };
  return (
    <div className={styles.save_button} onClick={saveToExelFileHandel} title={'Save table to exel file.'}>
      {!isPending ? <SvgExelFile /> : <>
        <SvgFile />
        <ClipLoader className={styles.loader} color={'white'} size={20} />
      </>}
    </div>
  );
};

export default SaveToExelFile;