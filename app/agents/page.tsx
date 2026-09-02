import Services from "@/app/components/Services";
import WorkflowSimulator from "@/app/components/WorkflowSimulator";

export default function AgentsPage() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-purple-950 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4">Catalogue des Agents IA</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Découvrez nos agents autonomes prêts à être connectés à vos outils pour automatiser vos processus métier 24h/24.
        </p>
      </div>
      <Services />
      <WorkflowSimulator />
    </div>
  );
}
