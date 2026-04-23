export interface TAnimal {
    id?: string;
    name: string;
    type: 'dog' | 'cat' | 'bird';
    breed?: string;
    color?: string,
    age: number;
    sex?: 'male' | 'female' | 'unknown';
    city?: string;
    address: string
    status: 'available' | 'adopted';
    image: string;
    description?: string;
    vaccinated?: boolean;
    neutered?: boolean;
    createdAt?: any;
}