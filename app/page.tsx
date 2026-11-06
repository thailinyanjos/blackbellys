
"use client";

import { useEffect, useState, type FormEvent } from "react";
import OvelhaCard from "@/components/OvelhaCard";

type Ovelha = {
  codigo: string;
  nome: string;
  raca: string;
  idade: number;
  peso: number;
  producao: number;
  vacina: string;
  dataVacina: string;
};

const ovelhasIniciais: Ovelha[] = [
  {
    codigo: "OV-001",
    nome: "Milk Cake",
    raca: "Lacaune",
    idade: 3,
    peso: 68,
    producao: 82,
    vacina: "",
    dataVacina: "",
  },
  {
    codigo: "OV-002",
    nome: "Francis Dudu",
    raca: "East Friesian",
    idade: 2,
    peso: 64,
    producao: 76,
    vacina: "",
    dataVacina: "",
  },
  {
    codigo: "OV-003",
    nome: "Reperquilson",
    raca: "Bergamácia",
    idade: 4,
    peso: 72,
    producao: 69,
    vacina: "",
    dataVacina: "",
  },
  {
    codigo: "OV-004",
    nome: "Adrien",
    raca: "Lacaune",
    idade: 5,
    peso: 70,
    producao: 74,
    vacina: "",
    dataVacina: "",
  },
];

const formularioVazio = {
  codigo: "",
  nome: "",
  raca: "",
  idade: "",
  peso: "",
  producao: "",
  vacina: "",
  dataVacina: "",
};

export default function Home() {
  const [ovelhas, setOvelhas] = useState<Ovelha[]>([]);
  const [carregado, setCarregado] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busca, setBusca] = useState("");
  const [formulario, setFormulario] = useState(formularioVazio);

  // Carregar os dados salvos no navegador
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("meu-rebanho");

    if (dadosSalvos) {
      try {
        const dados = JSON.parse(dadosSalvos);

        if (Array.isArray(dados)) {
          setOvelhas(dados);
        } else {
          setOvelhas(ovelhasIniciais);
        }
      } catch {
        setOvelhas(ovelhasIniciais);
      }
    } else {
      setOvelhas(ovelhasIniciais);
    }

    setCarregado(true);
  }, []);

  // Salvar alterações automaticamente
  useEffect(() => {
    if (carregado) {
      localStorage.setItem(
        "meu-rebanho",
        JSON.stringify(ovelhas)
      );
    }
  }, [ovelhas, carregado]);

  function atualizarCampo(
    campo: keyof typeof formulario,
    valor: string
  ) {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  function cadastrarOvelha(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const codigo = formulario.codigo.trim().toUpperCase();

    if (
      ovelhas.some(
        (ovelha) => ovelha.codigo.toUpperCase() === codigo
      )
    ) {
      alert("Já existe uma ovelha com esse número de cadastro.");
      return;
    }

    const novaOvelha: Ovelha = {
      codigo,
      nome: formulario.nome.trim(),
      raca: formulario.raca.trim(),
      idade: Number(formulario.idade),
      peso: Number(formulario.peso),
      producao: Number(formulario.producao),
      vacina: formulario.vacina.trim(),
      dataVacina: formulario.dataVacina,
    };

    setOvelhas((anterior) => [...anterior, novaOvelha]);

    setFormulario(formularioVazio);
    setMostrarFormulario(false);
  }

  function excluirOvelha(codigo: string) {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta ovelha?"
    );

    if (confirmar) {
      setOvelhas((anterior) =>
        anterior.filter((ovelha) => ovelha.codigo !== codigo)
      );
    }
  }

  const ovelhasFiltradas = ovelhas.filter((ovelha) => {
    const termo = busca.toLowerCase();

    return (
      ovelha.nome.toLowerCase().includes(termo) ||
      ovelha.codigo.toLowerCase().includes(termo) ||
      ovelha.raca.toLowerCase().includes(termo)
    );
  });

  if (!carregado) {
    return (
      <main className="min-h-screen bg-[#F5EFE4] p-5">
        Carregando rebanho...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5EFE4] p-5">

      <div className="mx-auto max-w-6xl">

        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-3xl font-bold text-[#5C4033]">
              Meu Rebanho
            </h1>

            <p className="mt-2 text-[#806653]">
              Gerencie suas ovelhas
            </p>
          </div>

          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="rounded-xl bg-[#79563D] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#5C4033]"
          >
            {mostrarFormulario
              ? "Fechar formulário"
              : "+ Cadastrar Ovelha"}
          </button>

        </div>

        {/* Resumo */}
        <div className="mb-6 rounded-2xl border border-[#E2D2BE] bg-[#FFFCF6] p-5">
          <p className="text-sm text-[#806653]">
            Total de animais cadastrados
          </p>

          <p className="text-3xl font-bold text-[#5C4033]">
            {ovelhas.length}
          </p>
        </div>

        {/* Formulário */}
        {mostrarFormulario && (
          <form
            onSubmit={cadastrarOvelha}
            className="mb-8 rounded-2xl border border-[#E2D2BE] bg-[#FFFCF6] p-6 shadow-sm"
          >

            <h2 className="mb-5 text-2xl font-bold text-[#5C4033]">
              Cadastrar nova ovelha
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              <input
                required
                placeholder="Número de cadastro (Ex: OV-005)"
                value={formulario.codigo}
                onChange={(e) => atualizarCampo("codigo", e.target.value)}
                className="rounded-lg border border-[#E2D2BE] bg-white p-3 outline-none focus:border-[#79563D]"
              />

              <input
                required
                placeholder="Nome da ovelha"
                value={formulario.nome}
                onChange={(e) => atualizarCampo("nome", e.target.value)}
                className="rounded-lg border border-[#E2D2BE] bg-white p-3 outline-none focus:border-[#79563D]"
              />

              <input
                required
                placeholder="Raça"
                value={formulario.raca}
                onChange={(e) => atualizarCampo("raca", e.target.value)}
                className="rounded-lg border border-[#E2D2BE] bg-white p-3 outline-none focus:border-[#79563D]"
              />

              <input
                required
                type="number"
                min="0"
                placeholder="Idade em anos"
                value={formulario.idade}
                onChange={(e) => atualizarCampo("idade", e.target.value)}
                className="rounded-lg border border-[#E2D2BE] bg-white p-3 outline-none focus:border-[#79563D]"
              />

              <input
                required
                type="number"
                min="0"
                step="0.1"
                placeholder="Peso atual (kg)"
                value={formulario.peso}
                onChange={(e) => atualizarCampo("peso", e.target.value)}
                className="rounded-lg border border-[#E2D2BE] bg-white p-3 outline-none focus:border-[#79563D]"
              />

              <input
                required
                type="number"
                min="0"
                step="0.1"
                placeholder="Produção mensal (L)"
                value={formulario.producao}
                onChange={(e) => atualizarCampo("producao", e.target.value)}
                className="rounded-lg border border-[#E2D2BE] bg-white p-3 outline-none focus:border-[#79563D]"
              />

              <input
                placeholder="Última vacina aplicada"
                value={formulario.vacina}
                onChange={(e) => atualizarCampo("vacina", e.target.value)}
                className="rounded-lg border border-[#E2D2BE] bg-white p-3 outline-none focus:border-[#79563D]"
              />

              <input
                type="date"
                value={formulario.dataVacina}
                onChange={(e) => atualizarCampo("dataVacina", e.target.value)}
                className="rounded-lg border border-[#E2D2BE] bg-white p-3 outline-none focus:border-[#79563D]"
              />

            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-[#79563D] px-5 py-3 font-bold text-white transition hover:bg-[#5C4033]"
            >
              Salvar Ovelha
            </button>

          </form>
        )}

        {/* Pesquisa */}
        <input
          type="text"
          placeholder="Pesquisar por nome, cadastro ou raça..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="mb-6 w-full rounded-xl border border-[#E2D2BE] bg-[#FFFCF6] p-4 text-[#5C4033] outline-none focus:border-[#79563D]"
        />

        {/* Cards */}
        {ovelhasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {ovelhasFiltradas.map((ovelha) => (
              <OvelhaCard
                key={ovelha.codigo}
                {...ovelha}
                onExcluir={excluirOvelha}
              />
            ))}

          </div>
        ) : (
          <div className="rounded-2xl bg-[#FFFCF6] p-10 text-center">
            <h2 className="text-xl font-bold text-[#5C4033]">
              Nenhuma ovelha encontrada
            </h2>

            <p className="mt-2 text-[#806653]">
              Cadastre uma nova ovelha ou tente outra pesquisa.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
