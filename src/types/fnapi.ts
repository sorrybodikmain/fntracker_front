import type {
  BRCosmeticByIDResponseData,
  BRCosmeticsListResponseData,
  BRMapResponseData,
  BRNewsResponseData,
  BRStatsResponseData,
  NewCosmeticsResponseData,
  ShopResponseData,
} from "fnapicom";

export type ShopData = ShopResponseData["data"];
export type ShopEntry = ShopData["entries"][number];
export type BRCosmetic = BRCosmeticByIDResponseData["data"];
export type BRCosmeticsList = BRCosmeticsListResponseData["data"];
export type NewCosmeticsData = NewCosmeticsResponseData["data"];
export type BRNews = BRNewsResponseData["data"];
export type BRNewsMotd = BRNews["motds"][number];
export type BRNewsMessage = BRNews["messages"][number];
export type BRMap = BRMapResponseData["data"];
export type BRStats = BRStatsResponseData["data"];
export type ModeStats = BRStats["stats"]["all"][Exclude<
  keyof BRStats["stats"]["all"],
  "overall"
>];
