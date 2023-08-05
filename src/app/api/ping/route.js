import { NextResponse } from "next/server";
import { connectDB } from "../../../utils/monsoose";

export function GET() {
    connectDB()
    return NextResponse.json({
        message: 'Hello World!'
    })
}