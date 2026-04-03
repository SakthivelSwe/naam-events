import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { getServices } from "@/lib/api";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <section className="section-space">
      <div className="container-shell space-y-10">
        <SectionHeading
          eyebrow="Our Services"
          title="Event support designed for social celebrations and corporate experiences."
          description="Each service is managed with a practical planning approach, polished presentation, and careful attention to guest experience."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

