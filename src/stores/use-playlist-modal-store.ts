import { create } from "zustand";

interface PlaylistModalStore {
  playlistId: string | null;
  previewImage: string | null;
  isOpen: boolean;
  open: (id: string, previewImage?: string | null) => void;
  close: () => void;
  clear: () => void;
}

export const usePlaylistModalStore = create<PlaylistModalStore>((set) => ({
  playlistId: null,
  previewImage: null,
  isOpen: false,
  open: (id, previewImage = null) =>
    set({ playlistId: id, previewImage, isOpen: true }),
  close: () => set({ isOpen: false }),
  clear: () => set({ playlistId: null, previewImage: null, isOpen: false }),
}));

export function usePlaylistCardActive(id: string) {
  return usePlaylistModalStore((s) => s.isOpen && s.playlistId === id);
}
