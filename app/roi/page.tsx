import ROICalculator from "@/app/components/ROICalculator";
import AuditEstimator from "@/app/components/AuditEstimator";

export default function ROIPage() {
  return (
    <div className="pt-20">
      <ROICalculator />
      <AuditEstimator />
    </div>
  );
}
