import * as fs from "fs";

interface Caption {
  start: number;
  end: number;
  text: string;
}

interface VttToJsonResult {
  captions: Caption[];
}

export function vttToJson(vttContent: string): VttToJsonResult {
  const captions: Caption[] = [];
  const lines = vttContent.split("\n");

  let currentCaption: Caption | null = null;

  for (const line of lines) {
    if (/^\d{2}:\d{2}:\d{2}.\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}.\d{3}/.test(line)) {
      // Found a timestamp line, create a new caption
      if (currentCaption) {
        captions.push(currentCaption);
      }

      const [startTime, endTime] = line.split(" --> ").map(parseVttTimestamp);
      currentCaption = {
        start: startTime,
        end: endTime,
        text: "",
      };
    } else if (currentCaption) {
      // Add the line to the current caption's text
      currentCaption.text += line.trim() + " ";
    }
  }

  // Add the last caption if exists
  if (currentCaption) {
    captions.push(currentCaption);
  }

  return { captions };
}

function parseVttTimestamp(timestamp: string): number {
  const [hh, mm, ss] = timestamp.split(":").map(parseFloat);
  return hh * 3600 + mm * 60 + ss;
}
