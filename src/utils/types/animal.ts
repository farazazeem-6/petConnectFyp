export interface Animal {
    id?: string;
    name: string;
    type: 'dog' | 'cat' | 'bird';
    breed?: string;
    age: number;
    sex?: 'male' | 'female';
    city?: string;
    status: 'available' | 'adopted';
    image: string;
    description: string;
    vaccinated?: boolean;
    neutered?: boolean;
    createdAt?: any;
}