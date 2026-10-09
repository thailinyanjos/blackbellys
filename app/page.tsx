
import OvelhaCard from "@/components/OvelhaCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5EFE4] p-5">
      <h1 className="mb-2 text-3xl font-bold text-[#5C4033]">
        Meu Rebanho
      </h1>

      <p className="mb-6 text-[#806653]">
        Gerencie suas ovelhas
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <OvelhaCard
          codigo="OV-001"
          nome="Milk Cake"
          raca="Lacaune"
          idade={3}
          peso={68}
          producao={82}
        />

        <OvelhaCard
          codigo="OV-002"
          nome="Francis Dudu"
          raca="East Friesian"
          idade={2}
          peso={64}
          producao={76}
        />

        <OvelhaCard
          codigo="OV-003"
          nome="Reperquilson"
          raca="Bergamácia"
          idade={4}
          peso={72}
          producao={69}
        />

        <OvelhaCard
          codigo="OV-004"
          nome="Adrien"
          raca="Lacaune"
          idade={5}
          peso={70}
          producao={74}
        />
      </div>
    </main>
  );
}