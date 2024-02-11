import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FinancialDataDisplay from './FinancialDataDisplay';
import Spinner from './Spinner';
import Sidebar from './Sidebar';
import { storage } from './firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const App = () => {
  const [file, setFile] = useState(null);
  const[fileList, setFileList] = useState([]);
  const [text, setText] = useState('');
  const [financialtext, setFinancialText] = useState('');
  const [statementType, setStatementType] = useState('');
  const [isLoading, setIsLoading] = useState();
  const [showUploadBar, setUploadBar] = useState(true);

  const fileListRef = ref(storage, "files/");


  const handleStatementChange = (event) => {
    setStatementType(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const api = axios.create({
    baseURL: 'http://localhost:5174/'
  });


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file);

    setIsLoading(true)
    setUploadBar(false)

    const fileRef = ref(storage, `files/${file.name + v4()}`) 
    uploadBytes(fileRef, file).then(() => {
      alert("File uploaded to database")
      console.log("File uploaded to database")
    });

    try {
      const response = await axios.post('http://localhost:5174/api/text/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setText(response.data.text);
      const extractedText = response.data.text;
      sendExtractedText(extractedText)
      getFinancialMetricText(extractedText)
      
    } catch (error) {
      console.error(error);
    }

  };  

  const sendExtractedText = async (text) => {
    try {
      const responseTwo = await axios.post('http://localhost:5174/api/extract/text/recieve', {text})
      console.log(`Response ${responseTwo.data.myText}`)
    } catch (error) {
      console.error(error);
    }
  }

  const fetchFiles = () => {
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFileList((prev) => [...prev, url]);
        });
      });
    });
  };

  const getFinancialMetricText = async (financialText) => {
    try {
      let axiosLink = '';
      console.log(statementType)
      if(statementType === 'income-statement') {
        axiosLink = 'http://localhost:5174/api/process/text/income'
        console.log('File is Income Statement')
      } else if(statementType === 'balance-sheet') {
        axiosLink = 'http://localhost:5174/api/process/text/balance'
        console.log('File is Balance Sheet')
      }
      const response = await axios.post(axiosLink, { text: financialText });
      setFinancialText(response.data.text);
      setIsLoading(false)
      console.log(`Financial metric data ${response.data.text}`)
    } catch (error) {
        console.error('Errorr:', error);
    }
  }

  return (
    <div>
        <Sidebar />

          <div> { showUploadBar ? (
                      
              <fieldset className="upload-fieldset">
                  <legend className='title-finance-doc'>Upload Financial Document</legend>
                  <label className='label-finance-doc' htmlFor="file-upload">Upload PDF:</label>
                  <input className='input-finance-doc' id="file-upload" type="file" accept=".pdf" onChange={handleFileChange} />

                  <label className='label-finance-doc' htmlFor="statement-picker">Statement Type:</label>
                  <select className='select-finance-doc' id="statement-picker" value={statementType} onChange={handleStatementChange}>
                    <option value="">Select...</option>
                    <option value="income-statement">Income Statement</option>
                    <option value="balance-sheet">Balance Sheet</option>
                  </select>

                  <button className='btn-finance-doc' onClick={handleSubmit}>Analyze</button>
            </fieldset>

              ) : (
                null
              )}
          </div>

 
      <div className="main-container">
        <div className="financial-info">
          {isLoading ? (
            <Spinner />
          ) : (
            financialtext && <FinancialDataDisplay financialDataJSON={financialtext} typeOfStatement={statementType} />
          )}
        </div>

      </div>

    </div>
  );
}

export default App;