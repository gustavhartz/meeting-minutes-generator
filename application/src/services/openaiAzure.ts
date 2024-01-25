import axios, { AxiosResponse } from "axios";
import {
  example_query,
  example_response,
  system_message,
} from "@/utils/templates";
import { ApiState } from "@/app/page";

interface Message {
  role: string;
  content: string;
}

interface RequestData {
  messages: Message[];
  max_tokens: number;
  temperature: number;
  frequency_penalty: number;
  presence_penalty: number;
  top_p: number;
  stop: null;
}

const data: RequestData = {
  messages: [
    {
      role: "system",
      content: system_message,
    },
    {
      role: "user",
      content: example_query,
    },
    {
      role: "assistant",
      content: example_response,
    },
    { role: "user", content: "Thank you!" },
  ],
  max_tokens: 1500,
  temperature: 0.3,
  frequency_penalty: 0,
  presence_penalty: 0,
  top_p: 0.95,
  stop: null,
};

export const postChatCompletions = async (state: ApiState, query: string) => {
  const data: RequestData = {
    messages: [
      {
        role: "system",
        content: system_message,
      },
      {
        role: "user",
        content: example_query,
      },
      {
        role: "assistant",
        content: example_response,
      },
      { role: "user", content: query },
    ],
    max_tokens: 1500,
    temperature: 0.3,
    frequency_penalty: 0,
    presence_penalty: 0,
    top_p: 0.95,
    stop: null,
  };
  try {
    const url = `${state.api_url}/openai/deployments/${state.deployment_name}/chat/completions?api-version=${state.api_version}`;
    const headers = {
      "Content-Type": "application/json",
      "api-key": state.api_key,
    };
    const response: AxiosResponse = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
