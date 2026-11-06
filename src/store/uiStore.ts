import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  searchHistory: string[]
  addSearch: (q: string) => void
  clearSearchHistory: () => void
  sidebarOpen: boolean
  setSidebarOpen: (v: boolean) => void
  megaMenuOpen: boolean
  setMegaMenuOpen: (v: boolean) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      searchHistory: [],
      addSearch: (q) => {
        const trimmed = q.trim()
        if (!trimmed) return
        const hist = [trimmed, ...get().searchHistory.filter(x => x !== trimmed)].slice(0, 8)
        set({ searchHistory: hist })
      },
      clearSearchHistory: () => set({ searchHistory: [] }),
      sidebarOpen: false,
      setSidebarOpen: (v) => set({ sidebarOpen: v }),
      megaMenuOpen: false,
      setMegaMenuOpen: (v) => set({ megaMenuOpen: v }),
    }),
    { name: 'kaufhaus-ui', partialize: (s) => ({ searchHistory: s.searchHistory }) },
  ),
)
