# inf1407

## Aluno: Yuri Zoel Brasil
## Matricula: 1710730

### Relatório

Este projeto está sendo servido via S3 [nesta url](http://pessoal-yuri-brasil-publico.s3-website-us-east-1.amazonaws.com).

- O usuário é recebido com uma tela inicial para inserir o seu e-mail
- Após a confirmação do e-mail, o usuário é enviado para a tela principal do jogo
- Na tela principal, o usuário poderá escolher uma categoria da palavra à ser adivinhada
- Após escolher a categoria, o usuário terá que adivinhar a palavra secreta, em inglês
- O usuário pode errar até 6 vezes antes de perder o jogo
- Caso o usuário perca, a palavra secreta é revelada
- Após adivinhar a palavra ou perder, o jogador pode jogar novamente
- O usuário deve utilizar o mouse para interagir com as letras ainda disponíveis

### Notas de implementação
- Foi preciso adicionar um setTimeout antes das verificações de vitória e derrota, pois a alteração da imagem e letras escondidas, que deveria ocorrer antes do alert, não estavam ocorrendo.