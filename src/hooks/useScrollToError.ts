import { useCallback, RefObject } from 'react';

type FieldRef = RefObject<HTMLElement | HTMLInputElement | HTMLDivElement | null>;

export function useScrollToError<T>(
  fieldRefs: Record<keyof T, FieldRef>,
  errors: Partial<Record<keyof T, string>>,
) {
  const scrollToFirstError = useCallback((explicitErrors?: Partial<Record<keyof T, string>>) => {
    const activeErrors = explicitErrors || errors;
    const firstErrorKey = (Object.keys(activeErrors) as (keyof T)[]).find(
      (key) => !!activeErrors[key],
    );

    if (!firstErrorKey) return;

    const ref = fieldRefs[firstErrorKey];
    if (!ref?.current) return;

    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    // Focus the element if it supports focus
    if ('focus' in ref.current && typeof ref.current.focus === 'function') {
      ref.current.focus({ preventScroll: true });
    }
  }, [errors, fieldRefs]);

  return { scrollToFirstError };
}
