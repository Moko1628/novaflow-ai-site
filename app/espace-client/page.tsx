import ClientPortal from "@/app/components/ClientPortal";

export default function EspaceClientPage() {
  return (
    <div className="pt-24 min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4 max-w-lg mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900">Portail Client NovaFlow AI</h1>
        <p className="text-gray-600 text-sm">
          Connectez-vous pour suivre en temps réel l'exécution de vos agents, consulter vos rapports d'automatisation et échanger avec votre support dédié.
        </p>
        <div className="pt-4">
          <ClientPortal />
        </div>
      </div>
    </div>
  );
}
