'use client';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import {
  TestimonialsSectionWrapper,
  TestimonialsHeading,
  TestimonialsHeadingHighlight,
  TestimonialsSubtitle,
  TestimonialsGrid,
  TestimonialsSwiperWrapper,
  TestimonialCard,
  TestimonialQuote,
  TestimonialAuthorRow,
  TestimonialAvatar,
  TestimonialAvatarInitial,
  TestimonialAuthorInfo,
  TestimonialAuthorName,
  TestimonialAuthorCity,
} from './Testimonials.style';

import { TESTIMONIALS_DATA, TESTIMONIALS_SECTION_HEADING } from '@/constants';
import { MainHeading, MainSubHeading } from '@/components/styles';
import { Flex } from '@/components/elements';

// ---- Reusable card ----

const TestimonialCardItem = ({
  quote,
  name,
  city,
  initial,
}: (typeof TESTIMONIALS_DATA)[0]) => (
  <TestimonialCard>
    <TestimonialQuote as="p">"{quote}"</TestimonialQuote>
    <TestimonialAuthorRow>
      <TestimonialAvatar>
        <TestimonialAvatarInitial>{initial}</TestimonialAvatarInitial>
      </TestimonialAvatar>
      <TestimonialAuthorInfo>
        <TestimonialAuthorName>{name}</TestimonialAuthorName>
        <TestimonialAuthorCity>{city}</TestimonialAuthorCity>
      </TestimonialAuthorInfo>
    </TestimonialAuthorRow>
  </TestimonialCard>
);

// ---- Section ----

export const TestimonialsSection = () => {
  const { titleStart, titleHighlight, subtitle } = TESTIMONIALS_SECTION_HEADING;

  return (
    <TestimonialsSectionWrapper>
      {/* Heading */}
      <Flex direction="column" gap={12}>
        <MainHeading>
          {titleStart}{' '}
          <MainHeading css={{ color: '$main !important' }}>
            {titleHighlight}
          </MainHeading>
        </MainHeading>

        <MainSubHeading>{subtitle}</MainSubHeading>
      </Flex>

      {/* Desktop — 3-column grid */}
      <TestimonialsGrid>
        {TESTIMONIALS_DATA.map((item) => (
          <TestimonialCardItem key={item.id} {...item} />
        ))}
      </TestimonialsGrid>

      {/* Mobile — Swiper carousel (visible only on sm_max) */}
      <TestimonialsSwiperWrapper>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
        >
          {TESTIMONIALS_DATA.map((item) => (
            <SwiperSlide key={item.id}>
              <TestimonialCardItem {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </TestimonialsSwiperWrapper>
    </TestimonialsSectionWrapper>
  );
};
