import { FC } from 'react';

import styles from './ErrorContainer.module.css';
import ErrorItem from './ErrorItem/ErrorItem';

interface IProps {
  errors: string[];
}

const ErrorsContainer: FC<IProps> = ({ errors }) => {
  return <div className={styles.error_container}>
    <div><p>Errors list:</p></div>
    <ul>{errors.map((e, i) => <ErrorItem key={i} errorMessage={e} />)}</ul>
  </div>;
};

export default ErrorsContainer;