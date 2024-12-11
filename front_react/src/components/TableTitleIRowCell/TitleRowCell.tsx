import React, { ChangeEvent, FC, MouseEvent, MutableRefObject, useEffect } from 'react';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';
import { sortToggle } from '../../helpers/sort-toggle';
import { SortEnum } from '../../enums/sort.enum';

interface IProps {
  cellName: string;
  setQuery: SetURLSearchParams;
  chosenColumnRef: MutableRefObject<string>;
}

const TitleRowCell: FC<IProps> = ({ cellName, setQuery, chosenColumnRef }) => {
  console.log('.');
  useEffect(() => {
    const radio = document.getElementsByName('orderBy') as NodeListOf<HTMLInputElement>;
    radio.forEach(e => {
      if (e.value === 'id') {
        e.checked = true;
      }
    });
  }, []);

  const queryParams = useSearchParams();

  const changeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const queryModified = { ...Object.fromEntries(queryParams[0].entries()), sortBy: event.currentTarget.value };
    queryParams[1](queryModified);
  };

  const clickHandle = (event: MouseEvent<HTMLInputElement>) => {
    const sortUp = Array.from(document.getElementsByClassName('up')) as HTMLParagraphElement[];
    const sortDawn = Array.from(document.getElementsByClassName('down')) as HTMLParagraphElement[];
    if (chosenColumnRef.current === event.currentTarget.value) {
      const queryModified = {
        ...Object.fromEntries(queryParams[0].entries()),
        sort: sortToggle((queryParams[0].get('sort')) as SortEnum),
      };
      queryParams[1](queryModified);
      sortUp.forEach(e => e.classList.toggle('visible'));
      sortDawn.forEach(e => e.classList.toggle('visible'));
    }
    chosenColumnRef.current = event.currentTarget.value;
  };
  return <th>
    <label>
      <input className={'title'} onClick={clickHandle} onChange={changeHandle} type="radio"
             value={cellName} name={'orderBy'} /> {cellName}
      <p className={'down'}>{'\u25BE'}</p>
      <p className={'up visible'}>{'\u25B4'}</p>
    </label>
  </th>;
};

export default TitleRowCell;