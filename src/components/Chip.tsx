import Link from 'next/link';
import styles from './Chip.module.css';

type Props = {
  text: string;
};

export const Chip = ({ text }: Props) => {
  return (
    <Link
      href={`/category/${encodeURIComponent(text)}/`}
      className={styles.chip}
    >
      {text}
    </Link>
  );
};
