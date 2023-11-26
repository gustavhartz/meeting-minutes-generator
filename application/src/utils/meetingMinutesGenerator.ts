abstract class AbstractMeetingMinutesGenerator {
  protected abstract client: any; // Replace 'any' with your ChatCompletionsClient type

  abstract abstractSummaryExtraction(transcription: string): string;

  abstract keyPointsExtraction(transcription: string): string;

  abstract actionItemExtraction(transcription: string): string;
}

class openAIAzureMeetingMinutesGenerator extends AbstractMeetingMinutesGenerator {
  constructor(protected client: any) {
    super();
  }

  abstractSummaryExtraction(transcription: string): string {
    const response = this.client.create({
      model: "gpt-4",
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "You are a highly skilled AI trained in language comprehension and summarization. I would like you to read the following text and summarize it into a concise abstract paragraph. Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text. Please avoid unnecessary details or tangential points.",
        },
        {
          role: "user",
          content: transcription,
        },
      ],
    } as any);

    return response.choices[0].message.content;
  }

  keyPointsExtraction(transcription: string): string {
    const response = this.client.create({
      model: "gpt-4",
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "You are a proficient AI with a specialty in distilling information into key points. Based on the following text, identify and list the main points that were discussed or brought up. These should be the most important ideas, findings, or topics that are crucial to the essence of the discussion. Your goal is to provide a list that someone could read to quickly understand what was talked about.",
        },
        {
          role: "user",
          content: transcription,
        },
      ],
    } as any);

    return response.choices[0].message.content;
  }

  actionItemExtraction(transcription: string): string {
    const response = this.client.create({
      model: "gpt-4",
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "You are an AI expert in analyzing conversations and extracting action items. Please review the text and identify any tasks, assignments, or actions that were agreed upon or mentioned as needing to be done. These could be tasks assigned to specific individuals, or general actions that the group has decided to take. Please list these action items clearly and concisely.",
        },
        {
          role: "user",
          content: transcription,
        },
      ],
    } as any);

    return response.choices[0].message.content;
  }
}
