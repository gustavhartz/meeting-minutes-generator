interface VttSection {
  timestamp_start: number;
  timestamp_end: number;
  speaker: string;
  text: string;
}

// VTT timestamp to seconds
function vttToSeconds(vttTimestamp: string): number {
  const [h, m, s] = vttTimestamp.split(":");
  const [sValue, ms] = s.split(".");
  return (
    parseInt(h) * 3600 +
    parseInt(m) * 60 +
    parseInt(sValue) +
    parseInt(ms) / 1000
  );
}

const extractionPattern = /<v([^>]*)>(.*?)<\/v>/;

// Create function that converts vtt with speakers to json
export function vttToJson(vttContent: string): VttSection[] {
  const sections: VttSection[] = [];
  let currentSection: VttSection | null = null;

  const lines = vttContent.split("\n");

  for (const line of lines) {
    if (line.match(/^\d{2}:\d{2}:\d{2}.\d{3} --> \d{2}:\d{2}:\d{2}.\d{3}$/)) {
      // This line represents the timestamp, create a new section
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        timestamp_start: vttToSeconds(line.split(" --> ")[0]),
        timestamp_end: vttToSeconds(line.split(" --> ")[1]),
        speaker: "",
        text: "",
      };
    } else if (line.match(/<v (.+?)>/) && currentSection) {
      // This line represents a speaker, extract the speaker's name
      const matches = line.match(extractionPattern);
      if (matches) {
        currentSection.speaker = matches[1].trim();
        currentSection.text = matches[2].trim();
      }
    } else if (line.trim() === "") {
      // Empty line indicates the end of a section
      if (currentSection) {
        sections.push(currentSection);
        currentSection = null;
      }
    }
  }

  // Add the last section if there is any
  if (currentSection) {
    sections.push(currentSection);
  }

  // Convert the sections to the desired JSON format
  return sections;
}
