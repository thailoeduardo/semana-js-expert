const { builtinModules } = require("module");

class Utilitario {
  static #formatoPadrao = Intl.NumberFormat("pt-br", {
    currency: "BRL",
    style: "currency",
  });

  static formatoCurrency(value) {
    return this.#formatoPadrao.format(value);
  }

  //
}

module.exports = Utilitario;
