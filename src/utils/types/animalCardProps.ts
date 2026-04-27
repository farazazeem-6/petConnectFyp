export interface AnimalCardProps {
    image: string;
    name: string;
    breed?: string;
    age?: string;
    location?: string;
    badges?: string[];
    onAdopt?: () => void;
    onViewDetail?: () => void;
    // ── Report (lost/found) variant ────────────
    variant?: 'adoption' | 'report';
    reportType?: 'lost' | 'found';
    dateSeen?: string;
    reportStatus?: 'open' | 'resolved';
    color?: string;
}