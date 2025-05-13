// // utils/generateCertificate.js
// const PDFDocument = require("pdfkit");
// const fs = require("fs");
// const path = require("path");

// const generateCertificate = (userName, email) => {
//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument();
//     const fileName = `Certificate-${userName.replace(/\s+/g, '_')}.pdf`;
//     const filePath = path.join(__dirname, "..", "certificates", fileName);

//     // Ensure the certificates folder exists
//     if (!fs.existsSync(path.dirname(filePath))) {
//       fs.mkdirSync(path.dirname(filePath));
//     }

//     const stream = fs.createWriteStream(filePath);
//     doc.pipe(stream);

//     doc
//       .fontSize(24)
//       .text("Certificate of Appreciation", { align: "center" })
//       .moveDown();

//     doc
//       .fontSize(16)
//       .text(`This is to certify that`, { align: "center" })
//       .moveDown();

//     doc
//       .fontSize(20)
//       .text(`${userName}`, { align: "center", underline: true })
//       .moveDown();

//     doc
//       .fontSize(16)
//       .text(
//         `has actively participated in blood donation events and contributed to saving lives.`,
//         { align: "center" }
//       );

//     doc
//       .moveDown()
//       .fontSize(12)
//       .text(`Issued to: ${email}`, { align: "center" });

//     doc.end();

//     stream.on("finish", () => {
//       resolve(filePath);
//     });

//     stream.on("error", (err) => {
//       reject(err);
//     });
//   });
// };

// module.exports = generateCertificate;

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateCertificate = (userName, email, eventTitle, eventDate, eventLocation) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const fileName = `Certificate-${userName.replace(/\s+/g, '_')}-${eventTitle.replace(/\s+/g, '_')}.pdf`;
    const filePath = path.join(__dirname, "..", "certificates", fileName);

    // Ensure the certificates folder exists
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath));
    }

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc
      .fontSize(24)
      .text("Certificate of Appreciation", { align: "center" })
      .moveDown();

    doc
      .fontSize(16)
      .text(`This is to certify that`, { align: "center" })
      .moveDown();

    doc
      .fontSize(20)
      .text(`${userName}`, { align: "center", underline: true })
      .moveDown();

    doc
      .fontSize(16)
      .text(
        `has actively participated in the event "${eventTitle}", held on ${new Date(eventDate).toLocaleDateString()} at ${eventLocation}.`,
        { align: "center" }
      )
      .moveDown();

    doc
      .fontSize(14)
      .text(
        `Your contribution to saving lives through blood donation is deeply appreciated.`,
        { align: "center" }
      )
      .moveDown();

    doc
      .fontSize(12)
      .text(`Issued to: ${email}`, { align: "center" });

    doc.end();

    stream.on("finish", () => {
      resolve(filePath);
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
};

module.exports = generateCertificate;
