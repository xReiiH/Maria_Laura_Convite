# Painel administrativo privado

Este painel é separado do endpoint público que recebe o RSVP. Ele não deve ser adicionado ao site público nem implantado com acesso aberto.

## Implantação

1. Abra a planilha que contém a aba **Confirmações**.
2. Na planilha, abra **Extensões → Apps Script**. Isso cria um projeto vinculado à planilha, mas separado do projeto usado pelo endpoint público do RSVP.
3. Crie os arquivos `Admin.gs`, `Admin.html`, `AdminStyles.html` e `AdminScripts.html`.
4. Copie o conteúdo dos arquivos correspondentes da pasta `google-apps-script-admin/` deste projeto.
5. Salve o projeto e clique em **Implantar → Nova implantação**.
6. Selecione **Aplicativo da web**.
7. Em **Executar como**, escolha **Eu (proprietário)**.
8. Em **Quem pode acessar**, escolha **Somente eu**.
9. Autorize as permissões solicitadas e conclua a implantação.
10. Abra a URL terminada em `/exec` enquanto estiver conectada à conta Google proprietária e guarde-a apenas para uso administrativo.

## Regras de segurança

- Nunca implante este dashboard como **Qualquer pessoa** ou **Qualquer pessoa com uma conta Google**.
- Uma senha escrita apenas no front-end não protege os dados; o acesso deve ser controlado pela configuração de implantação e pela conta Google.
- Mantenha este projeto administrativo separado do projeto Apps Script público que recebe o RSVP.
- Não compartilhe a planilha publicamente e não inclua sua URL no convite.
- O painel lê somente Data/Hora, Nome e Presença. Origem e User Agent permanecem no servidor e não são enviados à interface.
- Não há exclusão, edição, exportação ou API pública de leitura neste painel.
