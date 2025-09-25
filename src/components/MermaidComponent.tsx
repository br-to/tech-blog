"use client";

import mermaid from "mermaid";
import { useEffect, useRef } from "react";
import styles from "./MermaidComponent.module.css";

interface MermaidProps {
	chart: string;
}

export const MermaidComponent = ({ chart }: MermaidProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Mermaidの初期化
		mermaid.initialize({
			startOnLoad: false,
			theme: "default",
			securityLevel: "strict",
		});

		const renderChart = async () => {
			if (ref.current) {
				try {
					// 既存の内容をクリア
					ref.current.innerHTML = "";

					// ユニークなIDを生成
					const id = `mermaid-${crypto.randomUUID()}`;

					// Mermaidチャートをレンダリング
					const { svg } = await mermaid.render(id, chart);
					ref.current.innerHTML = svg;
				} catch (error) {
					console.error("Mermaid rendering error:", error);
					ref.current.innerHTML = `<pre>${chart}</pre>`;
				}
			}
		};

		renderChart();
	}, [chart]);

	return <div ref={ref} className={styles["mermaid-wrapper"]} />;
};
