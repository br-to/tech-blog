'use client';

import Image from 'next/image';
import styles from './ShareButtons.module.css';

type Props = {
  url: string;
  title: string;
};

export const ShareButtons = ({ url, title }: Props) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Share this post</h2>
      <div className={styles.buttons}>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          className={styles.button}
          aria-label="Share on Twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/twitter.svg"
            alt="Twitter"
            width={24}
            height={24}
            className={styles.icon}
          />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          className={styles.button}
          aria-label="Share on Facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/facebook.svg"
            alt="Facebook"
            width={24}
            height={24}
            className={styles.icon}
          />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          className={styles.button}
          aria-label="Share on LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/linkedin.png"
            alt="LinkedIn"
            width={24}
            height={24}
            className={styles.icon}
          />
        </a>
      </div>
    </div>
  );
};