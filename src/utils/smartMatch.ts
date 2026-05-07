import { SMART_MATCH_STEPS } from '@/constants/smartMatch';
import type { TQuizAnswers } from '@/utils/types';
import type { TAnimal } from '@/utils/types';

/**
 * Walks every quiz step and collects all tags from selected options.
 * Returns a deduplicated flat array ready to pass into filterAnimalsBySmartMatch.
 */
export function deriveTagsFromAnswers(answers: TQuizAnswers): string[] {
    const tagSet = new Set<string>();

    SMART_MATCH_STEPS.forEach((step) => {
        const selectedLabels = answers[step.id] ?? [];
        step.options.forEach((option) => {
            if (selectedLabels.includes(option.label)) {
                option.tags.forEach((tag) => tagSet.add(tag));
            }
        });
    });

    return Array.from(tagSet);
}

/**
 * Scores one animal against the desired tags.
 * Checks both animal.characteristics and animal.healthConditions arrays.
 * Returns the count of matching tags (higher = better match).
 */
function scoreAnimal(animal: TAnimal, desiredTags: string[]): number {
    const animalTags: string[] = [
        ...(animal.characteristics ?? []),
        ...(animal.healthCondition ?? []),
    ];
    return desiredTags.filter((tag) => animalTags.includes(tag)).length;
}

/**
 * Filters animals to those with at least 1 matching tag,
 * then sorts descending by score so best matches appear first.
 * If no tags provided, returns the full list unchanged.
 */
export function filterAnimalsBySmartMatch(
    animals: TAnimal[],
    desiredTags: string[],
): TAnimal[] {
    if (desiredTags.length === 0) return animals;

    return animals
        .map((animal) => ({ animal, score: scoreAnimal(animal, desiredTags) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ animal }) => animal);
}