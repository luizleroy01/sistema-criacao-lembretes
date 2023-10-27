# sistema-criacao-lembretes

## Decisões de projeto
Para este projeto utilizei a linguagem javascript pdevido a maior proficiência que tenho ao implementar funcionalidades com a linguagem, além disso optei pelo uso do tailwind pela praticidade ao aplicar a estilização e a capacidade responsiva da aplicação com um resultado bem satisfatório.
Com relação a estruturação do mesmo foram criadas funções para adicionar lembretes a lista, essa lista que consiste em uma estrutura de dados formadas por objetos que tem como atributos a data referente ao lembrete e um array de strings contendo o nome de cada compromisso no lembrete.Por fim , foi criada a função de remoção que remove compromissos de lembretes e exclui o lembrete completo caso o lembrete possuia apenas 1 compromisso.Além disso, foram criadas funcões auxiliares para verificar a validade das datas assim como para converte-las do formato (dd/mm/yyyy) para o formato internacional (yyyy-mm-dd).Ainda, além dessas funcionalidades há a possibilidade de tirar proveito da persistência de dados através do local storage em que é armazenado todos os lembretes criados pelo usuário no armazenamento do navegador

### função para adição de um novo lembrete:
**addReminder**

### função para deletar um lembrete:
**deleteReminder**

### função para verificar se a data está no formato válido:
**isValidDateFormat**

### função para verificar se a data está no futuro:
**verifyFutureDate**

### função que converte a data e retorna um objeto Date:
**convertDateFormat**

***

## Como inicializar o projeto
Após clonar o projeto em seu computador , execute o comando:
**cd sistema-agenda** para acessar o diretório que está contido o projeto nextjs, em seguida executar o comando **npm run dev** para executar o projeto em modo de desenvolvimento. Por fim,pode utilizar das funcionalidades do projeto com o gerenciamento de lembretes