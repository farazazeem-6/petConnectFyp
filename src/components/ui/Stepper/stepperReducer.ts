import { StepperState, StepperAction, StepStatus } from '@/utils/types';

export function buildInitialState(totalSteps: number): StepperState {
    const statuses = Object.fromEntries(
        Array.from({ length: totalSteps }, (_, i) => [i, i === 0 ? 'active' : 'pending'])
    ) as Record<number, StepStatus>;

    return { currentIndex: 0, visitedIndices: [0], statuses };
}

export function stepperReducer(state: StepperState, action: StepperAction): StepperState {
    switch (action.type) {

        case 'NEXT': {
            const next = state.currentIndex + 1;
            if (next >= action.totalSteps) return state;

            return {
                ...state,
                currentIndex: next,
                visitedIndices: state.visitedIndices.includes(next)
                    ? state.visitedIndices
                    : [...state.visitedIndices, next],
                statuses: {
                    ...state.statuses,
                    [state.currentIndex]: 'done',
                    [next]: 'active',
                },
            };
        }

        case 'PREV': {
            const prev = state.currentIndex - 1;
            if (prev < 0) return state;

            return {
                ...state,
                currentIndex: prev,
                statuses: {
                    ...state.statuses,
                    [state.currentIndex]: 'pending',
                    [prev]: 'active',
                },
            };
        }

        case 'GO_TO': {
            // Only allow jumping to already-visited steps
            if (!state.visitedIndices.includes(action.payload)) return state;
            return {
                ...state,
                currentIndex: action.payload,
                statuses: {
                    ...state.statuses,
                    [state.currentIndex]: state.statuses[state.currentIndex] === 'error' ? 'error' : 'pending',
                    [action.payload]: 'active',
                },
            };
        }

        case 'MARK_ERROR':
            return {
                ...state,
                statuses: { ...state.statuses, [action.payload]: 'error' },
            };

        case 'RESET':
            return buildInitialState(action.totalSteps);

        default:
            return state;
    }
}