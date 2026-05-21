export type AnimalType = 'dog' | 'cat' | 'fish' | 'bird' | 'mouse' | 'horse' | 'hamster' | 'rabbit' | 'turtle' | 'other' | '';
export type ReportType = 'lost' | 'found';

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
  createdAt?: string | number | Date | undefined;
  isFavourite?: boolean;
  petId?: string;
}

export interface TLostFoundReport {
  id?: string;
  userId: string;
  reportType: ReportType;
  name: string;
  type: AnimalType;
  breed?: string;           // optional
  color: string;
  age: string;              // descriptive, e.g. "~24 months"
  sex: 'male' | 'female' | 'unknown';
  image: string;
  distinguishingFeatures: string;
  lastSeenLocation: string;
  lastSeenDate: string;
  lastSeenTime: string;
  additionalDetails?: string;
  contactNumber: string;
  status: 'open' | 'resolved';
  createdAt?: string | number | Date | undefined;
}