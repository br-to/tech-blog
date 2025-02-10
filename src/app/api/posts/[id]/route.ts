import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		const { id } = params;

		if (!id) {
			return NextResponse.json({ error: "ID is required" }, { status: 400 });
		}

		const { values } = await req.json();

		const { error } = await supabase
			.from("posts")
			.update({ title: values.title, content: values.content })
			.eq("id", Number(id));

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json(
			{ message: "Updated successfully" },
			{ status: 200 },
		);
	} catch (err) {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}

export async function DELETE(
	_: Request,
	{ params }: { params: { id: string } },
) {
	try {
		const { id } = params;

		if (!id) {
			return NextResponse.json({ error: "ID is required" }, { status: 400 });
		}

		const { error } = await supabase.from("posts").delete().eq("id", id);

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json(
			{ message: "Deleted successfully" },
			{ status: 200 },
		);
	} catch (err) {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}
