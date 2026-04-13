'use client';

import React from 'react';
import Link from 'next/link';

import {
  FooterWrapper,
  FooterTopRow,
  FooterLeftCol,
  FooterLogoWrapper,
  FooterAddressBlock,
  FooterAddressLine,
  FooterSocialRow,
  FooterSocialLink,
  FooterMiddleCol,
  FooterColHeading,
  FooterLinksList,
  FooterLink,
  FooterRightCol,
  FooterNewsletterDescription,
  FooterSubscribeForm,
  FooterEmailInput,
  FooterSubscribeButton,
  FooterSubscribeNote,
  FooterDivider,
  FooterBottomRow,
  FooterCopyright,
} from './Footer.style';

import {
  FOOTER_QUICK_LINKS,
  FOOTER_CONTACT_INFO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_NEWSLETTER,
  FOOTER_BRAND,
} from '@/constants';
import { getCurrentYear } from '@/utils/helpers';
import { WebLogo } from '@/components/elements';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '@/components/svgs';

import {
  useFooterNewsletter,
  SUBSCRIBE_MESSAGES,
  SubscribeStatus,
} from '@/hooks';

// ---- Social icon map ----

const SOCIAL_ICON_MAP: Record<string, React.FC> = {
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  facebook: FacebookIcon,
};

// ---- Component ----

export const Footer = () => {
  const { address, phone, email: contactEmail } = FOOTER_CONTACT_INFO;
  const { heading, description, placeholder, buttonLabel } = FOOTER_NEWSLETTER;
  const { name: brandName, copyrightText } = FOOTER_BRAND;

  const {
    email,
    status,
    inputRef,
    showNote,
    isLoading,
    isSuccess,
    handleChange,
    handleSubmit,
  } = useFooterNewsletter();

  return (
    <FooterWrapper as="footer">
      {/* ---- Top section ---- */}
      <FooterTopRow>
        {/* Left — logo, address, socials */}
        <FooterLeftCol>
          <FooterLogoWrapper>
            <WebLogo />
          </FooterLogoWrapper>

          <FooterAddressBlock>
            <FooterAddressLine>{address}</FooterAddressLine>
            <FooterAddressLine>Phone: {phone}</FooterAddressLine>
            <FooterAddressLine>Email: {contactEmail}</FooterAddressLine>
          </FooterAddressBlock>

          <FooterSocialRow>
            {FOOTER_SOCIAL_LINKS.map(({ id, label, href, icon }) => {
              const Icon = SOCIAL_ICON_MAP[icon];
              return (
                <FooterSocialLink
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  {Icon && <Icon />}
                </FooterSocialLink>
              );
            })}
          </FooterSocialRow>
        </FooterLeftCol>

        {/* Middle — Quick Links */}
        <FooterMiddleCol>
          <FooterColHeading>Quick Links</FooterColHeading>
          <FooterLinksList>
            {FOOTER_QUICK_LINKS.map(({ id, label, href }) => (
              <Link key={id} href={href} style={{ textDecoration: 'none' }}>
                <FooterLink as="span">{label}</FooterLink>
              </Link>
            ))}
          </FooterLinksList>
        </FooterMiddleCol>

        {/* Right — Newsletter */}
        <FooterRightCol>
          <FooterColHeading>{heading}</FooterColHeading>
          <FooterNewsletterDescription>
            {description}
          </FooterNewsletterDescription>

          <FooterSubscribeForm onSubmit={handleSubmit} noValidate={false}>
            <FooterEmailInput
              ref={inputRef}
              type="email"
              placeholder={placeholder}
              value={email}
              required
              onChange={handleChange}
              disabled={isLoading}
            />
            <FooterSubscribeButton type="submit" disabled={isLoading}>
              {isLoading ? 'Subscribing...' : buttonLabel}
            </FooterSubscribeButton>
          </FooterSubscribeForm>

          {showNote && (
            <FooterSubscribeNote isSuccess={isSuccess}>
              {
                SUBSCRIBE_MESSAGES[
                  status as Exclude<SubscribeStatus, 'idle' | 'loading'>
                ]
              }
            </FooterSubscribeNote>
          )}
        </FooterRightCol>
      </FooterTopRow>

      {/* ---- Divider ---- */}
      <FooterDivider />

      {/* ---- Copyright ---- */}
      <FooterBottomRow>
        <FooterCopyright>
          © {getCurrentYear()} {brandName}. {copyrightText}
        </FooterCopyright>
      </FooterBottomRow>
    </FooterWrapper>
  );
};
