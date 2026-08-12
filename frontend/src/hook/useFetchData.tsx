import { useState } from 'react';

export interface TranscricaoResponse {
  id: string;
  tipo: 'cartao-ponto' | 'holerite';
  status: 'processando' | 'concluido' | 'erro';
  erro: string | null;
  value: any | null;
}

export const useFetchData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

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
    } catch (err: any) {
      setError(err.message || 'Erro inesperado durante o upload.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadDocument,
    loading,
    error,
    setError,
  };
};

export default useFetchData;