import { Schedule } from "@/hooks/useQueries/agenda/useTodasAgendas";
import { create } from "zustand";

type ScheduleStore = {
  schedule: Schedule | null;
  setSchedule: (schedule: Schedule) => void;
  reset: () => void;
};

export const useScheduleStore = create<ScheduleStore>()((set) => ({
  schedule: null,
  setSchedule: (schedule: Schedule) => set(() => ({ schedule })),
  reset: () => set(() => ({ schedule: null })),
}));
