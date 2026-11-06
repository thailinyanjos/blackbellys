
type OvelhaCardProps = {
  codigo: string;
  nome: string;
  raca: string;
  idade: number;
  peso: number;
  producao: number;
  vacina: string;
  dataVacina: string;
  onExcluir: (codigo: string) => void;
};

export default function OvelhaCard({
  codigo,
  nome,
  raca,
  idade,
  peso,
  producao,
  vacina,
  dataVacina,
  onExcluir,
}: OvelhaCardProps) {
  return (
    <div className="w-full rounded-2xl border border-[#E2D2BE] bg-[#FFFCF6] p-6 shadow-sm">

      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#8B6348]">
            {codigo}
          </span>

          <h2 className="text-2xl font-bold text-[#5C4033]">
            {nome}
          </h2>

          <p className="text-sm text-[#806653]">
            Raça: {raca}
          </p>
        </div>

        <span className="rounded-full bg-[#E8D7C3] px-3 py-1 text-xs font-semibold text-[#65452F]">
          Ativa
        </span>
      </div>

      <hr className="my-5 border-[#E8DCCB]" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

        <div className="rounded-lg bg-[#F3E9DA] p-3">
          <p className="text-[10px] text-[#806653]">IDADE</p>
          <p className="font-bold text-[#5C4033]">
            {idade} anos
          </p>
        </div>

        <div className="rounded-lg bg-[#F3E9DA] p-3">
          <p className="text-[10px] text-[#806653]">PESO</p>
          <p className="font-bold text-[#5C4033]">
            {peso} kg
          </p>
        </div>

        <div className="rounded-lg bg-[#F3E9DA] p-3">
          <p className="text-[10px] text-[#806653]">
            PRODUÇÃO NO MÊS
          </p>
          <p className="font-bold text-[#5C4033]">
            {producao} L
          </p>
        </div>

      </div>

      <div className="mt-4 rounded-lg bg-[#F3E9DA] p-3">
        <p className="text-[10px] font-semibold text-[#806653]">
          VACINAÇÃO
        </p>

        <p className="font-bold text-[#5C4033]">
          {vacina || "Não informada"}
        </p>

        <p className="text-xs text-[#806653]">
          {dataVacina
            ? `Data: ${dataVacina}`
            : "Sem data registrada"}
        </p>
      </div>

      <button
        onClick={() => onExcluir(codigo)}
        className="mt-5 w-full rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
      >
        Excluir cadastro
      </button>

    </div>
  );
}
