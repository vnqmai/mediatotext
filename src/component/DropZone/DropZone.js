import React from 'react'
import Dropzone from 'react-dropzone'
import plusIcon from '../../assets/plus.svg'
import './DropZone.css'

const DropZone = (props) => {
  const {
    updateFile
  } = props

  const onDrop = (acceptedFiles) => {
    const acceptedFile = acceptedFiles[0]
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result
      updateFile(binaryStr)
    }
    reader.readAsDataURL(acceptedFile)
  }

  return (
    <Dropzone
      onDrop={onDrop}
    >
      {({ getRootProps, getInputProps }) => (
        <div 
          className="DropZone"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <img 
            className="icon-plus"
            src={plusIcon}
          />
          <p>Drag media file here, or click to select files</p>
        </div> 
      )}
    </Dropzone>
  )
}

export default DropZone