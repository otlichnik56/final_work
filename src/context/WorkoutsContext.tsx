import { createContext, useState } from "react";
import { WorkoutType } from "../types/workout";

type ProviderProps = {
  children: React.ReactNode;
};

type ContextWorckoutsType = {
  workouts: WorkoutType[] | null;
  loading: boolean;
  error: string | null;
  setWorkouts: (prevState: WorkoutType[]) => void;
  setLoading: (prevState: boolean) => void;
  setError: (prevState: string | null) => void;
};

export const WorckoutsContext = createContext<ContextWorckoutsType | null>(null);

export default function WorckoutsProvider({ children }: ProviderProps) {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <WorckoutsContext.Provider
      value={{ workouts, setWorkouts, loading, setLoading, error, setError }}
    >
      {children}
    </WorckoutsContext.Provider>
  );
}