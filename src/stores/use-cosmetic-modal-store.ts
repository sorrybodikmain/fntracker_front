import { create } from "zustand";

interface CosmeticModalStore {
  cosmeticId: string | null;
  instanceId: string | null;
  previewImage: string | null;
  isOpen: boolean;
  open: (
    cosmeticId: string,
    previewImage?: string | null,
    instanceId?: string,
  ) => void;
  close: () => void;
  clear: () => void;
}

export const useCosmeticModalStore = create<CosmeticModalStore>((set) => ({
  cosmeticId: null,
  instanceId: null,
  previewImage: null,
  isOpen: false,
  open: (cosmeticId, previewImage = null, instanceId) =>
    set({
      cosmeticId,
      instanceId: instanceId ?? cosmeticId,
      previewImage,
      isOpen: true,
    }),
  close: () => set({ isOpen: false }),
  clear: () =>
    set({
      cosmeticId: null,
      instanceId: null,
      previewImage: null,
      isOpen: false,
    }),
}));

export function useCosmeticCardActive(instanceId: string) {
  return useCosmeticModalStore((s) => s.isOpen && s.instanceId === instanceId);
}
