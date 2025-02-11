"use client";

import type { FC } from "react";

import { Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import styles from "./AdminDashboard.module.css";

type Props = {
	posts: {
		title: string;
		content: string;
		id: number;
	}[];
};

const AdminDashboard: FC<Props> = ({ posts }) => {
	// const handlePosts = async (values: {
	// 	title: string;
	// 	content: string;
	// }) => {
	// 	await fetch("/api/posts", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ values }),
	// 	});
	// };

	const handleUpdate = async (
		values: {
			title: string;
			content: string;
		},
		id: number,
	) => {
		await fetch(`/api/posts/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ values }),
		});
	};

	const handleDelete = async (id: number) => {
		await fetch(`/api/posts/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	return (
		<div className={styles["admin-dashboard"]}>
			<Heading as="h1" size="8">
				記事一覧画面
			</Heading>
			<Grid gap="4" mt="4">
				{posts.map((post) => (
					<Card key={post.id}>
						<Flex justify="between" align="center">
							<Flex direction="column">
								<Heading as="h2">{post.title}</Heading>
								<Text>{post.content}</Text>
							</Flex>
							<Flex gap="2">
								<Button
									onClick={() => {
										handleUpdate(
											{
												title: "kobara",
												content: "oraoraora!!!",
											},
											post.id,
										);
									}}
								>
									編集
								</Button>
								<Button
									onClick={() => {
										handleDelete(post.id);
									}}
								>
									削除
								</Button>
							</Flex>
						</Flex>
					</Card>
				))}
			</Grid>
		</div>
	);
};

export default AdminDashboard;
