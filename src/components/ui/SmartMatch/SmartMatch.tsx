'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Flex, Text } from '@/components/elements';
import {
  ArrowLeftIcon,
  ArrowForward,
  CheckIcon,
  PawIcon,
  SparkIcon,
  WrongIcon,
} from '@/components/svgs';
import { SMART_MATCH_STEPS, TOTAL_STEPS } from '@/constants/smartMatch';
import type { TQuizAnswers, TSmartMatchModalProps } from '@/utils/types';
import { deriveTagsFromAnswers } from '@/utils/smartMatch';
import {
  BackButton,
  CardIconWrapper,
  CardLabel,
  CheckIconWrapper,
  CloseButton,
  DrawerHandle,
  DrawerHandleBar,
  HintText,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
  ModalTitle,
  NextButton,
  OptionCard,
  OptionColumn,
  OptionDescription,
  OptionGrid,
  OptionIconWrapper,
  OptionLabel,
  OptionRow,
  ProgressBarWrapper,
  ProgressFill,
  ProgressLabel,
  ProgressTrack,
  QuestionText,
  StepDot,
  StepDots,
  TagChip,
  TagsWrap,
} from './style';

const EMPTY_ANSWERS: TQuizAnswers = {};

export function SmartMatchModal({
  isOpen,
  onClose,
  onApply,
}: TSmartMatchModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<TQuizAnswers>(EMPTY_ANSWERS);

  // ── Reset quiz state whenever the modal closes ─────────────────────────────
  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      setAnswers(EMPTY_ANSWERS);
    }
  }, [isOpen]);

  // ── Close + reset on page reload / browser navigation ─────────────────────
  useEffect(() => {
    const handleBeforeUnload = () => onClose();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [onClose]);

  // ── Close on Escape key ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const currentStep = SMART_MATCH_STEPS[currentStepIndex];
  const selectedLabels = answers[currentStep?.id] ?? [];
  const progressPercent = (currentStepIndex / TOTAL_STEPS) * 100;
  const isLastStep = currentStepIndex === TOTAL_STEPS - 1;
  // multi steps can always proceed (selections optional); single steps need one pick
  const canProceed = currentStep?.type === 'multi' || selectedLabels.length > 0;

  // ── Toggle an option on / off ─────────────────────────────────────────────
  const toggleOption = useCallback(
    (stepId: string, label: string) => {
      const step = SMART_MATCH_STEPS[currentStepIndex];
      if (!step) return;

      setAnswers((prev) => {
        const current = prev[stepId] ?? [];

        if (step.type === 'single') {
          return { ...prev, [stepId]: [label] };
        }

        const maxSelections = step.maxSelections ?? Infinity;

        if (current.includes(label)) {
          return { ...prev, [stepId]: current.filter((l) => l !== label) };
        }
        if (current.length >= maxSelections) return prev;

        return { ...prev, [stepId]: [...current, label] };
      });
    },
    [currentStepIndex],
  );

  const handleNext = useCallback(() => {
    if (!canProceed) return;
    if (isLastStep) {
      const matchedTags = deriveTagsFromAnswers(answers);
      onApply(matchedTags);
      onClose();
    } else {
      setCurrentStepIndex((i) => i + 1);
    }
  }, [canProceed, isLastStep, answers, onApply, onClose]);

  const handleBack = useCallback(() => {
    setCurrentStepIndex((i) => Math.max(0, i - 1));
  }, []);

  // Close only when clicking the dark backdrop, not the panel itself
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  if (!isOpen || !currentStep) return null;

  const isOptionSelected = (label: string) => selectedLabels.includes(label);

  return (
    <ModalOverlay
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Smart Match quiz"
    >
      <ModalPanel>
        {/* ── Mobile bottom-sheet drag handle ───────────────────────────── */}
        <DrawerHandle>
          <DrawerHandleBar />
        </DrawerHandle>

        {/* ── Header ────────────────────────────────────────────────────── */}
        <ModalHeader>
          <ModalTitle as="p">
            <SparkIcon width={16} height={16} css={{ color: '$main' }} />
            Find My Match
          </ModalTitle>
          <CloseButton
            type="button"
            aria-label="Close smart match quiz"
            onClick={onClose}
          >
            <WrongIcon width={14} height={14} css={{ color: '$slateGray' }} />
          </CloseButton>
        </ModalHeader>

        {/* ── Progress bar ──────────────────────────────────────────────── */}
        <ProgressBarWrapper>
          <ProgressTrack>
            <ProgressFill style={{ width: `${progressPercent}%` }} />
          </ProgressTrack>
          <ProgressLabel as="div">
            <span>
              Step {currentStepIndex + 1} of {TOTAL_STEPS}
            </span>
            <span>{Math.round(progressPercent)}% complete</span>
          </ProgressLabel>
        </ProgressBarWrapper>

        {/* ── Scrollable body ───────────────────────────────────────────── */}
        <ModalBody>
          <QuestionText as="h2">{currentStep.question}</QuestionText>
          <HintText as="p">{currentStep.hint}</HintText>

          {/* ── Column layout — activity & household ── */}
          {currentStep.layout === 'column' && (
            <OptionColumn>
              {currentStep.options.map((option) => {
                const selected = isOptionSelected(option.label);
                const IconComponent = option.icon;

                return (
                  <OptionRow
                    key={option.label}
                    type="button"
                    selected={selected}
                    onClick={() => toggleOption(currentStep.id, option.label)}
                    aria-pressed={selected}
                  >
                    <OptionIconWrapper selected={selected}>
                      <IconComponent
                        width={20}
                        height={20}
                        css={{ color: selected ? '$white' : '$slateGray' }}
                      />
                    </OptionIconWrapper>

                    <Flex direction="column" css={{ gap: '$px$2', flex: 1 }}>
                      <OptionLabel as="span" selected={selected}>
                        {option.label}
                      </OptionLabel>
                      {option.description && (
                        <OptionDescription as="span" selected={selected}>
                          {option.description}
                        </OptionDescription>
                      )}
                    </Flex>

                    {selected && (
                      <CheckIconWrapper>
                        <CheckIcon
                          width={15}
                          height={15}
                          css={{ color: '$main' }}
                        />
                      </CheckIconWrapper>
                    )}
                  </OptionRow>
                );
              })}
            </OptionColumn>
          )}

          {/* ── Grid layout — living space ── */}
          {currentStep.layout === 'grid' && (
            <OptionGrid>
              {currentStep.options.map((option) => {
                const selected = isOptionSelected(option.label);
                const IconComponent = option.icon;

                return (
                  <OptionCard
                    key={option.label}
                    type="button"
                    selected={selected}
                    onClick={() => toggleOption(currentStep.id, option.label)}
                    aria-pressed={selected}
                  >
                    <CardIconWrapper selected={selected}>
                      <IconComponent
                        width={22}
                        height={22}
                        css={{ color: selected ? '$white' : '$slateGray' }}
                      />
                    </CardIconWrapper>

                    <CardLabel as="span" selected={selected}>
                      {option.label}
                    </CardLabel>

                    {option.description && (
                      <Text
                        as="span"
                        css={{
                          fontSize: '$rem$0_75',
                          color: selected ? '#1e4817ff' : '$slateGray',
                          textAlign: 'center',
                        }}
                      >
                        {option.description}
                      </Text>
                    )}
                  </OptionCard>
                );
              })}
            </OptionGrid>
          )}

          {/* ── Tags layout — personality & health ── */}
          {currentStep.layout === 'tags' && (
            <>
              {currentStep.maxSelections && (
                <Text
                  as="p"
                  css={{
                    fontSize: '$rem$0_81',
                    color: '$slateGray',
                    marginBottom: '$px$10',
                  }}
                >
                  {selectedLabels.length} / {currentStep.maxSelections} selected
                </Text>
              )}

              <TagsWrap>
                {currentStep.options.map((option) => {
                  const selected = isOptionSelected(option.label);
                  const IconComponent = option.icon;
                  const isMaxReached =
                    !!currentStep.maxSelections &&
                    selectedLabels.length >= currentStep.maxSelections &&
                    !selected;

                  return (
                    <TagChip
                      key={option.label}
                      type="button"
                      selected={selected}
                      onClick={() =>
                        !isMaxReached &&
                        toggleOption(currentStep.id, option.label)
                      }
                      aria-pressed={selected}
                      style={{ opacity: isMaxReached ? 0.45 : 1 }}
                    >
                      <IconComponent
                        width={14}
                        height={14}
                        css={{ color: selected ? '$main' : '$slateGray' }}
                      />
                      {option.label}
                    </TagChip>
                  );
                })}
              </TagsWrap>
            </>
          )}

          {/* ── Step progress dots ── */}
          <StepDots>
            {SMART_MATCH_STEPS.map((_, idx) => (
              <StepDot key={idx} active={idx === currentStepIndex} />
            ))}
          </StepDots>
        </ModalBody>

        {/* ── Footer navigation ─────────────────────────────────────────── */}
        <ModalFooter>
          {currentStepIndex > 0 && (
            <BackButton type="button" onClick={handleBack}>
              <ArrowLeftIcon
                width={14}
                height={14}
                css={{ color: '$slateGray' }}
              />
              Back
            </BackButton>
          )}

          <NextButton
            type="button"
            disabled={!canProceed && currentStep.type === 'single'}
            onClick={canProceed ? handleNext : undefined}
          >
            {isLastStep ? (
              <>
                <PawIcon width={15} height={15} css={{ color: '$white' }} />
                Show my matches
              </>
            ) : (
              <>
                Next
                <ArrowForward
                  width={14}
                  height={14}
                  css={{ color: '$white' }}
                />
              </>
            )}
          </NextButton>
        </ModalFooter>
      </ModalPanel>
    </ModalOverlay>
  );
}
