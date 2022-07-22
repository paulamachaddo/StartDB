class Forca {
  vidas;
  letrasChutadas;
  palavra;
  palavraSecretaGuardada;

  constructor(palavraSecreta) {
    this.palavraSecretaGuardada = palavraSecreta.split("");
    this.vidas = 6;
    this.letrasChutadas = [];
    this.palavra = palavraSecreta.split("");
    for (var x = 0; x < this.palavra.length; x++) {
      this.palavra[x] = "_";
    }
  }

  incluirLetraChutada(letra, subtrairVida) {
    if (!this.letrasChutadas.includes(letra)) {
      this.letrasChutadas.push(letra);
      if (subtrairVida) {
        console.log(
          "----------------------------------- teste -----------------"
        );
        this.vidas--;
      }
    }
  }

  chutar(letra) {
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

  buscarEstado() {
    if (this.vidas === 0) {
      return "perdeu";
    } else if (this.vidas > 0 && !this.palavra.includes("_")) {
      return "ganhou";
    }
    return "aguardando chute";
  }

  buscarDadosDoJogo() {
    return {
      letrasChutadas: this.letrasChutadas,
      vidas: this.vidas,
      palavra: this.palavra,
    };
  }
}

module.exports = Forca;
