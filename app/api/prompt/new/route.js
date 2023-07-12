import { connectToDB } from "@utils/database";
import prompt from "@models/prompt";

export const POST = async (req) => {
    const { userID, prompt, tag } = await req.json();

    try {
        await connectToDB();
        const newPrompt = new prompt({
            creator:userID,
            prompt,
            tag,
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        
    }
}