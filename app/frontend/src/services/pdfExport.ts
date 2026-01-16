/**
 * PDF Export Service
 * Generates PDF reports from HTML content
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFOptions {
  filename?: string;
  quality?: number;
  scale?: number;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
}

/**
 * Generate PDF from HTML element
 */
export async function generatePDF(
  element: HTMLElement,
  options: PDFOptions = {}
): Promise<void> {
  const {
    filename = 'report.pdf',
    quality = 0.95,
    scale = 2,
    format = 'a4',
    orientation = 'portrait',
  } = options;

  try {
    // Show loading state
    const loadingEl = document.createElement('div');
    loadingEl.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]';
    loadingEl.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071E3] mx-auto mb-4"></div>
        <p class="text-[#1D1D1F] dark:text-[#F5F5F7]">PDF 생성 중...</p>
      </div>
    `;
    document.body.appendChild(loadingEl);

    // Wait for next tick to ensure loading is shown
    await new Promise(resolve => setTimeout(resolve, 100));

    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement;

    // Create a temporary container for the clone
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '210mm'; // A4 width
    container.style.padding = '20mm';
    container.style.background = 'white';
    container.appendChild(clone);
    document.body.appendChild(container);

    // Convert to canvas
    const canvas = await html2canvas(clone, {
      scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Remove temporary container
    document.body.removeChild(container);

    // Calculate PDF dimensions
    const imgWidth = orientation === 'portrait' ? 210 : 297; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format,
    });

    // Add image to PDF
    const imgData = canvas.toDataURL('image/jpeg', quality);
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

    // Save PDF
    pdf.save(filename);

    // Remove loading state
    document.body.removeChild(loadingEl);
  } catch (error) {
    // Remove loading state if it exists
    const loadingEl = document.querySelector('.fixed.inset-0');
    if (loadingEl) {
      document.body.removeChild(loadingEl);
    }
    throw error;
  }
}

/**
 * Generate multi-page PDF from long content
 */
export async function generateMultiPagePDF(
  element: HTMLElement,
  options: PDFOptions = {}
): Promise<void> {
  const {
    filename = 'report.pdf',
    quality = 0.95,
    scale = 2,
    format = 'a4',
    orientation = 'portrait',
  } = options;

  try {
    // Show loading state
    const loadingEl = document.createElement('div');
    loadingEl.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]';
    loadingEl.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071E3] mx-auto mb-4"></div>
        <p class="text-[#1D1D1F] dark:text-[#F5F5F7]">PDF 생성 중...</p>
      </div>
    `;
    document.body.appendChild(loadingEl);

    // Wait for next tick
    await new Promise(resolve => setTimeout(resolve, 100));

    // Clone the element
    const clone = element.cloneNode(true) as HTMLElement;

    // Create temporary container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '210mm';
    container.style.padding = '20mm';
    container.style.background = 'white';
    container.appendChild(clone);
    document.body.appendChild(container);

    // Convert to canvas
    const canvas = await html2canvas(clone, {
      scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Remove temporary container
    document.body.removeChild(container);

    // Calculate dimensions
    const pdfWidth = orientation === 'portrait' ? 210 : 297;
    const pdfHeight = orientation === 'portrait' ? 297 : 210;
    const imgWidth = pdfWidth - 40; // 20mm margin on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format,
    });

    const imgData = canvas.toDataURL('image/jpeg', quality);
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 20, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 20, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // Save PDF
    pdf.save(filename);

    // Remove loading state
    document.body.removeChild(loadingEl);
  } catch (error) {
    const loadingEl = document.querySelector('.fixed.inset-0');
    if (loadingEl) {
      document.body.removeChild(loadingEl);
    }
    throw error;
  }
}

/**
 * Generate simple text-based PDF
 */
export async function generateTextPDF(
  title: string,
  content: string,
  options: PDFOptions = {}
): Promise<void> {
  const {
    filename = 'report.pdf',
    format = 'a4',
    orientation = 'portrait',
  } = options;

  try {
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format,
    });

    // Add title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title, 20, 20);

    // Add content
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');

    const lines = pdf.splitTextToSize(content, 170);
    pdf.text(lines, 20, 40);

    // Save PDF
    pdf.save(filename);
  } catch (error) {
    throw error;
  }
}
