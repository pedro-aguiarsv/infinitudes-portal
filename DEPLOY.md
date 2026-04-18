# Deploy · InFinitudes Portal

Site estático gerado pelo Astro + conteúdo puxado do Sanity.
Recomendado: **Netlify** (tier grátis generoso e integra bem com webhooks do Sanity).

---

## Passo 1 · Subir o código para o GitHub

```bash
cd infinitudes-portal
git init
git add .
git commit -m "Portal InFinitudes: estrutura editorial inicial"
gh repo create infinitudes-portal --private --source=. --remote=origin --push
```

Se não usar a CLI `gh`, crie o repo manualmente em github.com e depois:

```bash
git remote add origin git@github.com:SEU_USUARIO/infinitudes-portal.git
git branch -M main
git push -u origin main
```

---

## Passo 2 · Conectar o Netlify ao repositório

1. Acesse https://app.netlify.com e clique em **Add new site → Import an existing project**.
2. Escolha **GitHub** e autorize o repositório `infinitudes-portal`.
3. As configurações de build já vêm do `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node 22
4. Antes de finalizar, clique em **Show advanced → New variable** e adicione as 3 env vars:

   | Key | Value |
   | --- | --- |
   | `PUBLIC_SANITY_PROJECT_ID` | `h4mda5gt` |
   | `PUBLIC_SANITY_DATASET` | `production` |
   | `PUBLIC_SANITY_API_VERSION` | `2024-01-01` |

5. Clique em **Deploy site**. Em ~2 minutos ele está no ar numa URL tipo `random-name.netlify.app`.

6. **Domínio próprio** (opcional): Netlify → Domain settings → Add custom domain → siga o assistente de DNS.

---

## Passo 3 · Rebuild automático quando um post for publicado

Como o site é **estático**, ele precisa ser re-gerado toda vez que você publica no Sanity. Isso é feito com um webhook:

### 3.1 · Criar o build hook no Netlify

1. Netlify → **Site settings → Build & deploy → Build hooks**.
2. **Add build hook** → nome: `sanity-publish`, branch: `main`.
3. Copie a URL gerada (tipo `https://api.netlify.com/build_hooks/abc123`).

### 3.2 · Apontar o webhook no Sanity

1. Acesse https://www.sanity.io/manage/project/h4mda5gt/api/webhooks
2. **Create webhook**:
   - Name: `Netlify Deploy`
   - URL: cole o URL do build hook
   - Dataset: `production`
   - Trigger on: **Create, Update, Delete**
   - Filter: `_type == "post"` (só dispara em mudanças de posts)
   - HTTP method: `POST`
3. Salve.

Agora toda vez que você publicar/alterar/deletar um post no Studio, o Netlify rebuilda o site automaticamente. O processo leva ~1 minuto.

---

## Passo 4 · Verificar que está tudo no ar

- Home com hero + grid de 3 colunas (quando houver ao menos 4 posts).
- Páginas `/outras-historias`, `/hub-infinito`, `/diva-infinito`, `/curadoria`, `/lojinha`, `/sobre`, `/recomenda`.
- Posts em URLs editoriais: `/hub-infinito/titulo-do-post`.

---

## Alternativas ao Netlify

**Vercel** · mesma lógica. Crie um `vercel.json` opcional:

```json
{
  "framework": "astro",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

**Cloudflare Pages** · build command idem, output `dist`. Vars no painel.

---

## Troubleshooting

| Sintoma | Causa provável | Solução |
| --- | --- | --- |
| Build quebra com `projectId is required` | Env vars não foram setadas no Netlify | Revise o passo 2.4 |
| Home vazia apesar de haver posts | Post sem `slug.current` ou `category` | Abra o Studio e corrija |
| Imagens 404 | Projeto CDN do Sanity não ativo | Ative em sanity.io/manage → API → CDN |
| Post publicado mas site não atualiza | Webhook não configurado ou falhou | Veja o log em Sanity → Webhooks → Last runs |
