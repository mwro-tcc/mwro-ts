## Testes de carga:

### Fase E: 1a Medição dos Testes de Carga

#### Serviço 1: Sign-up de usuário:

Este serviço simula um usuário criando uma conta.

Todos os testes foram realizados num banco de dados limpo, sem qualquer tipo de dado anterior.

-   Tipo de operações: Leitura e Escrita
-   Arquivos envolvidos:
    -   src/routes/user.ts (roteamento)
    -   src/controllers/UserController.ts (controller)
    -   src/domains/user/sign-up/index.ts (lógica de domínio)
    -   src/infra/database/user/index.ts (acesso ao banco de dados)
-   Arquivos com o código fonte de medição do teste:

    -   stress-tests/1-medicao/sign-up/sign-up-test.js
    -   stress-tests/1-medicao/sign-up/high-stress.js
    -   stress-tests/1-medicao/sign-up/medium-stress.js
    -   stress-tests/1-medicao/sign-up/low-stress.js

    Além desses, na mesma pasta estão presentes arquivos em formato .md com os resultados dos testes.

-   Descrição das configurações:

    Todos os testes foram realizados utilizando contâineres Docker.

    A API utilizou uma imagem criada a partir da imagem oficial do node, versão 20.

    O banco de dados utilizou a imagem oficial do postgres, versão versão 16.

    Ambos os contâineres foram executados localmente, numa máquina com processador Intel core I5 12400f, 32GB de RAM e armazenamento em um SSD NVME de 1 TB com velocidades de leitura de 2400MB/s e escrita de 1850MB/s. A máquina utiliza Windows 11 como sistema operacional principal, porém os contâineres foram executados dentro de um ambiente Linux (Ubuntu 24.04) através de WSL.

    Os testes foram realizados utilizando a ferramenta K6 da Grafana.

-   Testes de carga (SLA):

    -   Baixo stress:

        -   vazão (número médio de requisições por minuto): 10 usuários virtuais por segundo \* 60 segundos = 600 requisições/minuto
        -   latência (tempo médio de resposta):
            -   média: 5.12ms
            -   Outros valores: min=2.09ms med=3.89ms max=480.87ms p(90)=6.57ms p(95)=7.97ms
        -   concorrência (limite de requisições simultâneas):
            Não atingiu nenhum limite.

    -   Médio stress:

        -   vazão (número médio de requisições por minuto): 1000 usuários virtuais por segundo \* 60 segundos = 60.000 requisições/minuto
        -   latência (tempo médio de resposta):
            -   média: 345.44ms
            -   Outros valores: min=5.66ms med=363.67ms max=1.72s p(90)=555.59ms p(95)=623.68ms
        -   concorrência (limite de requisições simultâneas):
            Não atingiu nenhum limite.

    -   Alto stress:

        -   vazão (número médio de requisições por minuto): 10000 usuários virtuais por segundo \* 60 segundos = 60.0000 requisições/minuto
        -   latência (tempo médio de resposta):
            -   média: 13.32s
            -   Outros valores: min=332.63ms med=14s max=1m1s p(90)=15.99s p(95)=16.74s
        -   concorrência (limite de requisições simultâneas):
            De um total de 133,554 requisições realizadas no teste,1.48% (1983 falharam). Isso significa que o sistema atingiu algum tipo de limite ao realizar 10.000 requisições simultâneas, porém não se sabe dizer ao certo o número limite apenas com os dados fornecidos pelo K6.

        ![alt text](stress-tests/1-medicao/sign-up/image.png)

-   Potenciais gargalos:

    -   O endpoint realiza uma operação de leitura por string na coluna email da tabela users. Essa coluna atualmente não se encontra indexada. Isso é reforçado pelo fato de que a média do tempo de resposta é considerávelmente maior do que a mediana. Isso indica que as primeiras requisições não eram tão lentas, porém conforme a tabela foi sendo preenchida, as requisições foram tomando mais tempo. Um índice nesse campo poderia aumentar significativamente a performance do endpoint.

    -   O alto número de pedidos simultâneos pode ter sido impactado pelo limitado número de conexões disponíveis na pool de conexões com o banco de dados. Para os testes, utilizou-se o número padrão de conexões da biblioteca pg-pool (10). Ao atingir o número máximo de conexões em uso, as requisições precisavam esperar até que o banco estabelecesse novas conexões com o servidor (um processo custoso). Utilizar um número maior de conexões em aberto na pool poderia aumentar significativamente a performance do endpoint.

    -   Aumentar o número de conexões com o banco, apesar de ser um experimento fundamental, não é uma abordagem bala-de-prata, visto que cada conexão em aberto consome recursos do banco de dados. Dessa forma, não se pode aumentar as conexões indefinidamente, visto que recursos do banco passarão a ser utilizados para manter as conexões, deixando então de serem utilizados para suas funções principais. Uma outra abordagem para auxiliar nessa questão seria utilizar uma fila de processamento (RabbitMQ, por exemplo), de forma que a fila seria responsável por gerenciar os pedidos sendo recebidos e processando-os de forma gradual, sem sobrecarregar as conexões com o banco de dados.

    -   Apesar de haver uma operação de leitura envolvida no serviço, ela não traria benefícios em relação à performance, visto que a busca pelo e-mail seria (idealmente) sempre um miss no cache, sendo necessário realizar a busca no banco de qualquer forma.

#### Serviço 2: Buscar produto:

Este serviço simula um usuário fazendo login e buscando um produto.

Todos os testes foram realizados num banco de dados com 68.787 produtos e 1 usuário cadastrado.

A busca pelo produto é realizada pelo nome do produto, e os produtos cadastrados possuem uma boa diversidade de nomes.

A escolha de qual nome será utilizada na busca é aleatória e decidida na execução do teste.

-   Tipo de operações: Leitura e Escrita
-   Arquivos envolvidos:
    -   src/routes/product.ts (roteamento)
    -   src/domains/user/sign-in/index.ts (lógica de domínio)
    -   src/controllers/ProductController.ts (controller)
    -   src/infra/database/user/index.ts (acesso ao banco de dados)
    -   src/infra/database/product/index.ts (acesso ao banco de dados)
-   Arquivos com o código fonte de medição do teste:

    -   stress-tests/1-medicao/search-product/search-product-test.js
    -   stress-tests/1-medicao/search-product/high-stress.js
    -   stress-tests/1-medicao/search-product/medium-stress.js
    -   stress-tests/1-medicao/search-product/low-stress.js

    Além desses, na mesma pasta estão presentes arquivos em formato .md com os resultados dos testes.

-   Descrição das configurações:

    Todos os testes foram realizados utilizando contâineres Docker.

    A API utilizou uma imagem criada a partir da imagem oficial do node, versão 20.

    O banco de dados utilizou a imagem oficial do postgres, versão versão 16.

    Ambos os contâineres foram executados localmente, numa máquina com processador Intel core I5 12400f, 32GB de RAM e armazenamento em um SSD NVME de 1 TB com velocidades de leitura de 2400MB/s e escrita de 1850MB/s. A máquina utiliza Windows 11 como sistema operacional principal, porém os contâineres foram executados dentro de um ambiente Linux (Ubuntu 24.04) através de WSL.

    Os testes foram realizados utilizando a ferramenta K6 da Grafana.

-   Testes de carga (SLA):

    -   Baixo stress:
        -   vazão (número médio de requisições por minuto): 10 usuários virtuais por segundo \* 60 segundos = 600 requisições/minuto
        -   latência (tempo médio de resposta):
            -   média: 7.52ms
            -   Outros valores: min=2.24ms med=7.11ms max=37.74ms p(90)=9.5ms p(95)=11.02ms
        -   concorrência (limite de requisições simultâneas):
            Não atingiu nenhum limite.
    -   Médio stress:
        -   vazão (número médio de requisições por minuto): 1000 usuários virtuais por segundo \* 60 segundos = 60.000 requisições/minuto
        -   latência (tempo médio de resposta):
            -   média: 85.55ms
            -   Outros valores: min=21.8µs med=52.67ms max=1.97s p(90)=192.09ms p(95)=250.04ms
        -   concorrência (limite de requisições simultâneas):
            Não atingiu nenhum limite.
    -   Alto stress:
        -   vazão (número médio de requisições por minuto): 10000 usuários virtuais por segundo \* 60 segundos = 60.0000 requisições/minuto
        -   latência (tempo médio de resposta):
            -   média: 9.68s
            -   Outros valores: min=282.9ms med=9.4s max=59.54s p(90)=10.49s p(95)=10.73s
        -   concorrência (limite de requisições simultâneas):
            -   De um total de 170389 requisições realizadas no teste, 0.99% (1697) falharam. Isso significa que o sistema atingiu algum tipo de limite ao realizar 10.000 requisições simultâneas, porém não se sabe dizer ao certo o número limite apenas com os dados fornecidos pelo K6.

    ![alt text](stress-tests/1-medicao/search-product/image.png)

-   Potenciais gargalos:

    -   Uma camada de cache poderia aumentar significativamente a performance desse serviço. Ela permitira que buscas frequentes pudessem não passar por um acesso ao banco. Isso pouparia uso de conexões do banco, pouparia recursos de processamento e memória do banco e diminuiria o tempo de resposta geral por não precisar fazer o acesso ao banco.

    -   O endpoint realiza uma operação de leitura por string na coluna email da tabela users, além de uma busca por string na coluna name da tabela products. Essas colunas atualmente não se encontram indexadas.

    -   O alto número de pedidos simultâneos pode ter sido impactado pelo limitado número de conexões disponíveis na pool de conexões com o banco de dados. Para os testes, utilizou-se o número padrão de conexões da biblioteca pg-pool (10). Ao atingir o número máximo de conexões em uso, as requisições precisavam esperar até que o banco estabelecesse novas conexões com o servidor (um processo custoso). Utilizar um número maior de conexões em aberto na pool poderia aumentar significativamente a performance do endpoint.

    -   Aumentar o número de conexões com o banco, apesar de ser um experimento fundamental, não é uma abordagem bala-de-prata, visto que cada conexão em aberto consome recursos do banco de dados. Dessa forma, não se pode aumentar as conexões indefinidamente, visto que recursos do banco passarão a ser utilizados para manter as conexões, deixando então de serem utilizados para suas funções principais. Uma outra abordagem para auxiliar nessa questão seria utilizar uma fila de processamento (RabbitMQ, por exemplo), de forma que a fila seria responsável por gerenciar os pedidos sendo recebidos e processando-os de forma gradual, sem sobrecarregar as conexões com o banco de dados.

## Fase E: 2a Medição dos testes de Carga.

#### Serviço 1: Sign-up de usuário:

O endpoint de sign-up não sofreu quaisquer alterações em seus arquivos. As informações sobre arquivos que envolvem esse serviço fornecidas na primeira medição permanecem os mesmos.

A melhoria implementada nesse serviço para essa nova rodada de medições foi a inclusão de um índice na coluna de "email" da tabela "users".

Com essa melhoria, esperou-se que a etapa de checagem se o email já estava em uso ou não fosse acelerada pelo índice.

Abaixo seguem os resultados dos testes:

-   Testes de carga (SLA):

    -   Baixo stress:
        -   vazão (número médio de requisições por minuto): 10 usuários virtuais por segundo \* 60 segundos = 600 requisições/minuto
        -   latência (tempo médio de resposta):
            -   média: 6.18ms
            -   Outros valores: min=1.85ms med=3.83ms max=810.75ms p(90)=6.73ms p(95)=7.84ms
        -   concorrência (limite de requisições simultâneas):
            Não atingiu nenhum limite.
    -   Médio stress:
        -   vazão (número médio de requisições por minuto): 1000 usuários virtuais por segundo \* 60 segundos = 60.000 requisições/minuto
        -   latência (tempo médio de resposta):
            -   média: 86.62ms
            -   Outros valores: min=1.83ms med=63.28ms max=2.57s p(90)=168.2ms p(95)=217.3ms
        -   concorrência (limite de requisições simultâneas):
            Não atingiu nenhum limite.
    -   Alto stress:

        -   vazão (número médio de requisições por minuto): 10000 usuários virtuais por segundo \* 60 segundos = 60.0000 requisições/minuto
        -   latência (tempo médio de resposta):
            -   média: 11.01s
            -   Outros valores: min=827.47ms med=10.46s max=1m3s p(90)=12.99s p(95)=13.36s
        -   concorrência (limite de requisições simultâneas):
            -   De um total de 162138 requisições realizadas no teste, 0.03% (53 falharam). Isso significa que o sistema atingiu algum tipo de limite ao realizar 10.000 requisições simultâneas, porém não se sabe dizer ao certo o número limite apenas com os dados fornecidos pelo K6.

    ![alt text](stress-tests/2-medicao/sign-up/image.png)

    -   Conclusões:

    Os valores médios e mínimos de latência em baixo stress não tiveram diferenças consideráveis entre os dois cenários. Os valores máximos tiveram um aumento considerável após a adição do índice (480.87ms para 810.75ms).

    Os valores médios tiveram uma redução considerável (345.44ms para 86.62ms) em médio stress. Os valores mínimos e máximos não tiveram diferença significativa.

    Em alto stress os valores médios, mínimos e máximos não tiveram grande diferença entre os cenários.

    Acredita-se que com os valores obtidos pode-se concluir que no cenário de teste proposto não é possível ver grandes melhorias no uso de um índice para acelerar a leitura. Nos testes executados, foram realizados cenários com 10, 1000 e 10000 requisições simultâneas por segundo ao longo de 3 minutos.

    Nesse cenário, o banco não é capaz de atender 1000 ou 10000 conexões simultâneas sendo realizadas. Isso faz com que uma requisição precise aguardar a anterior para ser executada, enquanto o banco se mantém num cenário de grande stress. Nesse contexto, acredita-se que aumentar o número de conexões na pool poderia mostrar ganhos consideráveis na performance dos testes.

    Os cenários de teste (principalmente baixo e médio stress) fazem com que a tabela de users não possua muitas linhas, fazendo com que o ganho de performance da operação de leitura fosse negligenciavel. No cenário de alto stress, nem toda requisição é atendida, então apesar do cenário tentar simular 10.000 requisições, nem todas conseguem ser executadas.

    Além disso, a adição de um índice oferece uma perda na performance da operação de escrita, que provavelmente anulou quaisquer ganhos na leitura.

#### Serviço 2: Buscar produto:

O endpoint de buscar produto não sofreu quaisquer alterações em seus arquivos. As informações sobre arquivos que envolvem esse serviço fornecidas na primeira medição permanecem os mesmos.

A melhoria implementada nesse serviço para essa nova rodada de medições foi a inclusão de um índice na coluna de "name" da tabela "products".

Com essa melhoria, esperou-se que a busca fosse acelerada pelo índice.

-   Testes de carga (SLA):

    -   Baixo stress:
        -   vazão (número médio de requisições por minuto): 10 usuários virtuais por segundo \* 60 segundos = 600 requisições/minuto
        -   latência (tempo médio de resposta):
            -   média: 7.85ms
            -   Outros valores: min=4.16ms med=7.54ms max=32.97ms p(90)=9.68ms p(95)=10.78ms
        -   concorrência (limite de requisições simultâneas):
            Não atingiu nenhum limite.
    -   Médio stress:
        -   vazão (número médio de requisições por minuto): 1000 usuários virtuais por segundo \* 60 segundos = 60.000 requisições/minuto
        -   latência (tempo médio de resposta):
            -   média: 62.38ms
            -   Outros valores: min=2.08ms med=23.98ms max=2.15s p(90)=134.73ms p(95)=251.46ms
        -   concorrência (limite de requisições simultâneas):
            Não atingiu nenhum limite.
    -   Alto stress:
        -   vazão (número médio de requisições por minuto): 10000 usuários virtuais por segundo \* 60 segundos = 60.0000 requisições/minuto
        -   latência (tempo médio de resposta):
            -   média: 10.16s
            -   Outros valores: min=224.61ms med=10.11s max=28.03s p(90)=11.48s p(95)=11.69s
        -   concorrência (limite de requisições simultâneas):
            Não atingiu nenhum limite.

    ![alt text](stress-tests/2-medicao/search-product/image.png)

Os resultados desse teste foram similares ao do teste sign-up. A adição de um índice não apresentou grandes melhorias na performance do serviço.

Esse serviço era composto de operações exclusivamente de leitura, em cima de uma tabela com aproximadamente 70 mil linhas. Acredita-se que o ganho de performance por um índice de leitura possa ser mais perceptível com um número de linhas maior.

Similarmente ao serviço de sign-up, espera-se que um aumento no número de conexões do banco possa mostrar um ganho considerável na performance, assim como uma possível adição de uma camada de cache para diminuir o número de requisições simultâneas no banco.
