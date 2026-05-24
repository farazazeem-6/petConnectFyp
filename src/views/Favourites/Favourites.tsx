'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashBoardHeader from '@/components/ui/DashBoardHeader/DashBoardHeader';
import {
  AnimalCard,
  AnimalCardSkeleton,
  AnimalDetailModal,
  EmptyActionBanner,
} from '@/components/ui';
import { CardGrid } from '@/components/elements';
import { HeartArrowIcon } from '@/components/svgs';
import { FavouriteContent, FavouritesWrapper } from './style';
import { useAuth } from '@/hooks';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { fetchAnimals } from '@/store/animal';
import { GRID_CSS } from '../BrowsePets/BrowsePets';
import { StaticRoutes } from '@/constants';
import type { TAnimal } from '@/utils/types';

export const Favourites = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { list: animals, loading } = useAppSelector((s: RootState) => s.animal);
  const router = useRouter();
  const [selectedAnimal, setSelectedAnimal] = useState<TAnimal | null>(null);

  // Driven by Redux — updates instantly when removeFavourite dispatches removeFavouritePetId
  const favPetIds = user?.favouritePetIds ?? [];

  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  const favouritedAnimals = useMemo<TAnimal[]>(() => {
    if (!favPetIds.length) return [];
    return animals.filter((a: TAnimal) =>
      a.petId ? favPetIds.includes(a.petId) : false,
    );
  }, [animals, favPetIds]);

  const isEmpty = !loading && favouritedAnimals.length === 0;

  return (
    <FavouritesWrapper>
      <DashBoardHeader
        heading="Favourites"
        subHeading="Manage your favourite pets and listings."
      />

      <FavouriteContent>
        {/* Loading skeletons */}
        {loading && (
          <CardGrid css={GRID_CSS}>
            {Array.from({ length: 4 }).map((_, i) => (
              <AnimalCardSkeleton key={i} />
            ))}
          </CardGrid>
        )}

        {/* Empty state */}
        {isEmpty && (
          <EmptyActionBanner
            title="No favourites yet"
            subtitle="Browse pets and tap the heart icon to save your favourites here."
            buttonText="Explore Pets"
            onClick={() => router.push(StaticRoutes.BROWSE_PETS)}
            icon={
              <HeartArrowIcon width={36} height={36} css={{ color: '$main' }} />
            }
          />
        )}

        {/* Favourited animal cards */}
        {!loading && favouritedAnimals.length > 0 && (
          <CardGrid css={GRID_CSS}>
            {favouritedAnimals.map((animal: TAnimal) => (
              <AnimalCard
                key={animal.id}
                image={animal.image}
                name={animal.name}
                breed={animal.breed ?? ''}
                age={`${animal.age} months`}
                location={animal.city ?? ''}
                badges={
                  [
                    animal.vaccinated ? 'Vaccinated' : '',
                    animal.neutered ? 'Neutered' : '',
                    animal.status === 'available' ? 'Available' : 'Adopted',
                  ].filter(Boolean) as string[]
                }
                favourite={true}
                onViewDetail={() => setSelectedAnimal(animal)}
                uid={user?.uid ?? ''}
                petId={animal.petId ?? ''}
                initialIsFav={true}
              />
            ))}
          </CardGrid>
        )}
      </FavouriteContent>

      {/* ── Animal detail modal ───────────────────────────────────────── */}
      <AnimalDetailModal
        isOpen={!!selectedAnimal}
        onClose={() => setSelectedAnimal(null)}
        animal={selectedAnimal}
      />
    </FavouritesWrapper>
  );
};
