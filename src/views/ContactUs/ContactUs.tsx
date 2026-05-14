'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import {
  ContactUsWrapper,
  ContentRow,
  ErrorText,
  FormColumn,
  FormGroup,
  FormLabel,
  FormTextarea,
  InfoCard,
  InfoCardTitle,
  InfoColumn,
  InfoIconWrapper,
  InfoItem,
  InfoLabel,
  InfoTextContent,
  InfoValue,
  MapCard,
  MapIframeWrapper,
  MapTitle,
} from './ContactUs.style';
import { Button, Input } from '@/components/elements';
import { Selection } from '@/components/elements/Select';
import DashBoardHeader from '@/components/ui/DashBoardHeader/DashBoardHeader';
import { FOOTER_CONTACT_INFO } from '@/constants';
import {
  ChatIcon,
  LocationIcon,
  WhatsappIcon,
  CalendarIcon,
} from '@/components/svgs';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  subject: yup.string().required('Subject is required'),
  queryType: yup.string().required('Query type is required'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters'),
});

type FormData = yup.InferType<typeof schema>;

const QUERY_OPTIONS = [
  { label: 'General Inquiry', value: 'general' },
  { label: 'Report a Bug', value: 'bug' },
  { label: 'Feedback', value: 'feedback' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Other', value: 'other' },
];

export const ContactUs = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      queryType: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast.success('Your message has been sent successfully!');
      reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <ContactUsWrapper>
      <DashBoardHeader
        heading="Contact Us"
        subHeading="Have a question or want to report an issue? Fill out the form below and our team will get back to you shortly."
      />

      <ContentRow>
        {/* Left Column: Form */}
        <FormColumn>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter your name"
                    invalid={!!errors.name}
                  />
                )}
              />
              {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <FormLabel>Email</FormLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    invalid={!!errors.email}
                  />
                )}
              />
              {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <FormLabel>Subject</FormLabel>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter message subject"
                    invalid={!!errors.subject}
                  />
                )}
              />
              {errors.subject && (
                <ErrorText>{errors.subject.message}</ErrorText>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel>Query Type</FormLabel>
              <Controller
                name="queryType"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Selection
                    options={QUERY_OPTIONS}
                    value={value}
                    onChange={onChange}
                    placeholder="Select a query type"
                    enableSearch={false}
                  />
                )}
              />
              {errors.queryType && (
                <ErrorText>{errors.queryType.message}</ErrorText>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel>Message</FormLabel>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <FormTextarea
                    {...field}
                    placeholder="Type your message here..."
                    invalid={!!errors.message}
                  />
                )}
              />
              {errors.message && (
                <ErrorText>{errors.message.message}</ErrorText>
              )}
            </FormGroup>

            <Button
              type="submit"
              variant="default"
              disabled={isSubmitting}
              css={{
                width: '$percent$100',
                marginTop: '$px$12',
                color: '$white !important',
                backgroundColor: '$main !important',
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </FormColumn>

        {/* Right Column: Info and Map */}
        <InfoColumn>
          <InfoCard>
            <InfoCardTitle as="h2">Contact Information</InfoCardTitle>

            <InfoItem>
              <InfoIconWrapper>
                <ChatIcon width={20} height={20} css={{ color: 'inherit' }} />
              </InfoIconWrapper>
              <InfoTextContent>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>{FOOTER_CONTACT_INFO.email}</InfoValue>
              </InfoTextContent>
            </InfoItem>

            <InfoItem>
              <InfoIconWrapper>
                <WhatsappIcon
                  width={20}
                  height={20}
                  css={{ color: 'inherit' }}
                />
              </InfoIconWrapper>
              <InfoTextContent>
                <InfoLabel>Phone</InfoLabel>
                <InfoValue>{FOOTER_CONTACT_INFO.phone}</InfoValue>
              </InfoTextContent>
            </InfoItem>

            <InfoItem>
              <InfoIconWrapper>
                <CalendarIcon
                  width={20}
                  height={20}
                  css={{ color: 'inherit' }}
                />
              </InfoIconWrapper>
              <InfoTextContent>
                <InfoLabel>Working Hours</InfoLabel>
                <InfoValue>10:00 AM to 06:00 PM</InfoValue>
              </InfoTextContent>
            </InfoItem>

            <InfoItem>
              <InfoIconWrapper>
                <LocationIcon
                  width={20}
                  height={20}
                  css={{ color: 'inherit' }}
                />
              </InfoIconWrapper>
              <InfoTextContent>
                <InfoLabel>Location</InfoLabel>
                <InfoValue>{FOOTER_CONTACT_INFO.address}</InfoValue>
              </InfoTextContent>
            </InfoItem>
          </InfoCard>

          <MapCard>
            <MapTitle as="h2">Our Location</MapTitle>
            <MapIframeWrapper>
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.138088135463!2d74.2684371!3d31.520367099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x68baff11090b35d1%3A0xfbb26d092024d167!2sTacticMinds!5e0!3m2!1sen!2s!4v1757572547660!5m2!1sen!2s"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </MapIframeWrapper>
          </MapCard>
        </InfoColumn>
      </ContentRow>
    </ContactUsWrapper>
  );
};
