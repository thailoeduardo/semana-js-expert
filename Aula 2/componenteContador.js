// IIFE
(() => {
  const BTN_REINICIAR = "btnReiniciar";
  const ID_CONTADOR = "contador";
  const VALOR_CONTADOR = 10;
  const PERIODO_INTERVALO = 1000;

  class ComponenteContador {
    //
    constructor() {
      this.inicializarComponente();
    }

    //
    prepararContadorProxy() {
      const escutador = {
        set: (contextoAtual, propriedadeChave, novoValor) => {
          console.log({ contextoAtual, propriedadeChave, novoValor });

          if (!contextoAtual.valor) {
            contextoAtual.efetuarParada();
          }

          contextoAtual[propriedadeChave] = novoValor;
          return true;
        },
      };

      const contador = new Proxy(
        {
          valor: VALOR_CONTADOR,
          efetuarParada: () => {},
        },
        escutador
      );

      return contador;
    }

    //
    atualizarTextoContadorHTML = ({ domElementoContador, contador }) => () => {
      const identificadorTexto = "$contador";
      const textoPadrao = `Começando em <b>${identificadorTexto}</b> segundos!`;
      domElementoContador.innerHTML = textoPadrao.replace(
        identificadorTexto,
        contador.valor--
      );
    };

    //
    agendarContador({ domElementoContador, idIntervalo }) {
      return () => {
        clearInterval(idIntervalo);

        domElementoContador.innerHTML = "";
        this.desabilitarBotaoReiniciar(false);
      };
    }

    //
    prepararBotaoDeReiniciar(domElementoBotao, iniciarFuncao) {
      domElementoBotao.addEventListener("click", iniciarFuncao.bind(this));
      return (valor = true) => {
        const atributoBotao = "disabled";
        domElementoBotao.removeEventListener("click", iniciarFuncao.bind(this));

        if (valor) {
          domElementoBotao.setAttribute(atributoBotao, valor);
          return;
        }

        domElementoBotao.removeAttribute(atributoBotao);

        //
      };
    }

    //
    inicializarComponente() {
      console.log("Componente contador iniciado!");

      const domElementoContador = document.getElementById(ID_CONTADOR);
      const contador = this.prepararContadorProxy();
      // contador.valor = 100;
      // contador.valor = 90;
      // contador.valor = 80;

      const argumentosContadorHTML = {
        domElementoContador,
        contador,
      };

      // this.atualizarTextoHTML(argumentosAtulizacaoHTML);
      // this.atualizarTextoHTML(argumentosAtulizacaoHTML);
      // this.atualizarTextoHTML(argumentosAtulizacaoHTML);

      const fn = this.atualizarTextoContadorHTML(argumentosContadorHTML);

      const idIntervalo = setInterval(fn, PERIODO_INTERVALO);

      {
        const domElementoBotaoReiniciar = document.getElementById(
          BTN_REINICIAR
        );

        const desabilitarBotaoReiniciar = this.prepararBotaoDeReiniciar(
          domElementoBotaoReiniciar,
          this.inicializarComponente
        );

        desabilitarBotaoReiniciar();

        const argumentosContadorHTML = {
          domElementoContador,
          idIntervalo,
        };

        //const desabilitarBotao = () => console.log("Botão desabilitado!");

        const pararContadorFn = this.agendarContador.apply(
          { desabilitarBotaoReiniciar },
          [argumentosContadorHTML]
        );

        contador.efetuarParada = pararContadorFn;
      }

      //
    }

    //
  }

  window.ComponenteContador = ComponenteContador;

  //
})();
