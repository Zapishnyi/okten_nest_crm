import styles from '../components/TableHeadIRowCell/HeadRowCell.module.css';

export const tableReset = () => {
  const radio = document.getElementsByName('orderBy') as NodeListOf<HTMLInputElement>;
  const sortUp = Array.from(document.getElementsByClassName(styles.up)) as HTMLParagraphElement[];
  const sortDown = Array.from(document.getElementsByClassName(styles.down)) as HTMLParagraphElement[];
  radio.forEach(e => {
    if (e.value === 'id') {
      e.checked = true;
    }
  });
  sortUp.forEach(e => e.classList.add(styles.visible));
  sortDown.forEach(e => e.classList.remove(styles.visible));
};