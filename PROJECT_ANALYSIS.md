# Análise do Projeto — Maria Laura · Convite de 1 Aninho

**Data da análise:** 13/07/2026  
**Escopo:** auditoria do estado atual do repositório, sem alterações na implementação.  
**Branch analisada:** `feature_v4` (`6d59d94`, o mesmo commit de `main` e das referências remotas).

## Resumo executivo

O repositório está praticamente vazio. Não há aplicação existente a reconstruir: nenhum arquivo HTML, CSS, JavaScript/TypeScript, componente, imagem, fonte, manifesto, configuração de pacote ou diretório de código-fonte foi versionado no estado atual.

Assim, não foi possível localizar o Hero antigo nem avaliar sua implementação. A V4 deve ser iniciada como uma base nova e independente, conforme solicitado, sem reaproveitamento do Hero.

## Estrutura atual do projeto

```text
Maria_Laura_Convite/
├── .git/                 # metadados do repositório (não fazem parte da aplicação)
└── README.md             # identificação breve do projeto
```

Conteúdo funcional identificado:

| Tipo | Arquivos encontrados | Observação |
| --- | --- | --- |
| Documentação | `README.md` | Contém somente o título e uma descrição curta. |
| HTML | Nenhum | Não existe ponto de entrada ou marcação. |
| CSS | Nenhum | Não existe folha de estilos, tokens ou tema. |
| JavaScript/TypeScript | Nenhum | Não existe comportamento, framework ou configuração de build. |
| Assets | Nenhum | Não há imagens, ícones, fontes, áudio ou vídeo. |
| Dependências | Nenhuma | Não há `package.json`, lockfile ou configuração de gerenciador. |

## Problemas encontrados

1. **Ausência completa de implementação.** O README descreve o convite, mas não há aplicação associada a ele.
2. **Não há histórico útil para auditoria.** Todas as branches locais e remotas apontam para o mesmo commit inicial; não há uma versão anterior acessível no repositório que contenha o Hero antigo.
3. **Codificação incorreta no README.** A descrição aparece como `aniversÃ¡rio`, indicando provável texto UTF-8 lido ou salvo com charset incompatível.
4. **Sem convenções técnicas estabelecidas.** Não há definição de framework, estrutura de pastas, lint, formatação, testes, responsividade, acessibilidade ou pipeline de publicação.
5. **Sem conteúdo visual.** Faltam referências de identidade visual, imagens, paleta, tipografia e dados definitivos do evento, necessários para um convite fiel.

## CSS duplicado ou obsoleto

Não encontrado. Não há arquivos CSS, pré-processadores, CSS-in-JS ou classes HTML no repositório.

## JavaScript não utilizado

Não encontrado. Não há arquivos JavaScript, TypeScript, módulos, bundles ou referências a scripts.

## HTML com problemas

Não encontrado. Não há arquivos `.html`, templates ou componentes de marcação para validar semântica, acessibilidade, estrutura ou links.

## Arquivos não utilizados

Não há arquivos de aplicação para classificar como não utilizados.

- `README.md` é utilizado como documentação mínima do projeto.
- `.git/` é infraestrutura de controle de versão e não deve ser considerado parte da aplicação.

## Classes duplicadas

Não encontrado. Como não há HTML, CSS ou componentes, não existem seletores ou classes para comparar.

## Sugestão de arquitetura para a V4

Como não há base legada a preservar, a recomendação é uma aplicação estática moderna, enxuta e centrada em uma única página, organizada por seções e componentes reutilizáveis.

```text
src/
├── components/
│   ├── ui/               # Button, Section, Container e elementos genéricos
│   └── invitation/       # componentes próprios do convite
├── sections/             # HeroV4, Sobre, Detalhes, Confirmação, Localização
├── data/                 # dados do evento e links, separados da apresentação
├── styles/
│   ├── tokens.css        # cores, tipografia, espaçamentos e sombras
│   ├── globals.css       # reset, base e regras globais
│   └── animations.css    # animações opcionais, centralizadas
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
└── main.[js|ts|tsx]
```

Diretrizes recomendadas:

- Criar o `HeroV4` do zero, sem importar markup, CSS ou imagens do Hero anterior.
- Definir tokens de design antes das seções para impedir cores e medidas repetidas.
- Manter os dados do evento em um único módulo (`data/event`) para evitar textos e URLs duplicados.
- Usar HTML semântico (`header`, `main`, `section`, `footer`) e navegação por teclado.
- Reservar espaço das imagens e respeitar `prefers-reduced-motion` para uma experiência responsiva e acessível.
- Priorizar imagens otimizadas e carregamento sob demanda fora da primeira dobra.
- Incluir validações de lint, formatação e pelo menos testes de renderização/navegação críticos após a definição da stack.

## Lista de tarefas — reconstrução completa da V4

- [ ] Confirmar stack (HTML/CSS/JS estático ou framework) e destino de publicação.
- [ ] Reunir conteúdo definitivo: data, horário, local, mapa, mensagem, contato/RSVP e política de acompanhantes.
- [ ] Reunir ou aprovar referências visuais: fotos, ilustrações, paleta, tipografias e tom da comunicação.
- [ ] Corrigir a codificação e ampliar o `README.md` com instruções de desenvolvimento e publicação.
- [ ] Inicializar a estrutura de projeto, dependências e comandos de desenvolvimento/build.
- [ ] Definir tokens de design e estilos globais da V4.
- [ ] Projetar e implementar o `HeroV4` inteiramente novo.
- [ ] Implementar as seções de informações do evento, localização, confirmação de presença e rodapé.
- [ ] Adicionar assets otimizados, textos alternativos e fallback para mídias indisponíveis.
- [ ] Implementar navegação, links de mapa/RSVP e quaisquer interações necessárias.
- [ ] Garantir responsividade para celular, tablet e desktop.
- [ ] Executar auditoria de acessibilidade, performance e compatibilidade entre navegadores.
- [ ] Validar visualmente contra as referências aprovadas e ajustar detalhes finais.
- [ ] Documentar a arquitetura, comandos e fluxo de atualização do conteúdo.

## Limitação desta análise

As conclusões acima refletem exclusivamente o conteúdo disponível neste clone. Se o Hero ou versões anteriores existirem em outro diretório, backup, repositório ou branch ainda não adicionada a este remoto, será necessário disponibilizá-los para uma auditoria comparativa do legado.
