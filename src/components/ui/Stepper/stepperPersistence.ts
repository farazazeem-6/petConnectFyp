import { StepperState } from '@/utils/types';
import { buildInitialState } from './stepperReducer';

const key = (flowId: string) => `stepper:${flowId}`;

export function saveState(flowId: string, state: StepperState): void {
    try {
        sessionStorage.setItem(key(flowId), JSON.stringify(state));
    } catch {
        // sessionStorage unavailable (SSR, private mode) — silently skip
    }
}

export function loadState(flowId: string, totalSteps: number): StepperState {
    try {
        const raw = sessionStorage.getItem(key(flowId));
        if (!raw) return buildInitialState(totalSteps);
        return JSON.parse(raw) as StepperState;
    } catch {
        return buildInitialState(totalSteps);
    }
}

export function clearState(flowId: string): void {
    try {
        sessionStorage.removeItem(key(flowId));
    } catch { }
}