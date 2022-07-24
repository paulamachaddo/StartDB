/* Achei importante tecer comentários longos explicando como cheguei na lógica de cada 
método utilizado. */

class Forca {
  vidas;
  letrasChutadas;
  palavra;
  palavraSecretaGuardada;

  /* Aqui o construtor chama a palavraSecreta, faz o split e guarda em um array, define a 
  quantidade de vidas inicial do jogo, instancia o array de letrasChutadas, instancia o array
  palavra que recebe a palavraSecreta splitada e já transforma cada posição em "_". 
  Como meu maior conhecimento vem do Java, utilizo um for, sei que existem funções do 
  JavaScript para isso, mas usei o for por estar mais confiante do uso. */

  constructor(palavraSecreta) {
    this.palavraSecretaGuardada = palavraSecreta.split("");
    this.vidas = 6;
    this.letrasChutadas = [];
    this.palavra = palavraSecreta.split("");
    for (var x = 0; x < this.palavra.length; x++) {
      this.palavra[x] = "_";
    }
  }

  /* Função para reutilização, pois esta parte do código é utilizada duas vezes. Como nos dois 
  casos é necessário verificar se a letra consta dentro do array de letrasChutadas, só é feito 
  o push caso ainda não inclua. A diferença entre os casos é de que na primeira verificação, 
  onde a letra é igual a palavraSecretaGuardada[i], não é substraída uma vida, e na segunda, 
  onde o chute está errado, a vida precisa ser subtraída. Como solução é instanciada uma 
  variável boolean chamada subtrairVida, em que caso ela seja true, a vida seja subtraída. */

  incluirLetraChutada(letra, subtrairVida) {
    if (!this.letrasChutadas.includes(letra)) {
      this.letrasChutadas.push(letra);
      if (subtrairVida) {
        this.vidas--;
      }
    }
  }

  /* Primeiro é transformada a letra chutada para minúscula, através do método toLowerCase.
  Caso o tamanho da letra seja igual a 1 é feita a verificação: se palavraSecretaGuardada 
  incluir a letra, ele verifica em qual posição ela se encontra, após encontrar ele faz palavra 
  na posição [i] receber a letra e por fim chama incluirLetraChutada, recebendo como parâmetro 
  a letra e false, para que não seja substraída nenhuma vida. E o chute estiver errado, ele 
  chama o incluirLetraChutada recebendo a letra e true.*/

  chutar(letra) {
    letra = letra.toLowerCase();
    if (letra.length === 1) {
      if (this.palavraSecretaGuardada.includes(letra)) {
        for (let i = 0; i < this.palavraSecretaGuardada.length; i++) {
          if (this.palavraSecretaGuardada[i] === letra) {
            this.palavra[i] = letra;
            this.incluirLetraChutada(letra, false);
          }
        }
      } else {
        this.incluirLetraChutada(letra, true);
      }
    }
  }

  /* Neste método é definido que o estado do jogo muda para "você perdeu" quando vidas for 
  igual a 0, e muda para "você ganhou" quando vidas for maior do que 0 e quando o array
  palavra não incluir mais nenhum "_". Caso nenhum desses seja true, o método apenas retorna
  "aguardando chute". */

  buscarEstado() {
    if (this.vidas === 0) {
      return "perdeu";
    } else if (this.vidas > 0 && !this.palavra.includes("_")) {
      return "ganhou";
    }
    return "aguardando chute";
  }

  /* Por fim, neste método é apenas definido que letrasChutadas recebe this.letrasChutadas, 
  vidas recebe this.vidas e palavra recebe this.palavra, e os dados finais do jogo são 
  definidos.*/

  buscarDadosDoJogo() {
    return {
      letrasChutadas: this.letrasChutadas,
      vidas: this.vidas,
      palavra: this.palavra,
    };
  }
}

module.exports = Forca;
