'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { buildContact, type Contact } from './site-content';
import { defaultSeo } from '../lib/seo';

// Live contact details for client components, provided by the root layout from the current settings.
const ContactContext = createContext<Contact>(buildContact(defaultSeo.business));

export function ContactProvider({ value, children }: { value: Contact; children: ReactNode }) {
  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}

export const useContact = () => useContext(ContactContext);
