export type StepStatus = 'pending' | 'active' | 'done' | 'error';

export interface StepConfig {
    id: string;
    label: string;
    sublabel?: string;
}

export interface StepperState {
    currentIndex: number;
    visitedIndices: number[];
    statuses: Record<number, StepStatus>;
}

// All actions the reducer understands
export type StepperAction =
    | { type: 'NEXT'; totalSteps: number }
    | { type: 'PREV' }
    | { type: 'GO_TO'; payload: number }
    | { type: 'MARK_ERROR'; payload: number }
    | { type: 'RESET'; totalSteps: number };