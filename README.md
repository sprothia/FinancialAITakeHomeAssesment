# Financial Statement Analyzer :bar_chart:

A web application designed to upload, parse, and analyze financial statements using OpenAI's API, built with React, Node.js, and Express, and leveraging Firebase for storage.

## Description :page_facing_up:

This application allows users to upload financial statements in PDF format. It then extracts text data from these PDFs, sends the data to OpenAI's API for processing, and displays relevant financial metrics and insights on the frontend. This tool is ideal for financial analysts, investors, and business owners looking to gain quick insights from financial documents.

## Tech Stack :rocket:

### Dependencies :gear:

- Node.js
- React
- Firebase
- Multer for file upload handling
- PDF-Parse for extracting text from PDFs
- Express.js for backend routing
- OpenAI API


## Features :sparkles:

- **PDF Upload**: Secure and efficient uploading of financial statement PDFs.
- **Text Extraction**: Automated extraction of textual data from PDFs.
- **Data Analysis**: Utilizing OpenAI's API to provide insightful financial metrics.
- **Intuitive UI**: A user-friendly React-based frontend.
- **Secure Storage**: Using Firebase for storing uploaded files.

## How to Use? :bookmark_tabs:

1. Click on the 'Upload PDF' button and select your financial statement file.
2. View the extracted text and the analyzed financial metrics once processing is complete.

## API Endpoints :link:

- `/api/text/upload` - POST endpoint for PDF upload and text extraction.
- `/api/process/text/income` - POST endpoint for processing text for income analysis via OpenAI Api.
- `/api/process/text/balance` - POST endpoint for processing text for balance analysis via OpenAI Api.

## Authors :pen:

- Siddharth Prothia


