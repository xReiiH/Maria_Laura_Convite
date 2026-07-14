# Configuração do Google Sheets

1. Crie uma planilha no Google Sheets.
2. Use o nome sugerido: **Confirmações — Maria Laura 1 Aninho**.
3. Abra **Extensões → Apps Script**.
4. Substitua o conteúdo do editor pelo arquivo `google-apps-script/Code.gs` deste projeto.
5. Salve o projeto.
6. Clique em **Implantar → Nova implantação**.
7. Em tipo, selecione **Aplicativo da Web**.
8. Em “Executar como”, selecione o proprietário.
9. Em “Quem pode acessar”, selecione qualquer pessoa.
10. Autorize as permissões solicitadas.
11. Copie a URL pública terminada em `/exec`.
12. Cole essa URL na constante `WEB_APP_URL` de `js/googleSheets.js`.
13. Não utilize a URL terminada em `/dev`.
14. Faça um teste com uma resposta fictícia.
15. Confira se a aba **Confirmações** foi criada e recebeu uma linha.

## Segurança e manutenção

- A URL pública do Web App não é uma senha.
- Não compartilhe a planilha publicamente.
- Não inclua dados sensíveis no formulário RSVP.
- Depois de alterar o Apps Script, pode ser necessário criar uma nova versão da implantação.
