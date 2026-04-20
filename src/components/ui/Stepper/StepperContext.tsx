import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { StepConfig, StepperState, StepperAction } from '@/utils/types';
import { stepperReducer, buildInitialState } from './stepperReducer';
import { saveState, loadState } from './stepperPersistence';

interface StepperContextValue {
  state: StepperState;
  dispatch: React.Dispatch<StepperAction>;
  steps: StepConfig[];
}

const StepperContext = createContext<StepperContextValue | null>(null);

// Hook — throws if used outside provider
export function useStepper(): StepperContextValue {
  const ctx = useContext(StepperContext);
  if (!ctx) throw new Error('useStepper must be used inside <StepperProvider>');
  return ctx;
}

interface StepperProviderProps {
  steps: StepConfig[];
  flowId: string; // unique key for sessionStorage e.g. "post-task"
  children: ReactNode;
}

export function StepperProvider({
  steps,
  flowId,
  children,
}: StepperProviderProps) {
  const [state, dispatch] = useReducer(
    stepperReducer,
    undefined,
    // Hydrate from sessionStorage on first render
    () => loadState(flowId, steps.length),
  );

  // Persist to sessionStorage whenever state changes
  useEffect(() => {
    saveState(flowId, state);
  }, [flowId, state]);

  return (
    <StepperContext.Provider value={{ state, dispatch, steps }}>
      {children}
    </StepperContext.Provider>
  );
}
