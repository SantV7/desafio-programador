import { useState, useRef, useCallback } from 'react';

export interface TranscricaoResponse {
  id: string;
  tipo: 'cartao-ponto' | 'holerite';
  status: 'processando' | 'concluido' | 'erro';
  erro: string | null;
  value: unknown;
}

export const useFetchData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [statusData, setStatusData] = useState<TranscricaoResponse | null>(null);

  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

  const uploadDocument = async (
    tipo: 'cartao-ponto' | 'holerite',
    arquivo: File
  ): Promise<string | null> => {
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('tipo', tipo);
    formData.append('arquivo', arquivo);

    try {
      const response = await fetch('/api/transcricoes', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar o arquivo. Tente novamente.');
      }

      const data = await response.json();
      return data.id;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro inesperado durante o upload.');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const startPolling = useCallback(
    (id: string, onComplete?: (data: TranscricaoResponse) => void) => {
      stopPolling();

      pollIntervalRef.current = setInterval(async () => {
        try {
          const response = await fetch(`/api/transcricoes/${id}`);
          if (!response.ok) {
            throw new Error('Erro ao verificar status do processamento.');
          }

          const data: TranscricaoResponse = await response.json();
          setStatusData(data);

          if (data.status === 'concluido' || data.status === 'erro') {
            stopPolling();
            if (onComplete) onComplete(data);
          }
        } catch (err: unknown) {
          stopPolling();
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Erro na comunicação com o servidor.');
          }
        }
      }, 2000);
    },
    [stopPolling]
  );

  return {
    uploadDocument,
    startPolling,
    stopPolling,
    statusData,
    loading,
    error,
    setError,
  };
};

export default useFetchData;