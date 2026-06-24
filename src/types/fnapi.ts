import type {
  AESKeysResponseData,
  AllCosmeticsResponseData,
  BannerColorsResponseData,
  BannersResponseData,
  BeanCosmeticsListResponseData,
  BRCosmeticByIDResponseData,
  BRCosmeticsListResponseData,
  BRCosmeticsSearchResponseData,
  BRMapResponseData,
  BRNewsResponseData,
  BRStatsResponseData,
  CarCosmeticsListResponseData,
  CreativeNewsResponseData,
  InstrumentCosmeticsListResponseData,
  LegoCosmeticsListResponseData,
  NewCosmeticsResponseData,
  NewsResponseData,
  PlaylistByIDResponseData,
  PlaylistsResponseData,
  ShopResponseData,
  STWNewsResponseData,
  TrackCosmeticsListResponseData,
} from "fnapicom";

export type ShopData = ShopResponseData["data"];
export type ShopEntry = ShopData["entries"][number];
export type BRCosmetic = BRCosmeticByIDResponseData["data"];
export type BRCosmeticsList = BRCosmeticsListResponseData["data"];
export type BRCosmeticsSearchResult = BRCosmeticsSearchResponseData["data"];
export type NewCosmeticsData = NewCosmeticsResponseData["data"];
export type BRNews = BRNewsResponseData["data"];
export type STWNews = STWNewsResponseData["data"];
export type CreativeNews = CreativeNewsResponseData["data"];
export type AllNewsData = NewsResponseData["data"];
export type BRNewsMotd = BRNews["motds"][number];
export type BRNewsMessage = BRNews["messages"][number];
export type NewsMotd = BRNewsMotd;
export type NewsMessage = BRNewsMessage;
export type BRMap = BRMapResponseData["data"];
export type BRStats = BRStatsResponseData["data"];
export type ModeStats = BRStats["stats"]["all"][Exclude<
  keyof BRStats["stats"]["all"],
  "overall"
>];
export type Playlist = PlaylistsResponseData["data"][number];
export type PlaylistDetail = PlaylistByIDResponseData["data"];
export type Banner = BannersResponseData["data"][number];
export type BannerColor = BannerColorsResponseData["data"][number];
export type AesKeysData = AESKeysResponseData["data"];
export type AllCosmeticsData = AllCosmeticsResponseData["data"];
export type TrackCosmeticsList = TrackCosmeticsListResponseData["data"];
export type CarCosmeticsList = CarCosmeticsListResponseData["data"];
export type LegoCosmeticsList = LegoCosmeticsListResponseData["data"];
export type InstrumentCosmeticsList =
  InstrumentCosmeticsListResponseData["data"];
export type BeanCosmeticsList = BeanCosmeticsListResponseData["data"];
