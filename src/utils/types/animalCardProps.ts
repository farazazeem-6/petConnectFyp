export interface AnimalCardProps {
    image: string;
    name: string;
    breed: string;
    age: string; // e.g. "2 Years" or "8 Months"
    badges: string[]; // e.g. ["Vaccinated", "Indoor Only"]
    onAdopt?: () => void;
    onLocationClick?: () => void;
}