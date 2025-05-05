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

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      '_blank'
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      '_blank'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      '_blank'
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Share this post</h2>
      <div className={styles.buttons}>
        <button
          onClick={shareOnTwitter}
          className={styles.button}
          aria-label="Share on Twitter"
        >
          <Image
            src="/twitter.svg"
            alt="Twitter"
            width={24}
            height={24}
            className={styles.icon}
          />
        </button>
        <button
          onClick={shareOnFacebook}
          className={styles.button}
          aria-label="Share on Facebook"
        >
          <Image
            src="/facebook.svg"
            alt="Facebook"
            width={24}
            height={24}
            className={styles.icon}
          />
        </button>
        <button
          onClick={shareOnLinkedIn}
          className={styles.button}
          aria-label="Share on LinkedIn"
        >
          <Image
            src="/linkedin.png"
            alt="LinkedIn"
            width={24}
            height={24}
            className={styles.icon}
          />
        </button>
      </div>
    </div>
  );
};