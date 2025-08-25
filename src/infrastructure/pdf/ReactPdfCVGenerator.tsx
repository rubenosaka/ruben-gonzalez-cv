import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Font,
} from '@react-pdf/renderer'

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
    fontSize: 9,
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    padding: '4px 8px',
    borderRadius: 4,
  },
})

const CVPDF = ({ cv }: { cv: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{cv.metadata.name}</Text>
        <Text style={styles.title}>{cv.metadata.title}</Text>
        <Text style={styles.contact}>
          {cv.metadata.location} • {cv.metadata.email}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.content}>{cv.metadata.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {cv.content.experience.map((exp: any, index: number) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.period}>{exp.period}</Text>
            </View>
            <Text style={styles.role}>{exp.title}</Text>
            <Text style={styles.content}>{exp.description}</Text>
          </View>
        ))}
      </View>

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
          <Text style={styles.skill}>AWS</Text>
          <Text style={styles.skill}>Docker</Text>
          <Text style={styles.skill}>Clean Architecture</Text>
          <Text style={styles.skill}>DDD</Text>
          <Text style={styles.skill}>SOLID Principles</Text>
        </View>
      </View>

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

export class ReactPdfCVGenerator {
  async generatePDF(cv: any): Promise<Buffer> {
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
}
