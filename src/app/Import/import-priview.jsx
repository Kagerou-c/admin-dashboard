'use client'

import { motion } from "framer-motion"
import {
    Upload,
    Trash2,
    CheckCircle2,
    AlertCircle,
    Info,
    FileSpreadsheet,
} from 'lucide-react'
function ImportPanel({ fileInputRef, isDragging, onDragOver, onDragLeave, onDrop }) {
    return (
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
                onChange={(e) => onDrop(null, e.target.files[0])}
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
    )
}

function PreviewPanel({ file, headers, previewData, uploadStatus, errorMessage, removeFile, UploadFile }) {
    return (
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
                <button onClick={removeFile} className="btn-delete" title="Hapus file">
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
                        onClick={UploadFile}
                    >
                        <Upload size={18} />
                        {uploadStatus === 'uploading' ? 'Memproses...' : 'Konfirmasi & Import'}
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export { ImportPanel, PreviewPanel }