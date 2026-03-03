"use client"

import React, { useState, useRef } from 'react'
import {
    Upload,
    Trash2,
    CheckCircle2,
    AlertCircle,
    Info,
    FileSpreadsheet,
} from 'lucide-react'
import card from '../components/card'
import { motion } from 'framer-motion'
import { ParseData } from '../process/parse-data'
import { CleaningData } from '../process/cleaning-data'
import { Validation } from '../process/validation'
import { uploadData } from '../server/upload-data-server'
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
    const { Card, CardContent, CardHeder } = card



    const onDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const onDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const onDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile && droppedFile.name.endsWith('.csv')) {
            setFile(droppedFile)
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
    }

    const handleFileChange = (file) => {
        if (file && file.name.endsWith('.csv')) {
            setFile(file)
            ParseData(file, (result) => {
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
    }

    const handleRemoveFile = () => {
        setFile(null)
        setPreviewData([])
        setHeaders([])
        setData([])
        setSummary([])
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

                {/* Atas: Judul & Sample */}
                <header className="import-header">
                    <div>
                        <h1>Import Data</h1>
                        <p>Upload file CSV untuk memperbarui data sistem</p>
                    </div>
                </header>

                
                    <div className="validation-summary-grid">
                        <Card className="summary-stat valid">
                            <CardContent>
                                <div className="stat-flex">
                                    <div className="icon-box">
                                        <CheckCircle2 size={20} color="#52ff86" />
                                    </div>
                                    <div>
                                        <h4>Data Valid</h4>
                                        <span>{summary? summary.valid : 0} Baris</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="summary-stat invalid">
                            <CardContent>
                                <div className="stat-flex">
                                    <div className="icon-box">
                                    <AlertCircle size={20} color="#ef4444" />
                                    </div>
                                    <div>
                                        <h4>Data Invalid</h4>
                                        <span>{summary? summary.invalid : 0} Baris</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                            <Card className="summary-stat indices">
                                <CardContent>
                                    <div className="stat-flex">
                                        <div className="icon-box">
                                        <Info size={20} color="#3b82f6" />
                                        </div>
                                        <div>
                                            <h4>Baris Bermasalah</h4>
                                            <p className="indices-list">
                                                Baris: {summary&& summary.invalidIndices.join(', ')}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                    </div>
                

                <div className="import-grid">
                    <main className="import-main">
                        {!file ? (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`upload-zone ${isDragging ? 'dragging' : ''}`}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={(e) => handleFileChange(e.target.files[0])}
                                    className="hidden"
                                    accept=".csv"
                                    style={{ display: 'none' }}
                                />

                                <div className="upload-content">
                                    <div className="icon-box">
                                        <Upload size={40} />
                                    </div>
                                    <h3>Pilih atau Drop file ke sini</h3>
                                    <p>Hanya menerima format file .csv</p>
                                    <div className="upload-info">
                                        <Info size={14} />
                                        Maksimal Ukuran File 10MB
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="preview-card"
                            >
                                <div className="file-header">
                                    <div className="file-info">
                                        <div className="file-icon">
                                            <FileSpreadsheet size={24} />
                                        </div>
                                        <div className="file-details">
                                            <h4>{file.name}</h4>
                                            <p>{(file.size / 1024).toFixed(1)} KB • CSV ready to process</p>
                                        </div>
                                    </div>
                                    <button onClick={handleRemoveFile} className="btn-delete" title="Hapus file">
                                        <Trash2 size={20} />
                                    </button>
                                </div>

                                <div className="preview-content">
                                    <div className="preview-table-container">
                                        <table className="preview-table">
                                            <thead>
                                                <tr>
                                                    {headers.map((header, index) => (
                                                        <th key={index}>{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {previewData.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        <td>{row?.tanggal?.toString() || ''}</td>
                                                        <td>{row?.nama?.toString() || ''}</td>
                                                        <td>{row?.kelas?.toString() || ''}</td>
                                                        <td>{row?.keperluan?.toString() || ''}</td>
                                                        <td>{row?.nominal?.toString() || ''}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="action-footer">
                                        {uploadStatus === 'error' && (
                                            <div className="status-message error">
                                                <AlertCircle size={16} />
                                                <span>{errorMessage}</span>
                                            </div>
                                        )}
                                        {uploadStatus === 'success' && (
                                            <div className="status-message success">
                                                <CheckCircle2 size={16} />
                                                <span>Data berhasil diimpor!</span>
                                            </div>
                                        )}

                                        <button
                                            disabled={uploadStatus === 'uploading'}
                                            className={`btn-import ${uploadStatus === 'uploading' ? 'loading' : ''}`}
                                            onClick={handleUpload}
                                        >
                                            <Upload size={18} />
                                            {uploadStatus === 'uploading' ? 'Memproses...' : 'Konfirmasi & Import'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div className="panduan-import">
                            {[
                                { id: 1, titel: 'Siapkan file CSV', desc: 'Pastikan file yang diimpor berformat .CSV.' },
                                { id: 2, titel: 'Masukkan file CSV', desc: 'Klik "Pilih File" dan pilih file CSV yang ingin diimpor.' },
                                { id: 3, titel: 'Preview Data', desc: 'Pastikan data yang diimpor sudah benar dan sesuai dengan format yang telah ditentukan.' },
                                { id: 4, titel: 'Import Data', desc: 'Klik "Import" dan tunggu hingga proses selesai.' },
                            ].map((item) => (
                                <Card key={item.id} className="panduan-import-item">
                                    <CardHeder Name="panduan-import-item-header" Title={`${item.id}. ${item.titel}`} />
                                    <CardContent Name="panduan-import-item-desc">
                                        <p>{item.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}