import { FC } from 'react';

import { SyncLoader } from 'react-spinners';

import styles from './BtnLoader.module.css';

interface IProps {
  loadingState: boolean;
}

const BtnLoader: FC<IProps> = ({ loadingState }) => {
  return <div className={styles.loader_container}>
    <SyncLoader
      color={'#000303'}
      loading={loadingState}
      size={8}
    />
  </div>;
};

export default BtnLoader;