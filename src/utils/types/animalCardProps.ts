export interface AnimalCardProps {
    image: string;
    name: string;
    breed: string;
    age: string;
    location?: string;
    badges: string[];
    onAdopt?: () => void;
    onViewDetail?: () => void;
}