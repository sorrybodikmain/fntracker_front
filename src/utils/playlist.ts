import type { Playlist } from "@/types/fnapi";

type PlaylistImages = Pick<Playlist, "images">;

export function playlistDisplayImage(playlist: PlaylistImages): string | null {
  return playlist.images?.showcase ?? playlist.images?.missionIcon ?? null;
}

export function playlistHasImage(playlist: PlaylistImages): boolean {
  return playlistDisplayImage(playlist) != null;
}
