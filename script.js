// #region || Adding toggleTheme button to parent (it was created in darkMode.js file before document loaded, in order to prevent white flash)
const toggleThemeBtnParent = document.querySelector("#toggleThemeBtnParent");
toggleThemeBtnParent.appendChild(toggleThemeBtn) // from darkMode.js file
// #endregion

// #region || populate select options || country img refresh || switch button || fetch exchange rate

// fetch list of currencies and populate select tags with currency options
const select = document.querySelectorAll("select");

fetch("https://api.frankfurter.app/currencies")
.then(data => data.json())
.then(data => {
    const currencies = Object.keys(data);
    console.log(currencies)
    for (var i = 0; i < currencies.length; i++) {
        if (currencies[i] == "ILS") {
            select[0].innerHTML += `<option value="${currencies[i]}" selected>${currencies[i]}</option>`;
            select[1].innerHTML += `<option value="${currencies[i]}">${currencies[i]}</option>`;
            continue;
        }
        if (currencies[i] == "USD") {
            select[0].innerHTML += `<option value="${currencies[i]}">${currencies[i]}</option>`;
            select[1].innerHTML += `<option value="${currencies[i]}" selected>${currencies[i]}</option>`;
            continue;
        }
        select[0].innerHTML += `<option value="${currencies[i]}">${currencies[i]}</option>`;
        select[1].innerHTML += `<option value="${currencies[i]}">${currencies[i]}</option>`;
    }
    refreshSelectedImage();
    calculateExchangeRate();
})
.catch(err => {
    console.warn("Something went wrong. Err msg: ", err)
})

// country image refresh function
const countryImage1 = document.querySelector("#countryImage1")
const countryImage2 = document.querySelector("#countryImage2")

function refreshSelectedImage() {
    countryImage1.src = `./flags/${select[0].value}.svg`
    countryImage2.src = `./flags/${select[1].value}.svg`
}

select[0].addEventListener("change", () => {
    refreshSelectedImage();
    calculateExchangeRate();
})

select[1].addEventListener("change", () => {
    refreshSelectedImage();
    calculateExchangeRate();
})

// switch button
const switchBtn = document.querySelector("#switchBtn");
switchBtn.addEventListener("click", () => {
    const temp = select[0].value;
	select[0].value = select[1].value;
	select[1].value = temp;
    refreshSelectedImage();
    calculateExchangeRate();
})

// fetch exchange rate
const exchangeRateElement = document.querySelector("#exchangeRateElement");
const exchangeRateContainer = document.querySelector(".exchangeRateContainer")
exchangeRateContainer.addEventListener("click", calculateExchangeRate)

let exchangeRate = 0.3216

function calculateExchangeRate() {
    console.log("calling")
    if (select[0].value == select[1].value) {
        exchangeRateElement.innerText = 1;
        exchangeRate = 1;
        calculateSalaries(0);
        return;
    }
    fetch(`https://api.frankfurter.app/latest?amount=1&from=${select[0].value}&to=${select[1].value}`)
    .then(resp => resp.json())
    .then(data => {
        // bracket notation accepts string value while dot notation refuses. 
        exchangeRateElement.innerText = data.rates[select[1].value];
        exchangeRate = data.rates[select[1].value];
        calculateSalaries(0);
    })
    .catch(err => {
        console.warn("Something went wrong <2>. Err msg: ", err)
    })
}

// #endregion

// #region || Salary calculator and 2 config settings 
const inputHoursPerDay = document.querySelector("#inputHoursPerDay");
const inputDaysPerWeek = document.querySelector("#inputDaysPerWeek");
const inputArray = document.querySelectorAll(".parent2 input");

let workHoursPerDay = inputHoursPerDay.value;
let workDaysPerWeek = inputDaysPerWeek.value;

inputHoursPerDay.addEventListener("input", () => {
    workHoursPerDay = inputHoursPerDay.value;
    if (inputArray[0].value != "") {
        calculateSalaries(0);
    }
})

inputDaysPerWeek.addEventListener("input", () => {
    workDaysPerWeek = inputDaysPerWeek.value;
    if (inputArray[0].value != "") {
        calculateSalaries(0);
    }
})


for (let i = 0; i < inputArray.length; i++) {
    inputArray[i].addEventListener("input", () => {
        calculateSalaries(i);
    })
}

// i must be index of inputArray.
function calculateSalaries(i) {
    // if input[i] is empty or 0 then turn all other inputs into empty and exit the function.
    if (inputArray[i].value == 0) {
        for (let ii = 0; ii < inputArray.length; ii++) {
            if (i === ii) { continue; }
            inputArray[ii].value = "";
        }
        return;
    }
    // Calculate the value of input[0] in relation to whichever iteration of inputArray we're currently at.
    switch (i) {
        case 0:
            break;
        case 1: // Hourly 2
            inputArray[0].value = (inputArray[i].value / exchangeRate);
            break;
        case 2: // Daily 1
            inputArray[0].value = (inputArray[i].value / workHoursPerDay);
            break;
        case 3: // Daily 2
            inputArray[0].value = (inputArray[i].value / workHoursPerDay / exchangeRate);
            break;
        case 4: // Weekly 1
            inputArray[0].value = (inputArray[i].value / workDaysPerWeek / workHoursPerDay);
            break;
        case 5: // Weekly 2
            inputArray[0].value = (inputArray[i].value / workDaysPerWeek / workHoursPerDay / exchangeRate);
            break;
        case 6: // Monthly 1
            inputArray[0].value = (inputArray[i].value / 4 / workDaysPerWeek / workHoursPerDay);
            break;
        case 7: // Monthly 2
            inputArray[0].value = (inputArray[i].value / 4 / workDaysPerWeek / workHoursPerDay / exchangeRate);
            break;
        case 8: // Yearly 1 
            inputArray[0].value = (inputArray[i].value / 12 / 4 / workDaysPerWeek / workHoursPerDay);
            break;
        case 9: // Yearly 2
            inputArray[0].value = (inputArray[i].value / 12 / 4 / workDaysPerWeek / workHoursPerDay / exchangeRate);
            break;
        default:
            console.warn("expand switch cases.")
    }

    // now that inputArray[0] is calculated, we can calculate the rest of the inputs in relation to it.
    for (let ii = 1; ii < inputArray.length; ii++) {
        if (i === ii) { continue; }
        switch (ii) {
            case 1: // Hourly 2
                inputArray[ii].value = (inputArray[0].value * exchangeRate).toFixed(2);
                break;
            case 2: // Daily 1
                inputArray[ii].value = (inputArray[0].value * workHoursPerDay).toFixed(2);
                break;
            case 3: // Daily 2
                inputArray[ii].value = (inputArray[0].value * workHoursPerDay * exchangeRate).toFixed(2);
                break;
            case 4: // Weekly 1
                inputArray[ii].value = (inputArray[0].value * workDaysPerWeek * workHoursPerDay).toFixed(2);
                break;
            case 5: // Weekly 2
                inputArray[ii].value = (inputArray[0].value * workDaysPerWeek * workHoursPerDay * exchangeRate).toFixed(2);
                break;
            case 6: // Monthly 1
                inputArray[ii].value = (inputArray[0].value * 4 * workDaysPerWeek * workHoursPerDay).toFixed(2);
                break;
            case 7: // Monthly 2
                inputArray[ii].value = (inputArray[0].value * 4 * workDaysPerWeek * workHoursPerDay * exchangeRate).toFixed(2);
                break;
            case 8: // Yearly 1 
                inputArray[ii].value = (inputArray[0].value * 12 * 4 * workDaysPerWeek * workHoursPerDay).toFixed(2);
                break;
            case 9: // Yearly 2
                inputArray[ii].value = (inputArray[0].value * 12 * 4 * workDaysPerWeek * workHoursPerDay * exchangeRate).toFixed(2);
                break;
            default:
                console.warn("expand switch cases.")
        }
    }
    // if current iteration is not inputArray[0], then set it to fixed value after we're done with the calculations,
    // if we do this beforehand then the calculations will be less precise.
    if (i != 0) {
        inputArray[0].value = parseFloat((inputArray[0].value)).toFixed(2);
    }
}
// #endregion