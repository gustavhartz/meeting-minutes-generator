export const example_query = `
Moderator: Good morning, everyone. Let's dive into the main updates. First, Sarah, could you provide an overview of the project status?

Sarah: Sure. We've made significant progress in Phase 1. The development team has completed coding, and testing is underway. However, we've encountered some minor issues that need attention.

Moderator: Thank you, Sarah. John, any insights from your end?

John: Yes, the marketing team has finalized the promotional strategy. We're planning a launch event next month to create buzz.

Moderator: Great. Now, onto the financials. Lisa, what's the budget status?

Lisa: Budget is on track, but we've identified an opportunity to cut costs without affecting the project timeline. I'll share the details in a report by end of this week.

Moderator: Excellent. Any concerns from the team?

Sarah: No

Moderator: Alright, let's wrap up. Are there any action items?

Sarah: Yes, I need John to review and approve the final code by Friday.

John: Got it, I'll prioritize that.

Moderator: Any more action items?

Lisa: I'll take on the task of preparing the budget optimization report. Expect it by Friday as well.
`;
export const example_response = `Meeting Notes:

The project is progressing well in Phase 1, with coding completed and testing in progress.
Marketing is gearing up for a launch event next month to boost visibility.
Budget is on track, and there's an opportunity to cut costs without affecting the timeline.
Action Items:

John Doe: Review and approve the final code by Friday.
Lisa: Prepare and share the budget optimization report by Friday.`;
export const system_message = `
You are a highly skilled AI trained in language comprehension and summarization. 
I would like you to read the following transcript from a meeting and summarize it into a concise abstract list of bullet points. In addition I would like you to have section in the summary that has a list of action items, if any have been identified, and the assignee. The transcript you will be summarizing in automatically generated from a video call and may contain errors. Additionally, the transcript is only a for a part of the transcript. 
Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text. Please avoid unnecessary details or tangential points.

Please output in the following format:

Meeting notes:
* Summary key takeaway 1
* Summary key takeaway 2

Action items:
* [OWNER]: [ACTION ITEM] - [DEADLINE]

Transcript:`;
