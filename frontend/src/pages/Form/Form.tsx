import React, { useState } from 'react';
import styles from './Form.module.css';

const Form = () => {
  const [documentType, setDocumentType] = useState<'cartao-ponto' | 'holerite'>('cartao-ponto');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Selecione um arquivo PDF antes de enviar.');
      return;
    }

    const formData = new FormData();
    formData.append('type', documentType);
    formData.append('file', file);

    console.log('Enviando dados:', { documentType, fileName: file.name });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="documentType">
          Tipo de Documento:
        </label>
        <select
          id="documentType"
          className={styles.select}
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value as 'cartao-ponto' | 'holerite')}
        >
          <option value="cartao-ponto">Cartão de Ponto</option>
          <option value="holerite">Holerite</option>
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <span className={styles.label}>Arquivo PDF:</span>
        <input
          id="fileInput"
          type="file"
          accept=".pdf,application/pdf"
          className={styles.hiddenInput}
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput" className={styles.fileButton}>
          {file ? file.name : 'Selecionar arquivo PDF'}
        </label>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <button type="submit" className={styles.submitButton}>
        Enviar Documento
      </button>
    </form>
  );
};

export default Form;