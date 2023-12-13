inputElement.addEventListener("click", (event) => {
  const target_btn = event.target;

  calculator_buttons.forEach((button) => {
    if (button.name == target_btn.id) {
      calculator(button);
    }
  });
});

const calculator = (button) => {
  if (button.type == "operator") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
  } else if (button.type == "number") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
  } else if (button.type == "trigo_function") {
    data.operation.push(button.symbol + "(");
    data.formula.push(button.formula);
  } else if (button.type == "math_function") {
    let symbol, formula;

    if (button.name == "factorial") {
      symbol = "!";
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "power") {
      symbol = "^(";
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "square") {
      symbol = "^(";
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);

      data.operation.push("2)");
      data.formula.push("2)");
    } else {
      symbol = button.symbol + "(";
      formula = button.formula + "(";
      data.operation.push(symbol);
      data.formula.push(formula);
    }
  } else if (button.type == "key") {
    if (button.name == "clear") {
      data.operation = [];
      data.formula = [];

      updateOutputResult(0);
    } else if (button.name == "delete") {
      data.operation.pop();
      data.formula.pop();
    } else if (button.name == "rad") {
      RADIAN = true;
      angleToggler();
    } else if (button.name == "deg") {
      RADIAN = false;
      angleToggler();
    }
  } else if (button.type == "calculate") {
    formulaStr = data.formula.join("");

    let powerSearchResult = search(data.formula, POWER);
    let factorialSearchResult = search(data.formula, FACTORIAL);

    // Get power base
    const BASES = powerBaseGetter(data.formula, powerSearchResult);
    // console.log(BASES);
    BASES.forEach((base) => {
      let toReplace = base + POWER;
      let replacement = "Math.pow(" + base + ",";

      formulaStr = formulaStr.replace(toReplace, replacement);
    });

    //Get factorial numbers
    const NUMBERS = factorialNumberGetter(data.formula, factorialSearchResult);
    NUMBERS.forEach((factorial) => {
      formulaStr = formulaStr.replace(
        factorial.toReplace,
        factorial.replacement
      );
    });

    //calculating
    let result;
    try {
      result = eval(formulaStr);
    } catch (error) {
      if (error instanceof SyntaxError) {
        result = "Syntax Error!";
        updateOutputResult(result);
        return;
      }
    }

 
    result = result.toFixed(8);
    if (result == 16331239353195370) result = "∞";
    //Save for later
    ans = result;
    data.operation = [result];
    data.formula = [result];

    updateOutputResult(result);
    return;
  }
  updateOutputOperation(data.operation.join(""));
};

const factorialNumberGetter = (formula, factorialSearchResult) => {
  let numbers = [];

  factorialSearchResult.forEach((factorialIdx) => {
    let number = [];
    let fact_seq = 0;

    let nextIdx = factorialIdx + 1;
    let nextInput = formula[nextIdx];

    if (nextInput == FACTORIAL) {
      fact_seq++;
      return;
    }
    let first_fact_index = factorialIdx - fact_seq;

    let prev_idx = first_fact_index - 1;

    let parenthesis_cnt = 0;

    while (prev_idx >= 0) {
      if (formula[prev_idx] == "(") parenthesis_cnt--;
      if (formula[prev_idx] == ")") parenthesis_cnt++;

      let isOperator = false;
      operators.forEach((OPERATOR) => {
        if (formula[prev_idx] == OPERATOR) isOperator = true;
      });

      if (isOperator && parenthesis_cnt == 0) break;

      number.unshift(formula[prev_idx--]);
    }
    let no_string = number.join("");
    const factorial = "factorial(",
      close_parenthesis = ")";

    let times = fact_seq + 1;

    let toReplace = no_string + FACTORIAL.repeat(times);
    let replacement =
      factorial.repeat(times) + no_string + close_parenthesis.repeat(times);

    numbers.push({
      toReplace: toReplace,
      replacement: replacement,
    });
    fact_seq = 0;
  });
  return numbers;
};
const powerBaseGetter = (formula, powerSearchResult) => {
  let power_bases = [];

  powerSearchResult.forEach((powrIdx) => {
    let base = [];
    let parenthesis_cnt = 0;
    let prev_idx = powrIdx - 1;

    while (prev_idx >= 0) {
      if (formula[prev_idx] == "(") parenthesis_cnt--;
      if (formula[prev_idx] == ")") parenthesis_cnt++;

      let isOperator = false;
      operators.forEach((OPERATOR) => {
        if (formula[prev_idx] == OPERATOR) isOperator = true;
      });

      let isPower = formula[prev_idx] == POWER;

      if ((isOperator && parenthesis_cnt == 0) || isPower) break;

      base.unshift(formula[prev_idx--]);
    }
    power_bases.push(base.join(""));
  });
  return power_bases;
};
const search = (array, keyword) => {
  let search_result = [];

  array.forEach((element, index) => {
    if (element == keyword) {
      search_result.push(index);
    }
  });
  return search_result;
};
const updateOutputOperation = (operation) => {
  outputOperationElement.innerHTML = operation;
};
const updateOutputResult = (result) => {
  outputResultElement.innerHTML = result;
};
