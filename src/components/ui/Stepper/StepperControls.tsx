import { useStepper } from './StepperContext';
import {
  StepperControlsRoot,
  StepProgress,
  ButtonGroup,
  Button,
} from './Stepper.style';

interface StepperControlsProps {
  onNext: () => Promise<void> | void;
  onSubmit?: () => Promise<void> | void;
}

export function StepperControls({ onNext, onSubmit }: StepperControlsProps) {
  const { state, dispatch, steps } = useStepper();

  const isFirst = state.currentIndex === 0;
  const isLast = state.currentIndex === steps.length - 1;

  return (
    <StepperControlsRoot>
      <div />
      <ButtonGroup>
        <Button
          variant="secondary"
          type="button"
          onClick={() => dispatch({ type: 'PREV' })}
          disabled={isFirst}
        >
          Back
        </Button>

        <Button
          variant="primary"
          type="button"
          onClick={isLast ? onSubmit : onNext}
        >
          {isLast ? 'Submit' : 'Continue'}
        </Button>
      </ButtonGroup>
    </StepperControlsRoot>
  );
}
