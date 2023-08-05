import { NextResponse } from "next/server";
import { connectDB } from "../../../../utils/monsoose";
import Task from "../../../../models/Task";

export async function GET(request, { params }) {
    connectDB();
    try {
        const taskFound = await Task.findById(params.id)
        if (!taskFound) return NextResponse.json({
            message: "Task not found"
        }, {
            status: 404
        })
        return NextResponse.json(taskFound)
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}

export async function PUT(request, { params }) {
    connectDB();
    try {
        const data = await request.json();
        const updatedTask = await Task.findByIdAndUpdate(params.id, data, { new: true })
        if (!updatedTask) return NextResponse.json({
            message: "Task not found"
        }, {
            status: 404
        })
        return NextResponse.json(updatedTask)
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}

export async function DELETE(request, { params }) {
    connectDB();
    try {
        const deletedTask = await Task.findByIdAndDelete(params.id)
        if (!deletedTask) return NextResponse.json({
            message: "Task not found"
        }, {
            status: 404
        })
        return NextResponse.json(deletedTask)
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}