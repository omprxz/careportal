import { NextResponse } from "next/server";

export function GET(req){
    const randomNum = Math.random()
    return NextResponse.json({message:randomNum}, {status:200})
}