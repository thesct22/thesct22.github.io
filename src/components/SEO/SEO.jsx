import { Helmet } from 'react-helmet-async';
import { getSiteContent } from '../../utils/dataParser';

export default function SEO() {
  const content = getSiteContent() || {};
  const basics = content.basics || {};
  const {
    name = '',
    role = '',
    bio = '',
    website = '',
    github = '',
    linkedin = '',
  } = basics;

  const title = name && role ? `${name} | ${role}` : name;

  const sameAsLinks = [github, linkedin].filter(Boolean);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: role,
    description: bio,
    url: website,
    sameAs: sameAsLinks,
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={bio} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={bio} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={website} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={bio} />
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>
  );
}
