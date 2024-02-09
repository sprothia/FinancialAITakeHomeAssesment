const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const pdf = require("pdf-parse");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const openAIFunction = require('./openai.js')
const openAIFunctionTwo = require('./openaiTwo.js')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let storedText = '';
// "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"})

// const mongoDBURL = "mongodb+srv://sprothia935:bifurc8@financialdataanalyzer.3e8j5jq.mongodb.net/financial-collection?retryWrites=true&w=majority";

// mongoose.connect(mongoDBURL, {useNewUrlParser: true}).then(() => {
//     console.log('Connected to Database')
// }).catch((error) => {
//     console.log(`Issue connecting to MongoDB ${error}`)
// });

// EXTRACT TEXT FROM PDF
app.post('/api/text/upload', upload.single('pdf'), async (req, res) => {
    try {
      const pdfBuffer = req.file.buffer;
      const dataBuffer = new Uint8Array(pdfBuffer);
      const pdfData = new Buffer.from(dataBuffer);
  
      const pdfText = await extractTextFromPDF(pdfData);
      
      res.send({text: pdfText})
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred during text extraction.' });
    }
});

// RECIEVE EXTRACTED TEXT
app.post('/api/extract/text/recieve', async (req, res) => {
  try {

    const sendText = req.body.text
    storedText = sendText;

    res.send({ myText: sendText })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred recieving extracted text.' });
  }
})

// SEND EXTRACTED TEXT TO OPENAI
app.post('/api/process/text/income', async (req, res) => {
  const inputText = req.body.text;
  try {
      const responseText = await openAIFunction(inputText);
      res.json({ text: responseText });
  } catch (error) {
      res.status(500).send('Error processing text');
  }
});

app.post('/upload', upload.single('file'), async (req, res) => {
  const fileData = {
      filename: req.file.filename,
      originalName: req.file.originalname,
  };
  const file = new File(fileData);
  await file.save();
  res.status(201).send('File uploaded successfully');
});

app.post('/api/process/text/balance', async (req, res) => {
  const inputTextTwo = req.body.text;
  try {
      const responseTextTwo = await openAIFunctionTwo(inputTextTwo);
      res.json({ text: responseTextTwo });
  } catch (error) {
      res.status(500).send('Error processing text');
  }
});

app.get('/api/extract/text/get', async (req, res) => {

  try {
    if (storedText) {
      console.log('Stored text has test')
      res.send({ text: storedText });
    } else {
      res.send({ message: 'No text stored' });
    }
  } catch (error) {
    console.log(error)
  }

});
  
const extractTextFromPDF = (pdfBuffer) => {
    return new Promise((resolve, reject) => {
      pdf(pdfBuffer).then(function(data) {
        resolve(data.text);
      }).catch(function(error) {
        reject(error);
      });
    });
};

app.get('/api/text/upload', (req, res) => {
    res.send({ text: 'EXTRACTED TEXT' });
});

app.get("/", async (request, response) => {
    response.send("Success!")
});

app.listen(5174, () => {
    console.log("App Listening on PORT: 5174")
});
