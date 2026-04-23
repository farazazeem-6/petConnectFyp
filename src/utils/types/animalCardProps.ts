export interface AnimalCardProps {
    image: string;
    name: string;
    breed: string;
    age: string;
    badges: string[];
    onAdopt?: () => void;
}