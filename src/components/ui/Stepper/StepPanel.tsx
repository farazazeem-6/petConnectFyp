import { ReactNode } from 'react';
import { useStepper } from './StepperContext';
import { Box } from '@/components/elements';

interface StepPanelProps {
  stepIndex: number;
  children: ReactNode;
}

export function StepPanel({ stepIndex, children }: StepPanelProps) {
  const { state } = useStepper();

  // Don't mount/unmount — keep RHF field state alive
  // Use visibility trick so RHF stays registered
  if (state.currentIndex !== stepIndex) return null;

  return (
    <Box role="tabpanel" aria-label={`Step ${stepIndex + 1}`}>
      {children}
    </Box>
  );
}