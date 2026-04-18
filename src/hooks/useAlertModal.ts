import { TAlertType } from '@/utils/types'
import { useState, useCallback } from 'react'
type TAlertState = {
    isOpen: boolean
    title: string
    type: TAlertType
}

type TUseAlertModalOptions = {
    defaultType?: TAlertType
}

export const useAlertModal = (options?: TUseAlertModalOptions) => {
    const [alertState, setAlertState] = useState<TAlertState>({
        isOpen: false,
        title: '',
        type: 'info', // Default type is 'info'
    })

    const showAlert = useCallback(
        (title: string, type?: TAlertType) => {
            setAlertState({
                isOpen: true,
                title,
                type: type ?? 'info', // Use provided type or fallback to info
            })
        },
        [options?.defaultType]
    )

    const hideAlert = useCallback(() => {
        setAlertState(prev => ({ ...prev, isOpen: false }))
    }, [])

    return { alertState, showAlert, hideAlert }
}
