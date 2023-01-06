import React from 'react';
import { PDFDownloadLink, Document, Page } from 'react-pdf';

function SendPDF() {
  const pdfData = '...'; // The PDF data as a base64-encoded string
  const pdfUrl = `data:application/pdf;base64,${pdfData}`;
  const emailLink = `mailto:someone@example.com?subject=My PDF&body=Here is the PDF you requested&attachment=${pdfUrl}`;

  return (
    <PDFDownloadLink document={<MyPDF />} fileName="my-pdf.pdf">
      {({ blob, url, loading, error }) => (
        loading ? 'Loading document...' : <a href={emailLink}>Send PDF</a>
      )}
    </PDFDownloadLink>
  );
}
