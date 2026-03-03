"use client"

import React, { useState, useRef } from 'react'

import { ParseData } from '../process/parse-data'
import { CleaningData } from '../process/cleaning-data'
import { Validation } from '../process/validation'
import { uploadData } from '../server/upload-data-server'
import PanduanImport from './panduan-import'
import Summary from './summary'
import { ImportPanel, PreviewPanel } from './import-priview'
import './Import.css'

export default function Import() {
    const [file, setFile] = useState(null)
    const [data, setData] = useState([])
    const [previewData, setPreviewData] = useState([])
    const [headers, setHeaders] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const [uploadStatus, setUploadStatus] = useState('idle') // 'idle' | 'uploading' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('')
    const [summary, setSummary] = useState(null)
    const fileInputRef = useRef(null)



    const onDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const onDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const onDrop = (e, file) => {
        e && e.preventDefault()
        e && setIsDragging(false)
        const droppedFile = e ? e.dataTransfer.files[0] : file

        if (droppedFile && droppedFile.name.endsWith('.csv')) {
            setFile(droppedFile)
        }
        else {
            return
        }
        ParseData(droppedFile, (result) => {
            if (result.data && result.data.length > 0) {

                const cleaningData = CleaningData(result.data)

                const validationData = Validation(cleaningData)

                setSummary(validationData)
                setData(cleaningData)
                setHeaders(Object.keys(result.data[0])) // Ambil key sebagai header
                setPreviewData(result.data) // Data sudah berupa array of objects
            }
        })

    }

    const handleRemoveFile = () => {
        setFile(null)
        setPreviewData([])
        setHeaders([])
        setData([])
        setSummary(null)
    }

    const handleUpload = async () => {
        if (!data || data.length === 0) return

        setUploadStatus('uploading')
        setErrorMessage('')

        try {

            const result = await uploadData(data)

            if (result.success) {
                setUploadStatus('success')

            } else {
                setUploadStatus('error')
                setErrorMessage(result.error || 'Terjadi kesalahan saat mengunggah data.')
            }
        } catch (error) {
            setUploadStatus('error')
            setErrorMessage('Gagal menghubungi server.')

        }
    }


    return (
        <div className="import-page">
            <div className="import-container">

                <header className="import-header">
                    <div>
                        <h1>Import Data</h1>
                        <p>Upload file CSV untuk memperbarui data sistem</p>
                    </div>
                </header>


                <Summary data={summary} />

                <div className="import-grid">
                    <main className="import-main">

                        {!file ? (
                            <ImportPanel
                                fileInputRef={fileInputRef}
                                isDragging={isDragging}
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                            />
                        ) : (

                            <PreviewPanel
                                file={file}
                                headers={headers}
                                previewData={previewData}
                                uploadStatus={uploadStatus}
                                errorMessage={errorMessage}
                                removeFile={handleRemoveFile}
                                handlerUpload={handleUpload}
                            />
                        )}
                        <PanduanImport />
                    </main>
                </div>
            </div>
        </div>
    )
}