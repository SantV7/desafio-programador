import Form from "./pages/Form/Form";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Transcrição de Documentos</h1>
        <p className={styles.subtitle}>
          Faça o upload do seu Cartão de Ponto ou Holerite em PDF para iniciar o processamento.
        </p>
      </header>

      <main className={styles.main}>
        <Form />
      </main>
    </div>
  );
}

export default App;