import CaseStudies from "@/app/components/CaseStudies";

export default function SolutionsPage() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4">Solutions par Secteur</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Logistique, commerce, santé, cabinets conseils : découvrez comment NovaFlow AI s'adapte aux spécificités de votre industrie.
        </p>
      </div>
      <CaseStudies />
    </div>
  );
}
