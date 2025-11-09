// src/lib/pdf.ts
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Renders a DOM node to a paginated A4 PDF and downloads it.
 * - elementId: id of the container to print (must be visible in the DOM)
 * - filename: suggested download name
 */
export async function downloadElementAsPDF(elementId: string, filename = "resume.pdf") {
  const el = document.getElementById(elementId);
  if (!el) throw new Error(`Element #${elementId} not found`);

  // --- TEMPORARILY adjust style to avoid outer shadows/padding ---
  const original = {
    boxShadow: el.style.boxShadow,
    margin: el.style.margin,
    background: el.style.backgroundColor,
  };
  el.style.boxShadow = "none";
  el.style.margin = "0";
  el.style.backgroundColor = "#ffffff"; // white background for rendering

  // --- Use higher scale for clarity ---
  const scale = Math.min(2, window.devicePixelRatio || 1.5);

  const canvas = await html2canvas(el, {
    backgroundColor: "#ffffff",
    scale,
    useCORS: true,
    allowTaint: false,
    logging: false,
    windowWidth: el.scrollWidth,
    windowHeight: el.scrollHeight,
    scrollX: 0,
    scrollY: 0,
  });

  // Restore original styles
  el.style.boxShadow = original.boxShadow;
  el.style.margin = original.margin;
  el.style.backgroundColor = original.background;

  const imgData = canvas.toDataURL("image/png");

  // --- PDF dimensions (A4 portrait) ---
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // --- Compute proportional image size ---
  const pxPerMM = canvas.width / pageWidth;
  const imgHeightMM = canvas.height / pxPerMM;

  // --- Small tweak to eliminate borders ---
  const marginX = 0; // default was ~10, removed for full-width fit
  const marginY = 0;

  if (imgHeightMM <= pageHeight) {
    // Single page — fit perfectly to A4 width, no margin
    pdf.addImage(imgData, "PNG", marginX, marginY, pageWidth, imgHeightMM, undefined, "FAST");
  } else {
    // Multi-page slicing (kept from your version, just adjusted to start at 0,0)
    let remainingHeight = imgHeightMM;
    let canvasPageY = 0; // px offset in canvas

    while (remainingHeight > 0) {
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      const pageHeightPx = Math.floor(pageHeight * pxPerMM);
      pageCanvas.height = Math.min(pageHeightPx, canvas.height - canvasPageY);

      const ctx = pageCanvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D context not available");

      ctx.drawImage(
        canvas,
        0,
        canvasPageY,
        pageCanvas.width,
        pageCanvas.height,
        0,
        0,
        pageCanvas.width,
        pageCanvas.height
      );

      const pageData = pageCanvas.toDataURL("image/png");
      const pageSliceHeightMM = pageCanvas.height / pxPerMM;

      if (canvasPageY > 0) pdf.addPage();
      pdf.addImage(pageData, "PNG", marginX, marginY, pageWidth, pageSliceHeightMM, undefined, "FAST");

      remainingHeight -= pageHeight;
      canvasPageY += pageHeightPx;
    }
  }

  pdf.save(filename);
}
