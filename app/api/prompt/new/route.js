import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const { userID, prompt, tag } = await req.json();

    try {
        await connectToDB();
    } catch (error) {
        
    }
}