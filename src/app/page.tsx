import Image from 'next/image';
import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';
import { EXTERNAL_URLS } from '@/constants/externalUrls';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Profile Section */}
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <Image
              src="/profile.jpg"
              alt="Kobara Toi"
              width={240}
              height={240}
              className={styles.avatarImage}
              priority
            />
          </div>
          <h1 className={styles.name}>Kobara Toi</h1>
          <p className={styles.title}>Blockchain Developer</p>
          <p className={styles.description}>
            I'm a blockchain developer transitioning from Web2 to Web3. I build
            full-stack apps with Rails and Next.js, exploring how usability and
            decentralization can coexist.
          </p>
        </div>

        {/* Links Section */}
        <div id="links" className={styles.links}>
          <h2 className={styles.linksTitle}>Links</h2>
          <div className={styles.linksList}>
            <Link
              href={EXTERNAL_URLS.X}
              className={styles.linkItem}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.linkIcon}>
                <SocialIcon
                  url={EXTERNAL_URLS.X}
                  style={{ height: 40, width: 40 }}
                />
              </div>
              <span className={styles.linkText}>X</span>
            </Link>

            <Link
              href={EXTERNAL_URLS.ZENN}
              className={styles.linkItem}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.linkIcon}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Zenn</title>
                  <rect width="40" height="40" rx="8" fill="#3EA8FF" />
                  <path
                    d="M28 12H25.5L15 28H17.5L28 12Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M22 12L12 28H14.5L24.5 12H22Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className={styles.linkText}>Zenn</span>
            </Link>

            <Link
              href={EXTERNAL_URLS.NOTE}
              className={styles.linkItem}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.linkIcon}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Note</title>
                  <rect width="40" height="40" rx="8" fill="#41C9B4" />
                  <path d="M12 12H28V15H12V12Z" fill="white" />
                  <path d="M12 18H28V21H12V18Z" fill="white" />
                  <path d="M12 24H22V27H12V24Z" fill="white" />
                </svg>
              </div>
              <span className={styles.linkText}>Note</span>
            </Link>

            <Link
              href={EXTERNAL_URLS.GITHUB}
              className={styles.linkItem}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.linkIcon}>
                <SocialIcon
                  url={EXTERNAL_URLS.GITHUB}
                  style={{ height: 40, width: 40 }}
                />
              </div>
              <span className={styles.linkText}>GitHub</span>
            </Link>

            <Link
              href={EXTERNAL_URLS.LINKEDIN}
              className={styles.linkItem}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.linkIcon}>
                <SocialIcon
                  url={EXTERNAL_URLS.LINKEDIN}
                  style={{ height: 40, width: 40 }}
                />
              </div>
              <span className={styles.linkText}>LinkedIn</span>
            </Link>

            <Link
              href="/rss.xml"
              className={styles.linkItem}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.linkIcon}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>RSS Feed</title>
                  <rect width="40" height="40" rx="8" fill="#FFA500" />
                  <circle cx="13" cy="27" r="2.5" fill="white" />
                  <path
                    d="M10 10C21.046 10 30 18.954 30 30H27C27 20.611 19.389 13 10 13V10Z"
                    fill="white"
                  />
                  <path
                    d="M10 17C16.627 17 22 22.373 22 29H19C19 23.477 14.523 19 10 19V17Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className={styles.linkText}>RSS Feed</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
