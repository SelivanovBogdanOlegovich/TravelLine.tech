import { readFile, writeFile } from "fs/promises";
import path from "path";

type ContentData = Record<string, unknown>;

const contentFilePath = path.join(process.cwd(), "src", "data", "content.json");

export const readContent = async (): Promise<ContentData> => {
  const content = await readFile(contentFilePath, "utf-8");

  return JSON.parse(content) as ContentData;
};

export const writeContent = async (data: ContentData): Promise<void> => {
  const content = JSON.stringify(data, null, 2);

  await writeFile(contentFilePath, `${content}\n`, "utf-8");
};
