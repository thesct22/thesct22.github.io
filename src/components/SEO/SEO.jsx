import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getSiteContent } from '../../utils/dataParser';

export default function SEO() {
  const content = getSiteContent() || {};
  const basics = content.basics || {};
  const {
    name = '',
    role = '',
    roleDescription = '',
    website = '',
    linkedin = '',
  } = basics;

  const title = name && role ? `${name} | ${role}` : name;
  const description = roleDescription;

  // Compile sameAs array for JSON-LD schema
  const sameAsLinks = [];
  if (linkedin) sameAsLinks.push(linkedin);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: role,
    description,
    url: website,
    sameAs: sameAsLinks,
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>
  );
}
