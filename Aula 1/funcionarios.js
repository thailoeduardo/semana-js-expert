const EntidadeBase = require("./entidadeBase");
const Utilitario = require("./utilitario");

class funcionario extends EntidadeBase {
  static #TAXA_PERCENTUAL = 0.2;
  #pagamento = 5000.45;

  get pagamento() {
    return Utilitario.formatoCurrency(this.#pagamento);
  }

  get netPay() {
    const resultado =
      this.#pagamento - this.#pagamento * funcionario.#TAXA_PERCENTUAL;

    return Utilitario.formatoCurrency(resultado);
  }

  //
}
module.exports = funcionario;
