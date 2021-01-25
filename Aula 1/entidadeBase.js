class entidadeBase {
  #nome;
  #idade;
  #sexo;

  constructor({ nome, idade, sexo }) {
    this.#nome = nome;
    this.#idade = idade;
    this.#sexo = sexo;
  }

  get nome() {
    const prefix = this.#sexo === "masculino" ? "Senhor" : "Senhora";
    return `${prefix} ${this.#nome}`;
  }

  get aniversario() {
    if (!this.#idade) {
      throw new Error("Defina a idade!");
    }
    return new Date().getFullYear - this.#idade;
  }

  set idade(valor) {
    this.#idade = valor;
  }

  //
}

module.exports = entidadeBase;
