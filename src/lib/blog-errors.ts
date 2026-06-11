export type BlogFieldName = "title" | "content" | "category";

export type BlogFormErrors = {
  fields: Partial<Record<BlogFieldName, string>>;
  nonField: string[];
};

export type RawApiErrors = Record<string, unknown>;
const FIELD_NAMES: BlogFieldName[] = ["title", "content", "category"];
function toMessages(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value === "string") return [value];
  if (value == null) return [];
  return [String(value)];
}

export function parseBlogErrors(
  raw: RawApiErrors | null | undefined,
): BlogFormErrors {
  const result: BlogFormErrors = { fields: {}, nonField: [] };
  if (!raw || typeof raw !== "object") return result;

  for (const [key, value] of Object.entries(raw)) {
    const messages = toMessages(value);
    if (messages.length === 0) continue;

    if ((FIELD_NAMES as string[]).includes(key)) {
      result.fields[key as BlogFieldName] = messages.join("\n");
    } else {
      result.nonField.push(...messages);
    }
  }

  return result;
}

export const EMPTY_BLOG_ERRORS: BlogFormErrors = { fields: {}, nonField: [] };
