import styles from "./Chip.module.css";

type Props = {
	text: string;
};

export function Chip({ text }: Props) {
	return <p className={styles.chip}>{text}</p>;
}
