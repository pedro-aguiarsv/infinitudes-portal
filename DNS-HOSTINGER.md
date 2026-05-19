# Configuração de DNS · Hostinger → Netlify

Este guia descreve como apontar o domínio **infinitudes.com.br** (registrado e administrado pela Hostinger) para o site hospedado no **Netlify**.

> **Atenção**: nada disso afeta os e-mails do domínio (`@infinitudes.com.br`). Os registros MX continuarão como estão na Hostinger e os e-mails seguem funcionando normalmente.

---

## Pré-requisito · Site publicado no Netlify

Antes de mexer no DNS, o site precisa estar publicado no Netlify (ainda que num subdomínio temporário tipo `https://meu-site-12345.netlify.app`). Esse passo é meu — me avise quando puder fazer o deploy inicial e eu cuido.

Após o deploy, o Netlify vai atribuir uma URL temporária e me dará dois valores que você precisa copiar do painel:

- **IP do load balancer** (`A record`) — geralmente `75.2.60.5` (mas confirmar no Netlify)
- **Hostname** do projeto (`CNAME`) — algo como `nome-do-projeto.netlify.app`

Essa instrução parte do princípio que esses valores já existem.

---

## Caminho recomendado · Mudar nameservers para o Netlify

> **Por que esse caminho:** o Netlify cuida automaticamente de SSL, www → non-www, redirects e qualquer mudança futura de IP. Você não precisa voltar no painel da Hostinger nunca mais para esse domínio.

### Passo 1 · Pegar os nameservers do Netlify

No painel do Netlify (depois do deploy):

1. Acesse o site no Netlify
2. **Domain settings** → **Add a domain you already own** → digite `infinitudes.com.br`
3. O Netlify vai gerar 4 nameservers (eles mudam, copie os atuais). Costumam ser parecidos com:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```

> **Esse passo é meu — eu te passo os 4 nameservers exatos quando o deploy estiver feito.**

### Passo 2 · Trocar os nameservers na Hostinger

> ⚠️ **Você precisa fazer este passo no painel da Hostinger.**

1. Login em [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Menu lateral → **Domains** → clique em **infinitudes.com.br**
3. Aba **DNS / Nameservers** (ou "Servidores de Nome")
4. Clique em **Change nameservers** ou "Alterar servidores de nome"
5. Selecione **Use custom nameservers** ("Usar servidores personalizados")
6. Cole os 4 nameservers do Netlify (que eu te passar)
7. Salve

### Passo 3 · Esperar a propagação

- Tempo típico: **15 minutos a 4 horas**
- Tempo máximo: **48 horas** (raríssimo)
- Verifique o status em: [whatsmydns.net](https://www.whatsmydns.net/?d=infinitudes.com.br&t=NS)
- Quando aparecer `dns1.p01.nsone.net` (ou similar) na maioria das regiões, está propagado

### Passo 4 · Confirmar SSL automático

Assim que o Netlify detectar que os nameservers estão apontando para ele:
- Provisiona certificado SSL **Let's Encrypt** automaticamente (~1 minuto)
- Habilita HTTPS automático
- Cria redirect `http://` → `https://`
- Cria redirect `www.infinitudes.com.br` → `infinitudes.com.br` (ou inverso, configurável)

Eu confirmo no painel do Netlify quando estiver tudo verde e te aviso.

---

## Caminho alternativo · Manter DNS da Hostinger e apontar manualmente

> Use este caminho **se não quiser** transferir o controle de DNS para o Netlify (por exemplo, se há subdomínios e e-mails complexos sendo gerenciados pela Hostinger).
>
> A desvantagem: SSL pode demorar mais para provisionar e qualquer mudança futura precisa ser feita manualmente.

### Passo 1 · Editar registros DNS na Hostinger

> ⚠️ **Você faz este passo no painel da Hostinger.**

1. Login em [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. **Domains** → **infinitudes.com.br** → aba **DNS Zone Editor** (ou "Editor da Zona DNS")
3. **Apague** os registros `A` existentes que apontem para algum servidor antigo (Hostinger geralmente cria um padrão para o "site em construção"). Os registros `MX` e `TXT` (e-mail) **NÃO devem ser apagados**.
4. **Adicione** os seguintes registros:

   | Tipo | Nome | Valor | TTL |
   |---|---|---|---|
   | A | `@` | `75.2.60.5` | 3600 |
   | CNAME | `www` | `apex-loadbalancer.netlify.com` | 3600 |

   > Os valores acima são os DNS oficiais do Netlify. **Confirmar no painel** do Netlify (Domain settings → "Configure DNS records") porque podem mudar.

5. Salvar

### Passo 2 · Adicionar o domínio customizado no Netlify

> Esse passo é meu — eu adiciono no painel do Netlify após você ajustar o DNS.

1. **Domain settings** → **Add a domain you already own** → digite `infinitudes.com.br`
2. Clicar em **Verify** e seguir as instruções
3. Forçar HTTPS

### Passo 3 · Esperar SSL

Pode demorar **15 min a 24h** para o certificado SSL ser emitido. Enquanto não emite, o site abre normal mas com aviso "não seguro" no Chrome — é temporário.

---

## Resumo do que eu preciso de você (no fim do processo)

Quando estiver pronto pra deploy, vou te passar:

| Quando | O que eu te passo | O que você faz |
|---|---|---|
| **Após deploy no Netlify** | Os 4 nameservers do Netlify | Login na Hostinger → Domains → DNS/Nameservers → Use custom nameservers → cola os 4 → Save |
| **Após propagação** | Confirmação de que está tudo ok | Nada — só confirmar comigo se o site abre em `https://infinitudes.com.br` |

---

## Troubleshooting

### "O site ainda mostra a página antiga (Histórias de Vidas · Divã Infinito · Hub Finito · Sobre)"

A página atual está hospedada na própria Hostinger via Website Builder ou similar. Quando você trocar os nameservers para o Netlify, ela some automaticamente — o controle do domínio passa pro Netlify.

> **Antes de mudar, confirme com a Eleonora que essa página atual pode ser desativada.** Caso contrário, é trabalho jogado fora.

### "E os e-mails?"

Se houver caixas postais `@infinitudes.com.br` ativas na Hostinger:

- **Caminho recomendado (nameservers Netlify):** após mudar os nameservers, copiamos os registros `MX` originais da Hostinger e replicamos no painel de DNS do Netlify. Os e-mails seguem funcionando.
- **Caminho alternativo (DNS na Hostinger):** os e-mails continuam intactos, sem precisar mexer em nada.

> Me avise se há e-mails ativos antes de fazer a migração — preciso copiar os MX records antes.

### "Como saber se a propagação terminou?"

Use [whatsmydns.net](https://www.whatsmydns.net/?d=infinitudes.com.br&t=A) e digite `infinitudes.com.br`. Quando a maioria dos pontos do mapa mostrar o IP da Netlify (`75.2.60.5` ou similar), está pronto.

### "Posso reverter se der errado?"

Sim. Volta no painel da Hostinger → Nameservers → seleciona "Default Hostinger nameservers" e em até 4h tudo volta como estava. **Nada é perdido.**
