import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>© br-to {currentYear}</p>
    </footer>
  );
}
