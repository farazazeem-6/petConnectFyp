import { AppDispatch } from '../index';
import { setReports, setLFLoading, setLFError, addReportToState } from './lostFoundSlice';
import { addLostFoundReport, getLostFoundReports } from '@/lib/firebase';
import { TLostFoundReport } from '@/utils/types';

// ── Fetch all lost/found reports ──────────────────────────────────
export const fetchLostFoundReports = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLFLoading());
        const data = await getLostFoundReports();
        dispatch(setReports(data));
    } catch (err: any) {
        dispatch(setLFError(err.message));
    }
};

// ── Create a lost/found report ────────────────────────────────────
export const createLostFoundReport =
    (report: Omit<TLostFoundReport, 'status' | 'createdAt' | 'id'>) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLFLoading());
            const id = await addLostFoundReport(report);
            dispatch(
                addReportToState({
                    id,
                    ...report,
                    status: 'open',
                }),
            );
        } catch (err: any) {
            dispatch(setLFError(err.message));
        }
    };
