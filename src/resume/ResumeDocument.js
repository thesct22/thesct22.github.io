/**
 * ResumeDocument.js
 *
 * Renders a professional, ATS-friendly resume PDF from content.yaml data.
 * Uses React.createElement — no JSX transpiler needed at build time.
 */

import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from '@react-pdf/renderer';

const h = React.createElement;

const colors = {
  primary: '#1a1a2e',
  accent: '#7c3aed',
  text: '#374151',
  textLight: '#6b7280',
  border: '#e5e7eb',
  bg: '#ffffff',
};

const s = StyleSheet.create({
  page: {
    padding: '36 40',
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: colors.text,
    backgroundColor: colors.bg,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 16,
    borderBottom: `2 solid ${colors.accent}`,
    paddingBottom: 12,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  role: {
    fontSize: 12,
    color: colors.accent,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  contactLink: {
    fontSize: 8.5,
    color: colors.accent,
    textDecoration: 'none',
    marginRight: 12,
  },
  section: { marginBottom: 12 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    borderBottom: `1 solid ${colors.border}`,
    paddingBottom: 3,
    marginBottom: 8,
  },
  summary: { fontSize: 9.5, color: colors.text, lineHeight: 1.5 },
  expEntry: { marginBottom: 8 },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  expRole: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },
  expDate: { fontSize: 8.5, color: colors.textLight, textAlign: 'right' },
  expCompanyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  expCompany: {
    fontSize: 9,
    fontFamily: 'Helvetica-Oblique',
    color: colors.accent,
  },
  expLocation: { fontSize: 8.5, color: colors.textLight },
  expDescription: { fontSize: 9, color: colors.text, lineHeight: 1.45 },
  eduEntry: { marginBottom: 6 },
  eduHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  eduDegree: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },
  eduDate: { fontSize: 8.5, color: colors.textLight },
  eduInstitution: {
    fontSize: 9,
    fontFamily: 'Helvetica-Oblique',
    color: colors.accent,
  },
  skillCategory: { marginBottom: 4 },
  skillCategoryTitle: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },
  skillItems: { fontSize: 9, color: colors.text },
  certRow: { flexDirection: 'row', alignItems: 'flex-start' },
  certBullet: { fontSize: 9, color: colors.accent, marginRight: 4 },
  certItem: { fontSize: 9, color: colors.text, marginBottom: 2 },
});

export default function ResumeDocument({ data }) {
  const basics = data.basics || {};
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const certifications = data.certifications || [];

  return h(
    Document,
    {
      title: `${basics.name} - Resume`,
      author: basics.name,
      subject: `${basics.role} Resume`,
      keywords: 'resume, CV, DevOps, engineer',
    },
    h(
      Page,
      { size: 'A4', style: s.page },

      // Header
      h(
        View,
        { style: s.header },
        h(Text, { style: s.name }, basics.name),
        h(Text, { style: s.role }, basics.role),
        h(
          View,
          { style: s.contactRow },
          basics.email &&
            h(
              Link,
              { src: `mailto:${basics.email}`, style: s.contactLink },
              basics.email
            ),
          basics.linkedin &&
            h(Link, { src: basics.linkedin, style: s.contactLink }, 'LinkedIn'),
          basics.github &&
            h(Link, { src: basics.github, style: s.contactLink }, 'GitHub'),
          basics.website &&
            h(
              Link,
              { src: basics.website, style: s.contactLink },
              basics.website
            )
        )
      ),

      // Summary
      basics.roleDescription &&
        h(
          View,
          { style: s.section },
          h(Text, { style: s.sectionTitle }, 'Professional Summary'),
          h(Text, { style: s.summary }, basics.roleDescription)
        ),

      // Experience
      experience.length > 0 &&
        h(
          View,
          { style: s.section },
          h(Text, { style: s.sectionTitle }, 'Experience'),
          ...experience.map((exp, i) =>
            h(
              View,
              { key: i, style: s.expEntry },
              h(
                View,
                { style: s.expHeader },
                h(Text, { style: s.expRole }, exp.role),
                h(
                  Text,
                  { style: s.expDate },
                  `${exp.startDate} — ${exp.endDate}`
                )
              ),
              h(
                View,
                { style: s.expCompanyRow },
                h(Text, { style: s.expCompany }, exp.company),
                h(Text, { style: s.expLocation }, exp.location)
              ),
              exp.description &&
                h(Text, { style: s.expDescription }, exp.description)
            )
          )
        ),

      // Education
      education.length > 0 &&
        h(
          View,
          { style: s.section },
          h(Text, { style: s.sectionTitle }, 'Education'),
          ...education.map((edu, i) =>
            h(
              View,
              { key: i, style: s.eduEntry },
              h(
                View,
                { style: s.eduHeader },
                h(Text, { style: s.eduDegree }, edu.degree),
                h(
                  Text,
                  { style: s.eduDate },
                  `${edu.startDate} — ${edu.endDate}`
                )
              ),
              h(Text, { style: s.eduInstitution }, edu.institution)
            )
          )
        ),

      // Skills
      skills.length > 0 &&
        h(
          View,
          { style: s.section },
          h(Text, { style: s.sectionTitle }, 'Skills'),
          ...skills.map((cat, i) =>
            h(
              View,
              { key: i, style: s.skillCategory },
              h(
                Text,
                null,
                h(Text, { style: s.skillCategoryTitle }, `${cat.category}: `),
                h(Text, { style: s.skillItems }, cat.items?.join(', '))
              )
            )
          )
        ),

      // Certifications
      certifications.length > 0 &&
        h(
          View,
          { style: s.section },
          h(Text, { style: s.sectionTitle }, 'Certifications'),
          ...certifications.map((cert, i) =>
            h(
              View,
              { key: i, style: s.certRow },
              h(Text, { style: s.certBullet }, '•'),
              h(Text, { style: s.certItem }, cert.name)
            )
          )
        )
    )
  );
}
