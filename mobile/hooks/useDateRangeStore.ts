import { create } from "zustand";

interface DateRangeState {
    startDate: Date | null;
    endDate: Date | null;
    setStartDate: (date: Date | null) => void;
    setEndDate: (date: Date | null) => void;
}

export const useDateRangeStore = create<DateRangeState>((set) => ({
    startDate: null,
    endDate: null,
    setStartDate: (date) => set( { startDate: date} ),
    setEndDate: (date) => set({ endDate: date }),
}))