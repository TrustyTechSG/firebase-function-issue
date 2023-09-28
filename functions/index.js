/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const puppeteer = require("puppeteer");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.captureGoogle = functions
  .runWith({
    memory: "1GB",
  })
  .https.onRequest(async (request, response) => {
    try {
      const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: {
          width: 1280,
          height: 800,
        },
      });
  
      const page = await browser.newPage();
      await page.goto(`https://www.google.com/`);
      const imageBuffer = await page.screenshot({ fullPage: true });
      await browser.close();
  
      response.writeHead(200, { "Content-Type": "image/png" });
      response.write(imageBuffer.toString("binary"), "binary");
      response.end();
    } catch(err) {
      response.send(err.message);
    }
  });
