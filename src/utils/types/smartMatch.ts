import { SvgProps } from "@/components/svgs/svgs";
import { FC } from "react";

export type TQuizOptionLayout = 'column' | 'grid' | 'tags';
export type TQuizStepType = 'single' | 'multi';

export interface TQuizOption {
    label: string;
    description?: string;
    icon: FC<SvgProps>;
    tags: string[];
}

export interface TQuizStep {
    id: string;
    question: string;
    hint: string;
    type: TQuizStepType;
    layout: TQuizOptionLayout;
    maxSelections?: number;
    options: TQuizOption[];
}

export type TQuizAnswers = Record<string, string[]>;

export interface TSmartMatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (matchedTags: string[]) => void;
}

export interface TSmartMatchResultBannerProps {
    matchedTags: string[];
    resultCount: number;
    onClear: () => void;
}