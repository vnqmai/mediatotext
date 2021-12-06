import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { recognizeImage } from '../../tesseract/tesseract'
import DropZone from '../DropZone/DropZone'
import './RecognizePage.css'

const RecognizePage = (props) => {
  const [ file, setFile ] = useState(null)
  const [ recognizing, setRecognizing ] = useState(false)
  const [ progress, setProgress ] = useState(null)
  const [ textResult, setTextResult ] = useState('')
  const [ language, setLanguage ] = useState('eng')

  useEffect(() => {
    if (recognizing) {
      recognizeImage(file, language, setProgress, recognizedTextFromImage)
    }
  }, [recognizing])

  const removeFile = () => {
    setFile(null)
  }

  const onRecognizeClick = () => {
    setRecognizing(true)
  }

  const recognizedTextFromImage = (text) => {
    setTextResult(text)
    setRecognizing(false)
    setProgress(null)
    // setFile(null)
  }

  const clearTextResult = () => {
    setTextResult('')
  }

  const onSelectLanguage = (e) => {
    setLanguage(e.target.value)
  }

  return (
    <Container className="RecognizePage">
      <Row>
        <Col md={6}>
          <div className="left-wrapper">
            <div 
              className={`icon-close ${!file && 'hidden' || ''}`}
              onClick={removeFile}
            >
              x
            </div>
            {
              !file &&
              <DropZone
                updateFile={setFile}  
              /> ||
              <img 
                className="file-preview"
                src={file}
              />
            }
          </div>
          <div className="controller-block">
            <div className="controller">
              <select onChange={onSelectLanguage}>
                <option value="eng">English</option>
                <option value="vie">Viet Nam</option>
              </select>
              <button 
                onClick={onRecognizeClick}
                disabled={!file}
              >
                Start Processing
              </button>
              <button 
                onClick={clearTextResult}
                disabled={!file}
              >
                Clear Text Result
              </button>
            </div>
          </div>
        </Col>
        <Col md={6} style={{position: 'relative'}}>
          <textarea
            value={textResult}
          />
          {
            !!progress &&
            <div className="status">
              <div>
                {progress.status}
              </div>
              <div className="progress-bar">
                <div className="percent" style={{width: progress.progress*100 + '%'}}></div>
              </div>
            </div>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default RecognizePage