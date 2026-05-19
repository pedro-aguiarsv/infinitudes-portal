# (In)finitudes · Lista de pendências para a autora

**Para:** Eleonora Cruz Santos
**Assunto:** Materiais e decisões necessárias para o lançamento de **infinitudes.com.br**
**Data:** Maio de 2026

---

## Como ler esta lista

Os itens estão organizados por bloco (A → E) e dentro de cada bloco por **prioridade**:

| Tag | Significado |
|---|---|
| 🔴 **Bloqueante** | Sem isso, o site não pode ir ao ar |
| 🟡 **Importante** | Faz parte do escopo combinado, mas pode entrar no go-live com placeholder visual |
| 🟢 **Desejável** | Melhora o site, pode ser entregue após o go-live |

Sempre que aparecer **(MIN: X)** é a quantidade mínima para o site não parecer vazio.

---

# A · DECISÕES E INFORMAÇÕES (não exige entrega de arquivos)

### A.1 · Dados pessoais e legais 🔴

Para constarem na **Política de Privacidade**, nos **Termos de Uso** e na configuração do gateway de pagamento:

- [ ] **Nome completo** (jurídico): _________________________________________
- [ ] **CPF ou CNPJ** (definir se vai operar como PF ou PJ na loja): _________________________________________
- [ ] **Endereço completo** (somente se for usar como sede operacional): _________________________________________
- [ ] **Cidade do foro** para os Termos · sugerimos a cidade de residência: _________________________________________
- [ ] **E-mail oficial de contato** que aparecerá no site: _________________________________________
  > Sugestão: criar `contato@infinitudes.com.br` na própria Hostinger

### A.2 · Redes sociais oficiais 🟡

Links definitivos (se ainda não existem, criar antes do go-live):

- [ ] **Instagram:** _________________________________________
- [ ] **LinkedIn:** _________________________________________
- [ ] **Spotify** (do canal Divã Infinito): _________________________________________
- [ ] **YouTube** (do canal Divã Infinito): _________________________________________

### A.3 · Domínio infinitudes.com.br 🔴

A página que aparece hoje em `infinitudes.com.br` é uma placeholder gerada pela Hostinger (já confirmado). Para a migração:

- [ ] **Confirmar acesso ao painel da Hostinger** (login + senha em mãos)
- [ ] **Confirmar se há e-mails ativos** com endereços `@infinitudes.com.br` (qualquer caixa criada)
  > Se houver, precisamos preservar os registros MX antes da migração
- [ ] **Autorizar a desativação da página atual** (a placeholder de "Histórias de Vidas · Divã Infinito · Hub Finito · Sobre")

### A.4 · Plataformas externas (criar contas) 🔴

#### Newsletter — Brevo

> Recomendamos a Brevo (ex-Sendinblue) — gratuita até 9.000 e-mails/mês, sede europeia (LGPD/GDPR ok), interface em português.

- [ ] Criar conta em **[brevo.com](https://brevo.com)** com o e-mail oficial de contato
- [ ] Criar uma lista chamada **"InFinitudes · Newsletter"**
- [ ] Em **SMTP & API → API Keys** gerar uma chave nova (chamar de `infinitudes-site`)
- [ ] Enviar para o desenvolvedor:
  - **API Key** (começa com `xkeysib-…`)
  - **List ID** (número que aparece ao lado da lista criada)

#### Pagamentos — Mercado Pago

> Recomendamos o Mercado Pago (aceita CPF, sem mensalidade, Pix grátis, melhor taxa para tickets pequenos).

- [ ] Criar conta em **[mercadopago.com.br](https://mercadopago.com.br)**
- [ ] Validar a conta (envio de RG, comprovante de residência se exigido)
- [ ] Cadastrar uma conta bancária para receber as transferências
- [ ] Em **Seu negócio → Configurações → Credenciais**, copiar e enviar para o desenvolvedor:
  - **Public Key** (chave pública)
  - **Access Token** (chave privada — manter em segredo)
- [ ] Decidir política de antecipação de recebíveis:
  - [ ] **D+14 grátis** (recebe em 14 dias) ← recomendado para começar
  - [ ] D+0 com taxa adicional (~3% a mais)

### A.5 · Estratégia de conteúdo 🟡

- [ ] **Periodicidade da newsletter** (semanal? quinzenal?): _________________________________________
- [ ] **Dia/horário fixo** para envio: _________________________________________
- [ ] **Periodicidade dos episódios** do Divã Infinito: _________________________________________
- [ ] **Política de envio para a Curadoria** (texto que aparece quando alguém quer mandar uma história — escrita em prosa pela Eleonora)

---

# B · CONTEÚDO EDITORIAL (textos)

### B.1 · Posts (artigos) — **MIN: 13 posts** 🔴

> **Importante sobre a Loja:** a `/loja` **não é uma categoria de posts** — é uma página dedicada de **listagem de produtos** (ver bloco B.3). Os posts editoriais ficam apenas nas 3 categorias abaixo.

**Distribuição mínima por categoria editorial** para que nenhuma página de categoria fique vazia:

| Categoria | Mínimo | O que é |
|---|---|---|
| **Hub Infinito** | 4 posts | Conteúdo mais técnico sobre cuidados paliativos |
| **Curadoria** | 4 posts | Histórias enviadas por leitores e selecionadas pela redação |
| **Recomenda** | 5 itens | Sugestões de eventos, palestras, podcasts |

**Cada post precisa de:**
- [ ] Título (1 linha)
- [ ] Resumo / dek (1-2 frases)
- [ ] Corpo do texto (markdown ou Word, sem formatação especial)
- [ ] Linha de assinatura (ex.: "Por Eleonora Cruz Santos" ou "Por Marina Pires")
- [ ] **Imagem de capa** (ver bloco C.3)
- [ ] Categoria (uma das 3 acima)
- [ ] Layout: padrão **clássico** (centralizado) OU **capa** (banner bordô) — escolher por post
- [ ] Data prevista de publicação

> **Como entregar:** sugerimos uma planilha com uma linha por post + uma pasta de imagens. Ou o desenvolvedor pode criar usuários no Sanity Studio para a Eleonora cadastrar diretamente (recomendado a longo prazo).

### B.2 · Episódios do Divã Infinito — **MIN: 3 episódios** 🔴

**Cada episódio precisa de:**
- [ ] Número do episódio (1, 2, 3…)
- [ ] Título
- [ ] Descrição (até 4 linhas)
- [ ] **URL do vídeo** (YouTube **OU** Spotify — o site detecta automaticamente)
  > Ex.: `https://www.youtube.com/watch?v=ABC123` ou `https://open.spotify.com/episode/XYZ789`
- [ ] Convidados (linha livre, ex.: "com Dr. Ricardo Caponero")
- [ ] Duração (ex.: "42 min")
- [ ] **Thumbnail 16:9** (ver bloco C.4)
- [ ] Show notes (opcional · resumo + links + referências citadas)
- [ ] Data de publicação

### B.3 · Produtos da loja — **MIN: 3 produtos** 🔴

> Lembrando: a capa do livro já está no site.

**Para cada produto adicional, precisamos:**
- [ ] Título do produto
- [ ] Linha de assinatura (ex.: "edição limitada", "porcelana branca")
- [ ] **Preço final** (R$)
- [ ] **Preço em centavos** (ex.: R$ 65,00 = 6500) — para o gateway
- [ ] SKU / código interno (opcional)
- [ ] Descrição curta (1-2 frases para o card)
- [ ] Descrição longa (parágrafo completo para a página do produto)
- [ ] Dimensões / especificação (ex.: "14 × 21 cm · 192 páginas")
- [ ] Data de envio (ex.: "21 de maio de 2026")
- [ ] Em estoque? (sim/não)
- [ ] **Foto principal** + galeria opcional (ver bloco C.2)

**Sugestão de produtos para começar** (verificar se a Eleonora pretende ter):
- (In)finitudes (livro físico) ← **já estamos contemplando**
- Caderno editorial
- Caneca / tote bag (merchandising)
- Diário do Campo (vol. I) — se for ser produzido

### B.4 · Depoimentos sobre o livro — **MIN: 3 depoimentos** 🔴

Aparecem em 3 colunas na página `/livro`. Cada depoimento precisa de:

- [ ] **Quote** (até 4 linhas, sem aspas — o site adiciona automaticamente)
- [ ] **Autor(a)** do depoimento (nome próprio)
- [ ] **Cargo / contexto** (ex.: "Crítica · Folha de S.Paulo" ou "Médico paliativista · HCFMUSP")
- [ ] **Autorização escrita** da pessoa para usar a citação (e-mail ou WhatsApp basta)

> Esses depoimentos podem vir de leitores beta, paliativistas que leram trechos, jornalistas que escreveram sobre o projeto, ou figuras públicas que quiserem dar uma palavra.

### B.5 · PDF da amostra do livro — **1 PDF** 🟡

Aparece como botão **"Ler uma amostra"** logo abaixo da capa em `/livro` (estilo "Look inside" da Amazon). Ao clicar, abre um visualizador inline com o PDF.

- [ ] **Arquivo PDF** com as primeiras páginas do livro (sugestão: 10-20 páginas: capa interna, sumário, introdução e 2-3 ensaios completos)
- [ ] **Tamanho máximo:** ~10 MB (otimizar com Adobe ou Smallpdf antes de subir)
- [ ] **Sem proteção/senha** — precisa abrir em qualquer navegador
- [ ] Subir direto no Sanity Studio no campo "PDF da amostra do livro" dentro do documento "Livro · Página /livro"

> Enquanto o PDF não for entregue, o botão aparece desabilitado com texto **"Amostra em breve"**. Quando o PDF for cadastrado, ele se torna funcional automaticamente.

### B.6 · Sinopse oficial do livro 🔴

Aparece em `/livro` e em `/`. Pode ser editada quantas vezes quiser depois.

- [ ] **Sinopse** (1 a 3 parágrafos descrevendo o livro)
- [ ] **Detalhes técnicos** (aparecem ao clicar no link "Detalhes técnicos ▾" abaixo do frete na página `/livro`):

  | Rótulo | Valor |
  |---|---|
  | Páginas | _ex.: 192_ |
  | Formato | _ex.: 14 × 21 cm_ |
  | Lançamento | _ex.: 21 de maio de 2026_ |
  | ISBN (físico) | _ex.: 978-65-00000-00-0_ |
  | ISBN (e-book) | _ex.: 978-65-00000-00-1_ |
  | Idioma | Português (Brasil) |
  | _Outros opcionais_ | acabamento, tradução, ilustração, número da edição etc. |

  > Pode adicionar quantos itens quiser (limite de 10) no campo "Detalhes técnicos" do documento `Livro · Página /livro` no Sanity. Use o que fizer sentido — o painel só aparece se houver pelo menos 1 item cadastrado.

- [ ] **Edição / status** (ex.: "Edição 2026 · Pré-venda aberta")
- [ ] **Preço definitivo do livro** (R$)
- [ ] **Data de envio** (ex.: "21 de maio de 2026")

### B.7 · Bio da Eleonora 🔴

Aparece na página `/sobre`. Recomendado: **5 parágrafos** divididos em duas partes:

- [ ] **Parágrafos introdutórios** (3): formação, projeto, primeiro livro
- [ ] **Parágrafos complementares** (2): trajetória, especialidades, voz autoral

> Sugestão: a Eleonora escreve em primeira pessoa ("Sou jornalista…") OU em terceira ("Eleonora é jornalista…"). Recomendamos **terceira pessoa** — funciona melhor para autoridade editorial.

### B.8 · Galeria de entrevistados — **DECISÃO: ter ou não ter?** 🟡

A página `/galeria` está prevista no design original com retratos dos entrevistados que aparecem no livro/podcast.

- [ ] **Decidir:** vai ter galeria pública? (sim/não)
- Se SIM:
  - [ ] Lista de **mínimo 6 entrevistados** com:
    - Foto retrato (ver bloco C.5)
    - Nome próprio
    - Cargo / contexto (ex.: "Cuidadora · São Paulo")
    - Legenda longa opcional (1-2 frases)
    - **Autorização de uso de imagem assinada** (formulário simples)

> Se a decisão for NÃO ter galeria, retiramos a página e o banner em `/sobre` que linka para ela.

---

# C · IMAGENS E MÍDIAS

> **Formato preferencial:** JPG ou PNG. **Resolução: a maior possível** (preferimos cortar na hora de subir do que perder qualidade). Não enviar imagens com texto sobreposto — quebra na responsividade.

### C.1 · Foto profissional da Eleonora 🔴

Aparece em `/sobre` e em `/livro`.

- [ ] **1 retrato** profissional
  - Formato: vertical (3:4)
  - Resolução mínima: **1200 × 1600 px**
  - Iluminação: natural ou suave; fundo neutro de preferência
  - Estilo: editorial, não corporativo
  - Sem filtros ou edição agressiva

> Se ainda não houver, vale contratar um(a) fotógrafo(a) — é peça importante para a credibilidade.

### C.2 · Fotos dos produtos da loja 🔴

> A capa do livro já está no site. Esta seção é para os **demais produtos**.

- [ ] **1 foto principal por produto**, mais até 4 fotos secundárias (galeria)
  - Formato: quadrado (1:1) preferencialmente
  - Resolução mínima: **1500 × 1500 px**
  - Fundo neutro (branco ou off-white) — **muito importante**
  - Sem sombras pesadas
  - Mostrar o produto inteiro e detalhes em fotos separadas

> Sugerimos contratar um fotógrafo de produto para esta sessão — fotos amadoras "matam" a aparência da loja.

### C.3 · Imagens de capa dos posts editoriais 🔴

**1 imagem por post** (são 13 posts no mínimo · serão 13 imagens).

- Formato: horizontal (3:2)
- Resolução mínima: **1600 × 1067 px**
- Origem aceitável:
  - Foto autoral (preferencial)
  - Banco de imagens com licença comercial (Unsplash, Pexels — de graça)
  - Ilustração / aquarela (se a estética do projeto pedir)
- **Não usar** fotos com marca d'água visível
- **Sempre informar a origem** da imagem (para crédito ou licença)

### C.4 · Thumbnails dos episódios do Divã Infinito 🔴

**1 thumbnail por episódio** (3 mínimo · 3 thumbnails).

- Formato: 16:9 (mesmo do YouTube)
- Resolução mínima: **1920 × 1080 px**
- Pode ser:
  - Frame escolhido do próprio vídeo
  - Foto do convidado em close
  - Capa estilizada com tipografia da identidade

### C.5 · Fotos dos entrevistados (galeria) 🟡

> Apenas se a decisão de B.8 for SIM.

- [ ] **Mínimo 6 retratos** dos entrevistados
  - Formato: pode variar (3:4, 4:5, quadrado)
  - Resolução mínima: **1200 px** no menor lado
  - Sempre com **autorização de uso de imagem assinada**

---

# D · APROVAÇÕES E REVISÕES

### D.1 · Política de Privacidade 🔴

> O desenvolvedor já redigiu uma versão padrão LGPD adaptada ao escopo do site (newsletter + e-commerce + curadoria). **Está disponível em `/privacidade` para leitura.**

- [ ] **Ler integralmente** o texto em `/privacidade`
- [ ] **Idealmente, passar para um(a) advogado(a)** para revisão (especialmente os trechos sobre prazos de retenção e bases legais)
- [ ] **Confirmar** dados pessoais que aparecem (nome, foro, e-mail)
- [ ] **Aprovar** ou enviar comentários

### D.2 · Termos de Uso 🔴

> Igual ao acima. **Disponível em `/termos`.**

- [ ] **Ler integralmente**
- [ ] **Confirmar atenção especial** a:
  - Direito de arrependimento de 7 dias (Art. 49 CDC)
  - Política de trocas e devoluções (estamos com regra padrão)
  - Cláusula de envio de histórias para a Curadoria (cessão não exclusiva — é o padrão de revistas literárias)
  - Vedação de uso para treino de IA generativa
- [ ] **Aprovar** ou enviar comentários

### D.3 · Sinopse e bio 🔴

> Os textos provisórios já estão no site (placeholder). A versão final vai substituir 1:1.

- [ ] Aprovar ou ajustar a **sinopse oficial** (item B.6)
- [ ] Aprovar ou ajustar a **bio em terceira pessoa** (item B.7)

### D.4 · Patrocinadores 🟢

> No rodapé do site aparecem hoje: **Lei Rouanet · Itaú · Ministério da Cultura · Governo do Brasil**.

- [ ] **Confirmar** que esses são os patrocinadores definitivos
- [ ] Se mudou, enviar:
  - Logos definitivos (PNG ou SVG, fundo transparente, versão "para fundo escuro")
  - Ordem de exibição

---

# E · ACESSOS A FORNECER AO DESENVOLVEDOR

> Em formato seguro (não por e-mail aberto). Pode usar [1Password](https://1password.com/), [Bitwarden](https://bitwarden.com/) ou enviar pelo WhatsApp em mensagem que se autodestrói.

- [ ] **API Key da Brevo** + **List ID**
- [ ] **Public Key** e **Access Token** do Mercado Pago
- [ ] **Confirmação** de que pode mexer no painel da Hostinger (você não precisa enviar a senha — basta dar OK quando for o momento de mudar nameservers)

---

# RESUMO EXECUTIVO

**Para o site ir ao ar com 100% de funcionalidades, a Eleonora precisa entregar:**

| # | Item | Quantidade | Status |
|---|---|---|---|
| 1 | Posts editoriais | 13 (com texto, capa e categoria) | ⏳ |
| 2 | Episódios do Divã Infinito | 3 (com URL de vídeo) | ⏳ |
| 3 | Produtos da loja (além do livro) | 3 (com foto e preço) | ⏳ |
| 4 | Depoimentos sobre o livro | 3 | ⏳ |
| 5 | PDF da amostra do livro (estilo Amazon) | 1 PDF | ⏳ |
| 6 | Sinopse + detalhes técnicos (páginas, formato, lançamento, ISBN físico, ISBN ebook, idioma) + preço + edição | 1 conjunto | ⏳ |
| 7 | Bio da autora | 5 parágrafos | ⏳ |
| 8 | Foto profissional da autora | 1 retrato | ⏳ |
| 9 | Fotos dos produtos | 3 (mínimo) | ⏳ |
| 10 | Capas dos posts | 13 | ⏳ |
| 11 | Thumbnails dos episódios | 3 | ⏳ |
| 12 | Decisão sobre /galeria + 6 retratos (se SIM) | 1 decisão + opcional 6 fotos | ⏳ |
| 13 | Aprovação dos textos legais | leitura + assinatura | ⏳ |
| 14 | Dados legais (CPF, foro, e-mail) | 4 campos | ⏳ |
| 15 | Conta Brevo + chaves | 1 conta | ⏳ |
| 16 | Conta Mercado Pago + chaves | 1 conta | ⏳ |
| 17 | Acesso à Hostinger (no momento certo) | OK por mensagem | ⏳ |

---

## Estimativa de tempo razoável de entrega

> Não é uma cobrança — é um cronograma sugerido para que tudo flua.

| Bloco | Esforço | Prazo razoável |
|---|---|---|
| **A** · Decisões e dados | 2 horas concentradas | 1 semana |
| **B** · Conteúdo editorial | 13 posts × ~1h cada + outros itens | 3-5 semanas |
| **C** · Imagens (sessão de fotos + busca de capas) | 1-2 dias profissionais | 2-3 semanas |
| **D** · Aprovações | 2 horas de leitura + advogado opcional | 1 semana |
| **E** · Contas externas | 30 min cada | 1 dia |

**Total razoável para go-live:** 4 a 8 semanas a partir do "OK, vamos lá" da Eleonora.

---

## Próximo passo imediato

A Eleonora pode começar respondendo o **bloco A inteiro** (perguntas estratégicas, sem precisar produzir nenhum arquivo). Isso destrava o desenvolvedor para deploy inicial num subdomínio temporário e configuração das integrações.

Em paralelo, pode iniciar o **bloco B.7** (a bio dela é o item mais simples) e o **bloco D** (leitura dos textos legais).

Os blocos B (conteúdo) e C (imagens) podem rodar em paralelo nas semanas seguintes.

---

*Documento gerado em maio de 2026.*
*Em caso de dúvidas sobre qualquer item, basta encaminhar este documento de volta com os comentários.*
