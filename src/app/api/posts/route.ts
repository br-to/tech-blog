import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const { data, error } = await supabase
			.from("posts")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ data }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ error: "Something went wrong." },
			{ status: 500 },
		);
	}
}

export async function POST(req: Request) {
	if (req.method !== "POST") {
		return NextResponse.json(
			{
				error: "Method not allowed.",
			},
			{
				status: 405,
			},
		);
	}

	try {
		const { values } = await req.json();

		const { data, error } = await supabase
			.from("posts")
			.insert([{ title: values.title, content: values.content }])
			.select();

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ data }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ error: "Something went wrong." },
			{ status: 500 },
		);
	}
}
