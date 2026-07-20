# (In)finitudes — Portal Editorial

Portal do projeto cultural (In)finitudes, com foco em humanização em saúde e cuidados paliativos.

🔗 **[infinitudes.com.br](https://infinitudes.com.br)**

## Sobre o projeto

O (In)finitudes é um projeto cultural idealizado por Eleonora Santos, que reúne
livro, podcast, curadoria de conteúdo e uma comunidade em torno de temas como
finitude, saúde e espiritualidade — com relatos reais de pacientes em
tratamento oncológico. Contribuí no desenvolvimento técnico do portal que
reúne o livro, o podcast "Divã Infinito" e os demais conteúdos do projeto.

## Tech stack

- **[Astro](https://astro.build/)** — framework de conteúdo, geração estática
- **TypeScript**
- Deploy via Vercel, domínio próprio configurado com Hostinger

## Estrutura do projeto

​```
infinitudes-portal/
├── src/                  # Páginas e componentes Astro
├── public/               # Assets estáticos
├── DEPLOY.md             # Guia de deploy
└── DNS-HOSTINGER.md      # Configuração de domínio próprio
​```

## Rodando localmente

​```bash
npm install
npm run dev
​```

Acesse `http://localhost:4321`.

## Deploy

Ver [DEPLOY.md](./DEPLOY.md) e [DNS-HOSTINGER.md](./DNS-HOSTINGER.md) para o passo a passo completo.
