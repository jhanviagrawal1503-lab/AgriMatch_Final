const steps = [
  {
    number: "1️⃣",
    title: "Farmer Uploads Crop",
    description: "Farmers upload crop details and quantity."
  },
  {
    number: "2️⃣",
    title: "AI Predicts Price",
    description: "Our ML model predicts a fair market price."
  },
  {
    number: "3️⃣",
    title: "Buyer Browses Listings",
    description: "Buyers search and compare available crops."
  },
  {
    number: "4️⃣",
    title: "Deal Confirmed",
    description: "Farmer and buyer connect to complete the sale."
  }
];

function HowItWorks() {
  return (
    <section>
      <h2>How AgriMatch Works</h2>

      {steps.map((step) => (
        <div key={step.number}>
          <h3>{step.number} {step.title}</h3>
          <p>{step.description}</p>
        </div>
      ))}
    </section>
  );
}

export default HowItWorks;