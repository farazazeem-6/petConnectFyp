export interface AnimalCardProps {
    image: string;
    name: string;
    breed?: string;
    age?: string;
    location?: string;
    badges?: string[];
    onAdopt?: () => void;
    onViewDetail?: () => void;
    // ── Owner actions (shown only in My Listing) ──────────
    onEdit?: () => void;
    onDelete?: () => void;
    // ── Report (lost/found) variant ────────────
    variant?: 'adoption' | 'report';
    reportType?: 'lost' | 'found';
    dateSeen?: string;
    reportStatus?: 'open' | 'resolved';
    color?: string;
    favourite?: boolean | undefined;
    uid?: string | undefined;
    petId?: string | undefined;
    initialIsFav?: boolean | undefined;
}