export type AnimalType = 'dog' | 'cat' | 'fish' | 'bird' | 'mouse' | 'horse' | 'hamster' | 'rabbit' | 'turtle' | 'other' | '';

export const ANIMAL_OPTIONS: { label: string; value: AnimalType }[] = [
  { label: 'Dog', value: 'dog' },
  { label: 'Cat', value: 'cat' },
  { label: 'Fish', value: 'fish' },
  { label: 'Bird', value: 'bird' },
  { label: 'Mouse', value: 'mouse' },
  { label: 'Horse', value: 'horse' },
  { label: 'Hamster', value: 'hamster' },
  { label: 'Rabbit', value: 'rabbit' },
  { label: 'Turtle', value: 'turtle' },
  { label: 'Other', value: 'other' },
];

export interface TAnimal {
    id?: string;
    userId: string;
    name: string;
    type: AnimalType;
    breed?: string;
    color?: string;
    age: number;
    sex?: 'male' | 'female' | 'unknown';
    image: string;
    imageFile?: File;
    healthCondition: string[];
    characteristics?: string[];
    city?: string;
    address?: string;
    phoneNumber?: string;
    description?: string;
    status: 'available' | 'adopted';
    vaccinated?: boolean;
    neutered?: boolean;
    createdAt?: any;
}