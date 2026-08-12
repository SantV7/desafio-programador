import React, { useState } from 'react';
import styles from './Form.module.css';
import { FileQuestionMark, Paperclip, LayersArrowDown, Shell, ShieldX } from 'lucide-react';
import useFetchData from '../../hook/useFetchData';

interface FormProps {
  onUploadSuccess?: (id: string) => void;
}

const Form: React.FC<FormProps> = ({ onUploadSuccess }) => {
  const [documentType, setDocumentType] = useState<'cartao-ponto' | 'holerite'>('cartao-ponto');
  const [file, setFile] = useState<File | null>(null);

  const { uploadDocument, loading, error, setError } = useFetchData();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError('');

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.type !== 'application/pdf') {
      setError('Por favor, selecione apenas arquivos no formato PDF.');
      setFile(null);
      e.target.value = '';
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Selecione um arquivo PDF antes de enviar.');
      return;
    }

    const id = await uploadDocument(documentType, file);
    if (id && onUploadSuccess) {
      onUploadSuccess(id);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="documentType">
          Tipo de Documento <FileQuestionMark style={{ marginBottom: '-2px' }} size={18} />
        </label>
        <select
          id="documentType"
          className={styles.select}
          value={documentType}
          disabled={loading}
          onChange={(e) => setDocumentType(e.target.value as 'cartao-ponto' | 'holerite')}
        >
          <option value="cartao-ponto">Cartão de Ponto</option>
          <option value="holerite">Holerite</option>
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <span className={styles.label}>
          Arquivo PDF <Paperclip style={{ marginBottom: '-2px' }} size={18} />
        </span>
        <input
          id="fileInput"
          type="file"
          accept=".pdf,application/pdf"
          disabled={loading}
          className={styles.hiddenInput}
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput" className={styles.fileButton}>
          {file ? file.name : 'Selecionar arquivo PDF'}
        </label>
      </div>

      {error && (
        <p className={styles.errorMessage}>
          {error} <ShieldX style={{ marginBottom: '-5px' }} />
        </p>
      )}

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? (
          <>
            Enviando... <Shell className={styles.spinner} style={{ marginBottom: '-4px' }} size={18} />
          </>
        ) : (
          <>
            Enviar Documento <LayersArrowDown style={{ marginBottom: '-6px' }} size={18} />
          </>
        )}
      </button>
    </form>
  );
};

export default Form;