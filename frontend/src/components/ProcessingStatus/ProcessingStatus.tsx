import React from 'react';
import { Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import styles from './ProcessingStatus.module.css';

interface ProcessingStatusProps {
  status: 'processando' | 'concluido' | 'erro';
  erroMsg?: string | null;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ status, erroMsg }) => {
  return (
    <div className={styles.container}>
      {status === 'processando' && (
        <div className={styles.statusBox}>
          <Loader2 className={styles.spinner} size={32} />
          <p className={styles.text}>Processando documento... Por favor, aguarde.</p>
        </div>
      )}

      {status === 'concluido' && (
        <div className={`${styles.statusBox} ${styles.success}`}>
          <CheckCircle2 size={32} />
          <p className={styles.text}>Documento processado com sucesso!</p>
        </div>
      )}

      {status === 'erro' && (
        <div className={`${styles.statusBox} ${styles.error}`}>
          <AlertTriangle size={32} />
          <p className={styles.text}>{erroMsg || 'Ocorreu um erro no processamento do documento.'}</p>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatus;