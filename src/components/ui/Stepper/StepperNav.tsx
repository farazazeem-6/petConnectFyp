import { useStepper } from './StepperContext';
import { StepStatus } from '@/utils/types';
import {
  StepperNavRoot,
  StepperItem,
  StepButton,
  StepCircle,
  StepLabels,
  StepLabel,
  StepSublabel,
  StepConnector,
} from './Stepper.style';
import { CheckIcon } from '@/components/svgs';

// Map stepper state to the circle's status variant
function getCircleStatus(status: StepStatus, isActive: boolean): StepStatus {
  if (isActive) return 'active';
  return status;
}

export function StepperNav() {
  const { state, dispatch, steps } = useStepper();

  return (
    <StepperNavRoot aria-label="Form steps">
      {steps.map((step, i) => {
        const status = state.statuses[i];
        const isActive = state.currentIndex === i;
        const canClick = state.visitedIndices.includes(i);
        const isLast = i === steps.length - 1;

        return (
          <StepperItem key={step.id}>
            <StepButton
              isActive={isActive}
              onClick={() => dispatch({ type: 'GO_TO', payload: i })}
              disabled={!canClick}
              aria-current={isActive ? 'step' : undefined}
              type="button"
            >
              {/* Circle with number or checkmark */}
              <StepCircle status={getCircleStatus(status, isActive)}>
                {status === 'done' && !isActive ? <CheckIcon /> : i + 1}
              </StepCircle>

              <StepLabels>
                <StepLabel>{step.label}</StepLabel>
                {step.sublabel && <StepSublabel>{step.sublabel}</StepSublabel>}
              </StepLabels>
            </StepButton>

            {/* Line between steps */}
            {!isLast && <StepConnector done={status === 'done'} />}
          </StepperItem>
        );
      })}
    </StepperNavRoot>
  );
}
