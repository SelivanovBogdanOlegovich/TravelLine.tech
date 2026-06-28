import { apiRequest } from "../../api/contentApi";
import type { ContentData } from "../../api/contentApi";

export type PlatformTimelineData = NonNullable<
  ContentData["platformTimeline"]
>;

export const getAdminPlatformTimeline = () =>
  apiRequest<PlatformTimelineData>("/api/platform-timeline");

export const updateAdminPlatformTimeline = (
  platformTimeline: PlatformTimelineData,
) =>
  apiRequest<PlatformTimelineData>("/api/platform-timeline", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(platformTimeline),
  });
