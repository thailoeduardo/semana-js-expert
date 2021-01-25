// entidade
const EntidadeBase = require("./entidadeBase");

// assert
const assert = require("assert");

// funcionario
const funcionarios = require("./funcionarios");

// Utilitario
const Utilitario = require("./utilitario");

const generos = {
  masculino: "maculino",
  feminino: "feminino",
};

{
  const funcionario = new funcionarios({
    nome: "Thailo",
    sexo: generos.masculino,
  });

  assert.throws(() => funcionario.aniversario, {
    message: "Defina a idade!",
  });
}

const ANO_ATUAL = 2021;
Date.prototype.getFullYear = () => ANO_ATUAL;

{
  const funcionario = new funcionarios({
    nome: "Joãzinho",
    idade: 20,
    sexo: "masculino",
  });

  assert.deepStrictEqual(funcionario.nome, "Senhor Joãzinho");
  assert.deepStrictEqual(funcionario.idade, undefined);
  assert.deepStrictEqual(
    funcionario.pagamento,
    Utilitario.formatoCurrency(5000.45)
  );
  assert.deepStrictEqual(
    funcionario.netPay,
    Utilitario.formatoCurrency(4000.36)
  );

  // throws(() => funcionarios.aniversario, {
  //   message: "preencha a idade!",
  // });

  const ANO_ATUAL = 2001;
  assert.deepStrictEqual(funcionario.aniversario, ANO_ATUAL);

  funcionario.aniversario = new Date().getFullYear() - 80;
  assert.deepStrictEqual(funcionario.aniversario, ANO_ATUAL);

  funcionario.idade = 80;
  assert.deepStrictEqual(funcionario.aniversario, 1941);

  console.log("\n --funcionario--");
}
