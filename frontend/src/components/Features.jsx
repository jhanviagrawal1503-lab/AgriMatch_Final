const features = [
  {
    title: "🌾 Smart Crop Recommendations",
    description:
      "AI suggests the best crops based on market demand and conditions.",
  },
  {
    title: "🤝 Direct Farmer-Buyer Connection",
    description:
      "Connect directly with buyers without unnecessary middlemen.",
  },
  {
    title: "📈 AI Price Prediction",
    description:
      "Predict crop prices using machine learning for better profits.",
  },
];

function Features() {
  return (
    <section>
      <h2>Why Choose AgriMatch?</h2>

      {features.map((feature) => (
        <div key={feature.title}>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
}

export default Features;