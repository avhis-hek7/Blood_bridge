// const PDFDocument = require("pdfkit");
// const fs = require("fs");
// const path = require("path");

// const generateCertificate = (userName, email, eventTitle, eventDate, eventLocation) => {
//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument({
//       size: 'A4',
//       layout: 'landscape',
//       margin: 50
//     });

//     const fileName = `Certificate-${userName.replace(/\s+/g, '_')}-${eventTitle.replace(/\s+/g, '_')}.pdf`;
//     const filePath = path.join(__dirname, "..", "certificates", fileName);

//     if (!fs.existsSync(path.dirname(filePath))) {
//       fs.mkdirSync(path.dirname(filePath));
//     }

//     const stream = fs.createWriteStream(filePath);
//     doc.pipe(stream);

//     // === Colors & Fonts ===
//     const primaryColor = "#3d2b1f";
//     const secondaryColor = "#d4af37";

//     // === Add logo ===
//     const logoPath = path.join(__dirname, "..", "assets", "logo1.jpg");
//     if (fs.existsSync(logoPath)) {
//       doc.image(logoPath, doc.page.width / 2 - 40, 40, { width: 80 });
//     }

//     doc
//       .fillColor(primaryColor)
//       .fontSize(36)
//       .font("Times-Bold")
//       .text("CERTIFICATE", { align: "center" });

//     doc
//       .fillColor(secondaryColor)
//       .fontSize(24)
//       .font("Times-Roman")
//       .text("OF APPRECIATION", { align: "center" });

//     doc
//       .moveDown()
//       .fillColor(primaryColor)
//       .fontSize(14)
//       .text("THE FOLLOWING AWARD IS GIVEN TO", { align: "center" });

//     doc
//       .moveDown(0.5)
//       .fontSize(30)
//       .fillColor(primaryColor)
//       .font("Courier-BoldOblique")
//       .text(userName, { align: "center", underline: true });

//     doc
//       .moveDown()
//       .font("Helvetica")
//       .fontSize(14)
//       .fillColor("black")
//       .text(
//         `In recognition of your participation in "${eventTitle}" on ${new Date(eventDate).toLocaleDateString()} at ${eventLocation}.`,
//         {
//           align: "center",
//           width: 600,
//         }
//       );

//     doc
//       .moveDown()
//       .font("Helvetica-Oblique")
//       .text("Your contribution to saving lives through blood donation is deeply appreciated.", {
//         align: "center"
//       });

//     // === Seal / Medal icon (placeholder) ===
//     const medalPath = path.join(__dirname, "..", "assets", "medal.png");
//     if (fs.existsSync(medalPath)) {
//       doc.image(medalPath, doc.page.width / 2 - 30, doc.y + 20, { width: 60 });
//     }

//     // === Signature and Title ===
//     const sigY = doc.page.height - 150;

//     const signPath = path.join(__dirname, "..", "assets", "signature.png");
//     if (fs.existsSync(signPath)) {
//       doc.image(signPath, doc.page.width / 2 - 60, sigY, { width: 120 });
//     }

//     doc
//       .font("Helvetica-Bold")
//       .fontSize(12)
//       .fillColor("black")
//       .text("Susan Adhikari", doc.page.width / 2 - 60, sigY + 50, { align: "center", width: 120 });

//     doc
//       .font("Helvetica")
//       .fontSize(10)
//       .text("Head of Event", doc.page.width / 2 - 60, sigY + 65, { align: "center", width: 120 });

//     doc.end();

//     stream.on("finish", () => resolve(filePath));
//     stream.on("error", reject);
//   });
// };

// module.exports = generateCertificate;

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateCertificate = (userName, email, eventTitle, eventDate, eventLocation) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      layout: 'landscape',
      margin: 50
    });

    const fileName = `Certificate-${userName.replace(/\s+/g, '_')}-${eventTitle.replace(/\s+/g, '_')}.pdf`;
    const filePath = path.join(__dirname, "..", "certificates", fileName);

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // === Colors & Fonts ===
    const primaryColor = "#3d2b1f";
    const secondaryColor = "#d4af37";

    // === Add Logo at Top Center ===
    const logoPath = path.join(__dirname, "..", "assets", "logo1.jpg");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, (doc.page.width - 80) / 2, 30, { width: 80 });
    }

    // === Title Section ===
    doc
      .moveDown(4.5)
      .fillColor(primaryColor)
      .font("Times-Bold")
      .fontSize(36)
      .text("CERTIFICATE", { align: "center" });

    doc
      .moveDown(0.3)
      .fillColor(secondaryColor)
      .font("Times-Roman")
      .fontSize(24)
      .text("OF APPRECIATION", { align: "center" });

    doc
      .moveDown(1)
      .fillColor(primaryColor)
      .font("Helvetica")
      .fontSize(14)
      .text("This is awarded to", { align: "center" });

    doc
      .moveDown(0.5)
      .font("Courier-BoldOblique")
      .fontSize(30)
      .fillColor(primaryColor)
      .text(userName, { align: "center", underline: true });

    // === Participation Details ===
    doc
      .moveDown(1)
      .font("Helvetica")
      .fontSize(14)
      .fillColor("black")
      .text(
        `In recognition of your participation in "${eventTitle}" on ${new Date(eventDate).toLocaleDateString()} at ${eventLocation}.`,
        { align: "center", width: 600 }
      );

    doc
      .moveDown(0.5)
      .font("Helvetica-Oblique")
      .text(
        "Your contribution to saving lives through blood donation is deeply appreciated.",
        { align: "center", width: 600 }
      );

    // === Medal Icon Centered ===
    const medalPath = path.join(__dirname, "..", "assets", "medal.png");
    if (fs.existsSync(medalPath)) {
      doc.image(medalPath, (doc.page.width - 60) / 2, doc.y + 20, { width: 60 });
    }

    // === Signature Block ===
    const sigY = doc.page.height - 140;
    const signPath = path.join(__dirname, "..", "assets", "signature.png");

    if (fs.existsSync(signPath)) {
      doc.image(signPath, (doc.page.width - 120) / 2, sigY, { width: 120 });
    }

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor("black")
      .text("Susan Adhikari", (doc.page.width - 120) / 2, sigY + 50, {
        align: "center",
        width: 120
      });

    doc
      .font("Helvetica")
      .fontSize(10)
      .text("Head of Event", (doc.page.width - 120) / 2, sigY + 65, {
        align: "center",
        width: 120
      });

    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};

module.exports = generateCertificate;
