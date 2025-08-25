/**
 * This project is intentionally over-engineered (DDD, Hexagonal, SOLID) as part of a developer CV.
 * It demonstrates architectural thinking rather than being optimized for minimalism.
 *
 * This adapter implements the CVPdfGenerator port, showcasing the Hexagonal Architecture pattern.
 * It serves as an example of how external concerns (PDF generation) are isolated from the domain.
 */
import React from 'react'
import { CVPdfGenerator } from '@/domain/ports/CVPdfGenerator'
import { CV } from '@/domain/entities/CV'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Font,
} from '@react-pdf/renderer'

// Register fonts for proper UTF-8 support
Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
})

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Inter',
    fontSize: 11,
    lineHeight: 1.35,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1f2937',
  },
  title: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 4,
  },
  contact: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 8,
  },
  email: {
    color: '#3b82f6',
    textDecoration: 'none',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: 4,
  },
  content: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 12,
    breakInside: 'avoid',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  company: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  period: {
    fontSize: 10,
    color: '#6b7280',
  },
  role: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    backgroundColor: '#f3f4f6',
    padding: '4 8',
    borderRadius: 4,
    fontSize: 9,
    color: '#374151',
  },
  project: {
    marginBottom: 8,
    breakInside: 'avoid',
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 9,
    color: '#6b7280',
  },
})

interface CVPDFProps {
  cv: CV
}

const CVPDF = ({ cv }: CVPDFProps) => (
  <Document
    title={`${cv.name} - CV`}
    author={cv.name}
    subject="Professional CV"
    keywords="CV, resume, software engineer, full stack developer"
    creator="CV Generator"
    producer="React PDF"
  >
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{cv.name}</Text>
        <Text style={styles.title}>{cv.title}</Text>
        <Text style={styles.contact}>
          {cv.location} • {cv.email}
        </Text>
      </View>

      {/* Profile */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.content}>{cv.summary}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        <View style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <Text style={styles.company}>Frenetic.ai</Text>
            <Text style={styles.period}>02/2021 - Present</Text>
          </View>
          <Text style={styles.role}>Engineering Manager</Text>
          <Text style={styles.content}>
            Leading engineering team in the development of a SaaS platform for magnet design.
            Responsible for team leadership, architectural strategy, and implementation of best practices.
            Tech stack includes PHP 8 (Laravel 9), Vue 3, TypeScript, Pinia, MySQL, Python (REST API),
            AWS, serverless deployment, and PDF generation with Puppeteer.
          </Text>
        </View>

        <View style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <Text style={styles.company}>Isobar Spain (Dentsu Group)</Text>
            <Text style={styles.period}>04/2019 - 02/2021</Text>
          </View>
          <Text style={styles.role}>Team Lead / Full-Stack Developer</Text>
          <Text style={styles.content}>
            Technical lead on web and application projects using Python, PHP, Node.js/Express,
            React, and Material UI. Integrated CMS and e-commerce solutions including Salesforce,
            WordPress, Prestashop, Drupal, and Magento.
          </Text>
        </View>

        <View style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <Text style={styles.company}>Product School</Text>
            <Text style={styles.period}>06/2018 - 04/2019</Text>
          </View>
          <Text style={styles.role}>Full-Stack Developer</Text>
          <Text style={styles.content}>
            Developed components and apps, including an LMS using Node.js and React.
            Improved performance and SEO with advanced AWS deployment strategies,
            Git workflows, and Twig/Timber templating.
          </Text>
        </View>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skills}>
          <Text style={styles.skill}>JavaScript (ES6+)</Text>
          <Text style={styles.skill}>Vue 3</Text>
          <Text style={styles.skill}>React</Text>
          <Text style={styles.skill}>TypeScript</Text>
          <Text style={styles.skill}>Node.js/Express</Text>
          <Text style={styles.skill}>PHP (Laravel, Symfony)</Text>
          <Text style={styles.skill}>Python</Text>
          <Text style={styles.skill}>C#/.NET</Text>
          <Text style={styles.skill}>AWS</Text>
          <Text style={styles.skill}>Docker</Text>
          <Text style={styles.skill}>GitLab CI/CD</Text>
          <Text style={styles.skill}>Clean Architecture</Text>
          <Text style={styles.skill}>DDD</Text>
          <Text style={styles.skill}>SOLID Principles</Text>
        </View>
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portfolio</Text>
        <View style={styles.project}>
          <Text style={styles.projectTitle}>simulator.frenetic.ai</Text>
          <Text style={styles.projectDescription}>SaaS magnet simulator</Text>
        </View>
        <View style={styles.project}>
          <Text style={styles.projectTitle}>app.frenetic.ai</Text>
          <Text style={styles.projectDescription}>SaaS magnet design platform</Text>
        </View>
        <View style={styles.project}>
          <Text style={styles.projectTitle}>cartesio.com</Text>
          <Text style={styles.projectDescription}>Cartesio Investment Funds</Text>
        </View>
        <View style={styles.project}>
          <Text style={styles.projectTitle}>productschool.com</Text>
          <Text style={styles.projectDescription}>Product School platform</Text>
        </View>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        <Text style={styles.content}>
          Master's in Big Data & Business Analytics (2017-2020){'\n'}
          Higher Technical Diploma in Graphic Design 2D/3D (2005-2007)
        </Text>
      </View>
    </Page>
  </Document>
)

export class ReactPdfCVGenerator implements CVPdfGenerator {
  async generateFromCV(cv: CV): Promise<Buffer> {
    try {
      const blob = await pdf(<CVPDF cv={cv} />).toBlob()
      const arrayBuffer = await blob.arrayBuffer()
      return Buffer.from(arrayBuffer)
    } catch (error) {
      throw new Error(
        `Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  async generateFromHtml(html: string): Promise<Buffer> {
    throw new Error('generateFromHtml is deprecated. Use generateFromCV instead.')
  }
}
