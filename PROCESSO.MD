# PROCESSO.MD — Uso de Inteligência Artificial e Tomada de Decisão

## 1. Planejamento Geral e Organização do Projeto (Gemini IA)

- **Análise do Requisito:** Solicitei à IA a leitura integral da documentação do desafio técnico (`INSTRUCOES.md` e `README.md`) com o objetivo de planejar a arquitetura e a melhor estratégia de execução contínua. O foco principal estabelecido foi otimizar o tempo de entrega mantendo padrão de qualidade de software, separação clara de escopo e sem perder os prazos.
- **Divisão de Arquitetura:** Definimos juntos a estrutura do repositório unificado, isolando as pastas de `frontend` e `backend`, além da padronização dos arquivos globais de configuração (como `.gitignore` unificado e boas práticas de *Conventional Commits*).

## 2. Construção Colaborativa do Formulário de Upload

- **Desenvolvimento do Componente:** Construímos de forma colaborativa o componente de formulário (`Form.tsx`) e sua estilização isolada e responsiva via CSS Modules (`Form.module.css`).
- **Validação de Lógica e Tratamento de Erros:** Validamos em conjunto as regras de upload do frontend, implementando restrições do input HTML e checagens via TypeScript para aceitar exclusivamente arquivos no formato PDF (`application/pdf`).
- **Prevenção de Dados e Tratamento de Exceções:** Inserimos feedbacks visuais de erro caso o usuário tente submeter arquivos inválidos ou vazios, garantindo que o estado da aplicação limpe o input para prevenir o envio involuntário de dados inconsistentes antes de prosseguir para o backend.


- **Interface e Ícones:** Adição da biblioteca `lucide-react` para iconografia visual e responsiva no front-end.