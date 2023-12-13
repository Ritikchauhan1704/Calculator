function createCalculatorButtons() {
  const buttons_per_row = 8;
  let cnt = 0;

  calculator_buttons.forEach((button) => {
    if (cnt % buttons_per_row == 0) {
      inputElement.innerHTML += `<div class="row"></div>`;
    }

    const row = document.querySelector(".row:last-child");
    row.innerHTML += `<button id="${button.name}">${button.symbol}</button>`;
    cnt++;
  });
}
createCalculatorButtons();
