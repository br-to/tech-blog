'use client';

import { SocialIcon } from 'react-social-icons';
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
          <SocialIcon
            network="x"
            style={{ width: 32, height: 32 }}
            bgColor="transparent"
            fgColor="var(--color-text)"
          />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          className={styles.button}
          aria-label="Share on Facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialIcon
            network="facebook"
            style={{ width: 32, height: 32 }}
            bgColor="transparent"
            fgColor="var(--color-text)"
          />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          className={styles.button}
          aria-label="Share on LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialIcon
            network="linkedin"
            style={{ width: 32, height: 32 }}
            bgColor="transparent"
            fgColor="var(--color-text)"
          />
        </a>
      </div>
    </div>
  );
};
