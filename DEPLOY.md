# Publicar o site num VPS da Hostinger

O site corre em três peças, todas com Docker:

| Peça | O que faz |
| --- | --- |
| `web` | O site (páginas PT/EN e painéis de admin) |
| `pocketbase` | Base de dados dos formulários, fotos, contas e emails |
| `caddy` | Recebe os visitantes, trata do HTTPS e encaminha para as outras duas |

## Primeira instalação

No terminal do VPS (hPanel → VPS → Terminal do navegador):

```bash
git clone https://github.com/<utilizador>/<repositorio>.git site
cd site
cp .env.example .env
nano .env        # preencher os valores; gravar com Ctrl+O, Enter, Ctrl+X
docker compose up -d --build
```

## Atualizar depois de cada alteração

```bash
cd site
git pull
docker compose up -d --build
```

## DNS (no painel do domínio)

| Tipo | Nome | Valor |
| --- | --- | --- |
| A | @ | IP do VPS |
| A | www | IP do VPS |
| A | admin | IP do VPS |

## Depois de instalar

1. Abrir `https://admin.cupidbureau.site/_/` e entrar com `PB_SUPERUSER_EMAIL` / `PB_SUPERUSER_PASSWORD`.
2. Settings → Mail settings: configurar o SMTP (sem isto não saem emails).
3. Settings → Backups: ativar cópias automáticas.
4. Se tiver dados no Horizons: importar a cópia de segurança em Settings → Backups → Upload.

## Ver erros

```bash
docker compose logs -f web
docker compose logs -f pocketbase
```
