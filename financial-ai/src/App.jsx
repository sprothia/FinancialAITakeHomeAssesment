import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import FinancialDataDisplay from './FinancialDataDisplay';
import Spinner from './Spinner';
import Sidebar from './Sidebar';
import TopBar from './Topbar';


const App = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [financialtext, setFinancialText] = useState('');
  const [statementType, setStatementType] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleStatementChange = (event) => {
    setStatementType(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const api = axios.create({
    baseURL: 'http://localhost:5174/'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file);

    setIsLoading(true)

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
    } finally {
      setIsLoading(false);
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
      console.log(`Financial metric data ${response.data.text}`)
    } catch (error) {
        console.error('Error:', error);
    }
  }

  return (
    <div>
      <Sidebar />

      <fieldset className="upload-fieldset">
          <legend className='title-finance-doc'>Upload Financial Document</legend>
          <label  className='title-finance-doc' htmlFor="file-upload">Upload PDF:</label>
          <input className='title-finance-doc' id="file-upload" type="file" accept=".pdf" onChange={handleFileChange} />

          <label className='title-finance-doc' htmlFor="statement-picker">Statement Type:</label>
          <select id="statement-picker" value={statementType} onChange={handleStatementChange}>
            <option value="">Select...</option>
            <option value="income-statement">Income Statement</option>
            <option value="balance-sheet">Balance Sheet</option>
          </select>

          <button onClick={handleSubmit}>Analyze</button>
        </fieldset>
 
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