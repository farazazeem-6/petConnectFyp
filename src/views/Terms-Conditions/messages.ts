export type TermsSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  listItems?: string[];
};

export const TERMS_AND_CONDITIONS = {
  heading: 'Terms & Conditions',
  subHeading: 'Last Updated: 26 May 2026',

  intro:
    'Welcome to Pet Connect. These Terms and Conditions govern your access to and use of our website, mobile experience, and related services. By creating an account, browsing listings, or using any part of the platform, you agree to be bound by these terms. Please read them carefully before using Pet Connect.',

  sections: [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      paragraphs: [
        'By accessing or using Pet Connect, you confirm that you are at least 18 years old or have the consent of a parent or legal guardian, and that you have the legal capacity to enter into a binding agreement.',
        'If you do not agree with any part of these terms, you must discontinue use of the platform immediately. Continued use after changes are posted constitutes acceptance of the revised terms.',
      ],
    },
    {
      id: 'platform-purpose',
      title: '2. Platform Purpose',
      paragraphs: [
        'Pet Connect is a community-driven platform that helps users browse pet adoption listings, report lost or found animals, connect with rescuers and adopters, and share information related to animal welfare.',
        'We provide tools to facilitate connections between users. Pet Connect is not a pet seller, breeder, shelter operator, or veterinary service provider unless explicitly stated otherwise.',
      ],
    },
    {
      id: 'user-accounts',
      title: '3. User Accounts & Responsibilities',
      paragraphs: [
        'You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. Notify us immediately if you suspect unauthorized access.',
        'You agree to provide accurate, current, and complete information when registering or creating listings, and to update your details when they change.',
      ],
      listItems: [
        'Use only one account per person unless authorized by Pet Connect.',
        'Do not impersonate another person, organization, or pet owner.',
        'Do not share your account credentials with others.',
        'Do not use automated tools to scrape, copy, or disrupt the platform.',
      ],
    },
    {
      id: 'listings-content',
      title: '4. Listings & User Content',
      paragraphs: [
        'When you post adoption listings, lost-and-found reports, images, descriptions, or other content, you represent that the information is truthful to the best of your knowledge and that you have the right to share it.',
        'You retain ownership of content you submit, but you grant Pet Connect a non-exclusive, worldwide, royalty-free license to display, store, and distribute that content for the purpose of operating and promoting the platform.',
      ],
      listItems: [
        'Do not post misleading, fraudulent, or duplicate listings.',
        'Do not upload content that is abusive, hateful, unlawful, or harmful to animals or people.',
        'Do not include personal contact details in public fields where prohibited by platform rules.',
        'Do not use copyrighted images or materials without permission.',
      ],
    },
    {
      id: 'adoption-transactions',
      title: '5. Adoption, Rehoming & Offline Interactions',
      paragraphs: [
        'Pet Connect helps users discover and connect with one another. Any adoption, purchase, transfer, meeting, or exchange of an animal happens directly between users and is not guaranteed or supervised by Pet Connect.',
        'You are solely responsible for verifying the health, temperament, ownership, and suitability of any pet or adopter before completing a transfer. We strongly recommend in-person meetings in safe public locations and, where appropriate, veterinary checks or documentation review.',
      ],
    },
    {
      id: 'prohibited-conduct',
      title: '6. Prohibited Conduct',
      paragraphs: [
        'You may not use Pet Connect in any way that violates applicable laws, harms animals, exploits users, or interferes with platform security or performance.',
      ],
      listItems: [
        'Animal trafficking, illegal breeding, or sale of protected species.',
        'Harassment, threats, spam, or solicitation unrelated to pet welfare.',
        'Attempting to bypass platform safeguards or access restricted data.',
        'Uploading malware, viruses, or harmful code.',
        'Misrepresenting the status, breed, age, or medical condition of an animal.',
      ],
    },
    {
      id: 'privacy-data',
      title: '7. Privacy & Data Use',
      paragraphs: [
        'Your use of Pet Connect is also subject to our privacy practices. We collect and process personal information such as account details, contact information, listing data, and usage activity to provide and improve our services.',
        'You agree not to misuse contact information obtained through the platform for unsolicited marketing, harassment, or any purpose unrelated to pet adoption or welfare.',
      ],
    },
    {
      id: 'intellectual-property',
      title: '8. Intellectual Property',
      paragraphs: [
        'The Pet Connect name, logo, design, software, and original platform content are owned by or licensed to Pet Connect and may not be copied, modified, or distributed without prior written permission.',
        'Trademarks, images, and content belonging to third parties remain the property of their respective owners.',
      ],
    },
    {
      id: 'disclaimers',
      title: '9. Disclaimers',
      paragraphs: [
        'Pet Connect is provided on an "as is" and "as available" basis. We do not guarantee that listings are accurate, that users will behave appropriately, or that the platform will be uninterrupted or error-free.',
        'We are not responsible for the actions, statements, health conditions, or legal status of pets, users, shelters, or third parties encountered through the platform.',
      ],
    },
    {
      id: 'limitation-liability',
      title: '10. Limitation of Liability',
      paragraphs: [
        'To the fullest extent permitted by law, Pet Connect and its team, partners, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.',
        'Our total liability for any claim related to the service shall not exceed the amount you paid to Pet Connect, if any, in the twelve months preceding the claim.',
      ],
    },
    {
      id: 'termination',
      title: '11. Suspension & Termination',
      paragraphs: [
        'We may suspend or terminate access to your account, remove content, or restrict features if we believe you have violated these terms, created risk for other users or animals, or engaged in unlawful activity.',
        'You may stop using the platform at any time. Provisions that by nature should survive termination, including disclaimers and limitations of liability, will remain in effect.',
      ],
    },
    {
      id: 'changes-contact',
      title: '12. Changes & Contact',
      paragraphs: [
        'We may update these Terms and Conditions from time to time. When we do, we will revise the "Last Updated" date at the top of this page. Material changes may also be communicated through the platform or by email where appropriate.',
        'If you have questions about these terms, please contact us at contactpetconnectpk@gmail.com or through our Contact Us page.',
      ],
    },
  ] satisfies TermsSection[],
};
