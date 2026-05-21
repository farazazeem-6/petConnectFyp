// ---- Quick Links ----

import { StaticRoutes } from "./staticRoutes";

export const FOOTER_QUICK_LINKS = [
    { id: 1, label: 'Home', href: StaticRoutes.HOME },
    { id: 2, label: 'About Us', href: StaticRoutes.ABOUT_US },
    { id: 3, label: 'Contact Us', href: StaticRoutes.CONTACT_US },
    { id: 4, label: 'Terms & Conditions', href: StaticRoutes.TERMS_AND_CONDITIONS },
];

// ---- Contact Info ----

export const FOOTER_CONTACT_INFO = {
    address: 'Zam Zam Heights, Sabzazar , Lahore, Pakistan',
    phone: '+92 321 6893206',
    email: 'contactpetconnectpk@gmail.com',
};

// ---- Social Links ----

export const FOOTER_SOCIAL_LINKS = [
    { id: 1, label: 'Instagram', href: 'https://www.instagram.com/petconnectpk?igsh=MTc5bWpnOGh6YXB6ZA==', icon: 'instagram' },
    { id: 2, label: 'Twitter', href: 'https://x.com/PetConnectPk', icon: 'twitter' },
    { id: 3, label: 'Facebook', href: 'https://www.facebook.com/share/1KhpPPpodf/', icon: 'facebook' },
];

// ---- Newsletter ----

export const FOOTER_NEWSLETTER = {
    heading: 'Newsletter',
    description: 'Subscribe to stay updated on the latest pets and offers.',
    placeholder: 'Enter your email',
    buttonLabel: 'Subscribe',
    alreadySubscribedMessage: 'Email is already subscribed',
};

// ---- Brand ----

export const FOOTER_BRAND = {
    name: 'Pet Connect',
    copyrightText: 'All rights reserved.',
};