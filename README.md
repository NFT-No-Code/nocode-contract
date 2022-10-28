#  Smart Contract - colecionavel.digital

O repositório é composto por quatro contratos e arquivos do ambiente de desenvolvimento Hardhat.


# Descrição

Através de um contrato principal permite-se a criação de contratos compatíveis com padrão [ERC721](https://eips.ethereum.org/EIPS/eip-721), estrutura fundamental de Tokens Não-Fungíveis. 

O fluxo acima é alcançável através de uma estrutura "Factory", similarmente à instanciação de objetos a partir de classes em linguagens orientadas a objetos. Sendo assim, o contrato principal cria uma nova instância e realiza o deploy de um novo contrato ERC721. Porém, dado o tamanho do código de um contrato ERC721 completo, tal alternativa se torna bastante dispendiosa.

Com isso em vista, o [ERC1167](https://eips.ethereum.org/EIPS/eip-1167) trás uma opção mais barata. 

> "De maneira simples e barata, clonar funcionalidades de contrato de
> maneira imutável, esse padrão especifica uma implementação de bytecode
> mínima que delega todas as chamadas para um endereço conhecido e
> fixo."

Dessa maneira, através da manipulação de bytecode o EIP permite que um contrato receba uma chamada  e através de um contrato proxy redirecione essa chamada (juntamente com o gas) para um contrato de implementação. 

Dado isso, é necessário primeiramente do contrato de implementação, pois seu endereço será usado como "forma" para os clones. É importante pontuar que o contrato de implementação não possui construtor pois não há deploy (o construtor é executado no deploy) com a lógica de clonagem. Sendo assim, uma função de inicialização é criada para atuar como uma alternativa ao construtor.

Com o endereço de contratos em mãos, o contrato que recebe as chamada, através de uma função, recebe os dados para inicialização de um novo ERC721 e realiza a clonagem, a qual, por sua vez usa o endereço do contrato de implementação.


## Projeto

O projeto foi realizado utilizando-se o framework Hardhat para testes e deploy. Os scripts sendo feitos com Typescript. Além disso, os contratos da OpenZeppelin foram utilizados.

O arquivo .env.example possui as seguintes variáveis de ambiente, que são necessárias para o deploy e testes.

    PRIVATE_KEY=
    RPC_URL=
    COIN_MKT_CAP_API_KEY=

Todas são utilizadas no *hardhat.config.ts*. A `PRIVATE_KEY` e o `RPC_URL` são utilizados para realizar o deploy. Tendo o projeto usado a Goerli como testnet. Além disso, a `COIN_MKT_CAP_API_KEY` é a chave de API do *Coin Market Cap* utilizada para obter valores de gas e de moedas, úteis para a realização de testes.

Os testes podem ser rodados através do comando. Ele mostrará também o uso de gas e preços.

    npx hardhat test

O deploy é feito com o seguinte comando. Ao não utilizar a flag `--network` o deploy é feito localmente. Atualmente o *hardhat.config.ts* está com a configuração para a Goerli.

    npx hardhat run scripts/Deploy.ts --network Goerli

Para obter o tamanho em Kb dos arquivos, usa-se o comando

    yarn run hardhat size-contracts


