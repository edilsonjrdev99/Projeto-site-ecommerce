# Site Store

Projeto Vue 3 com TypeScript seguindo as melhores práticas de desenvolvimento.

## Tecnologias

- **Vue 3** - Framework JavaScript progressivo
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server extremamente rápido
- **Vue Router** - Roteamento oficial do Vue
- **Zod** - Validação de schemas TypeScript-first

## Estrutura do Projeto

```
src/
├── assets/          # Arquivos estáticos (imagens, fontes, etc)
├── components/      # Componentes reutilizáveis
├── composables/     # Composables do Vue
│   ├── api/        # Composables para chamadas de API
│   └── action/     # Composables com lógica de negócio
├── config/          # Configurações da aplicação
├── lib/             # Bibliotecas e utilitários
├── router/          # Configuração de rotas
├── types/           # Definições de tipos TypeScript
├── views/           # Componentes de página/view
├── App.vue          # Componente raiz
├── main.ts          # Ponto de entrada da aplicação
└── style.css        # Estilos globais
```

## Convenções de Código

### Composables

- **api/**: Composables que fazem chamadas HTTP para o backend
- **action/**: Composables com lógica de negócio e gerenciamento de estado

### Tipos

Todos os tipos são definidos usando Zod para validação em runtime e TypeScript para type-safety.

### Autenticação

A autenticação é feita via cookies HTTP-only que são setados pelo backend. O cliente apenas faz as requisições e o cookie é enviado automaticamente.

## Configuração

1. Clone o repositório
2. Copie `.env.example` para `.env` e configure as variáveis de ambiente
3. Instale as dependências:

```bash
npm install
```

4. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento na porta 3000
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run type-check` - Verifica erros de TypeScript

## Variáveis de Ambiente

- `VITE_API_BASE_URL` - URL base da API backend
- `VITE_API_TIMEOUT` - Timeout das requisições HTTP em ms
- `VITE_APP_NAME` - Nome da aplicação

## Boas Práticas

- Use Composition API com `<script setup>`
- Sempre defina tipos para props e emits
- Valide dados com Zod antes de enviar para API
- Separe lógica de negócio em composables action/
- Separe chamadas de API em composables api/
- Use path aliases (@/) para imports
- Mantenha componentes pequenos e focados
