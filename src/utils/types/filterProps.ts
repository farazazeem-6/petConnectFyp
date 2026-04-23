export interface FilterState {
    animalType: string;
    breed: string;
    minAge: string;
    maxAge: string;
    city: string;
    gender: string;
    vaccinated: boolean;
}

export interface FilterSidebarProps {
    filters: FilterState;
    onChange: (updated: FilterState) => void;
    onReset: () => void;
    isOpen: boolean;
    onClose: () => void;
    breedOptions?: string[];
    cityOptions?: string[];
}