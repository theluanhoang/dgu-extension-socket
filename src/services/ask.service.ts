import { IRequestAsk } from "@/types";
import { configOpenai } from "@/configs/config.openai";
import { UsageModel } from "@/models";
import { PRICE_PER_REQUEST } from "@/utils";
import { BAD_REQUEST } from "@/core";

class AskService {
    createAsk = async ({ imageUrl, apiKey, userId }: IRequestAsk) => {
        const userUsage = await UsageModel.findOne({ userId });

        if (!userUsage) throw new BAD_REQUEST("User Not Found");
        if (!userUsage.apiKeys) throw new BAD_REQUEST("API Key Not Found");

        const apiKeyMatch = userUsage.apiKeys.some((apiKeyRecord) => apiKeyRecord.apiKey === apiKey);
        if (!apiKeyMatch) throw new BAD_REQUEST("API Key Not Match");

        if (userUsage.cash < PRICE_PER_REQUEST) throw new BAD_REQUEST("Credit Is Not Enough");

        await UsageModel.updateOne({ userId }, { $inc: { cash: -PRICE_PER_REQUEST } });

        const prompt =
            "Answer the multiple-choice questions in the image. Return only the content of the correct answers";
        const response = await configOpenai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        { type: "image_url", image_url: { url: imageUrl, detail: "high" } },
                    ],
                },
            ],
        });

        return { result: response.choices[0].message.content };
    };
}

export default new AskService();
