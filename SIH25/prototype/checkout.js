
document.addEventListener("DOMContentLoaded", () => {
  const steps = [
    { title: "Harvested", date: "Aug 15, 2025" },
    { title: "Processed", date: "Aug 17, 2025" },
    { title: "Shipped", date: "Aug 19, 2025" },
    { title: "In Store", date: "Aug 22, 2025" }
  ];

  let currentStep = 0;
  const stepDiv = document.getElementById("journey-step");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  function renderStep(index) {
    const step = steps[index];
    stepDiv.innerHTML = `
      <h3>${step.title}</h3>
      <p>${step.date}</p>
    `;
  }

  prevBtn.addEventListener("click", () => {
    currentStep = (currentStep - 1 + steps.length) % steps.length;
    renderStep(currentStep);
  });

  nextBtn.addEventListener("click", () => {
    currentStep = (currentStep + 1) % steps.length;
    renderStep(currentStep);
  });

  renderStep(currentStep);
});
