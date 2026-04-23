export interface TFilterState {
    animalType: string;
    breed: string;
    minAge: string;
    maxAge: string;
    city: string;
    gender: string;
    vaccinated: boolean;
}

export interface TFilterSidebarProps {
    filters: TFilterState;
    onChange: (updated: TFilterState) => void;
    onReset: () => void;
    isOpen: boolean;
    onClose: () => void;
    breedOptions?: string[];
    cityOptions?: string[];
}