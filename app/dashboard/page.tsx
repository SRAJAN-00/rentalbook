import DashboardLayout from "../components/DashboardLayout";
import DashboardContent from "../components/DashboardContent";

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Welcome back! Here's what's happening with your reading journey."
    >
      <DashboardContent />
    </DashboardLayout>
  );
}
