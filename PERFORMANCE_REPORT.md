# Relatório de Performance

## Referência Lighthouse recebida

| Perfil | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Mobile, antes | 76 | 96 | 100 | 100 |
| Desktop, antes | 81 | 100 | 96 | 100 |
| Mobile, depois | Pendente de nova execução | Pendente | Pendente | Pendente |
| Desktop, depois | Pendente de nova execução | Pendente | Pendente | Pendente |

O detalhamento por auditoria do Lighthouse não foi fornecido. Portanto, os dois descontos (Accessibility mobile e Best Practices desktop) não podem ser atribuídos a uma causa específica com segurança nesta revisão.

## Otimizações aplicadas

- Priorizada a imagem principal da Hero com `preload` da variante AVIF e `fetchpriority="high"`.
- Geradas variantes AVIF e WebP da Hero: 72 KB e 109 KB, respectivamente, contra 283 KB do JPEG original.
- Geradas variantes AVIF e WebP de 640 px para a galeria: 36 KB e 56 KB, respectivamente.
- Adicionado `picture` com AVIF, WebP e JPEG de fallback para Hero e galeria.
- Preservado o carregamento preguiçoso das imagens da galeria, com `decoding="async"`.
- Definidas as dimensões intrínsecas reais (`1152 × 1138`) de todas as imagens para reduzir CLS.
- Adicionado `height: auto` à regra global de imagens para preservar proporção.
- Mantidos `preconnect` e `display=swap` para Google Fonts; a importação agora limita-se aos pesos usados pela interface.
- Adicionado `defer` a todos os scripts, preservando a ordem de execução, incluindo `googleSheets.js` antes de `rsvp.js`.
- Removidas quatro requisições de scripts vazios (`calendar`, `maps`, `modal` e `music`), que continham apenas comentários e nenhum comportamento.
- A classe de página pronta passa a ser aplicada em `DOMContentLoaded`, sem aguardar imagens abaixo da dobra.
- Adicionados `theme-color`, referência ao manifest e cores de fundo/tema no manifesto.
- Removida a referência ao favicon inexistente, evitando uma requisição quebrada.

## Arquivos alterados

- `index.html`
- `css/base.css`
- `js/app.js`
- `manifest.webmanifest`
- `PERFORMANCE_REPORT.md`

## Recursos preservados por segurança

- O JPEG original foi mantido como fallback para navegadores sem AVIF/WebP.
- `content-visibility` não foi aplicado: poderia interferir no reveal por `IntersectionObserver` e na disponibilidade semântica de seções fora da tela.
- A lógica da contagem, do RSVP e do Google Sheets não foi alterada.
- Animações continuam limitadas a `transform` e `opacity`, com `prefers-reduced-motion` preservado.

## Melhorias futuras

- Criar um favicon válido e incluí-lo no manifest quando os arquivos de ícone estiverem disponíveis.
- Executar Lighthouse em servidor HTTP local ou no ambiente de publicação para registrar métricas reais.

## Checklist manual do Lighthouse

1. Executar Lighthouse em perfil mobile e desktop com cache desativado.
2. Conferir LCP da imagem da Hero e confirmar que ela foi priorizada.
3. Confirmar ausência de CLS durante o carregamento das imagens.
4. Verificar o envio RSVP e a requisição ao Apps Script.
5. Confirmar contador, reveals, foco visível e `prefers-reduced-motion`.
6. Revisar Console, recursos 404 e recomendações de fontes/imagens.

## Métricas observadas

Lighthouse não foi executado novamente neste ambiente: o navegador integrado bloqueia a abertura direta do projeto por `file://`, e não há servidor HTTP local configurado. As métricas depois das otimizações devem ser coletadas no ambiente de publicação ou em um servidor local.
