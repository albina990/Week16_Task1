const select = document.querySelectorAll(".select") //все выпадающие списки
const button = document.querySelector("button")
let txt = document.querySelector(".form__evaluate__txt p")
let formEvaluate = document.querySelector(".form__evaluate")
let evaluate = document.querySelector(".form__evaluate__txt")
let selectsBrand = document.querySelectorAll('input[name = "singleSelect1"]')
let selectsYear = document.querySelectorAll('input[name = "singleSelect2"]')
let inputPower = document.getElementById("power")
let inputEngine = document.getElementById("engine")
let inputMileage = document.getElementById("mileage")
let totalPrice = 0

//функционал выпадающих списков
for (let j = 0; j < select.length; j++) {
    let currentSelect = select[j]
    const selectedTitle = currentSelect.querySelector(".select__title")
    // Разворачиват список при клике, если он неактивен и сворачивает, если был активен
    selectedTitle.addEventListener("click", () => {
        if ("active" === currentSelect.getAttribute("active")) {
            currentSelect.removeAttribute("active")
        } else {
            currentSelect.setAttribute("active", "active")
        }
    })
    const selectLabels = currentSelect.querySelectorAll(".select__label")
    // активирует опцию и сворачивает список
    for (let i = 0; i < selectLabels.length; i++) {
        selectLabels[i].addEventListener("click", (evt) => {
            selectedTitle.textContent = evt.target.textContent
            currentSelect.removeAttribute("active")
        })
    }
}

// событие при клике на кнопку "оценить"

function getEvaluate(evt) {
    evaluate.innerHTML = ""
    evt.preventDefault()
    for (const brand of selectsBrand) {
        if (brand.checked == true) {
            const valueBrand = parseInt(brand.value)
            console.log(valueBrand)
            switch (valueBrand) {
                case 1:
                    totalPrice = 3000
                    break
                case 2:
                    totalPrice = 2000
                    break
                case 3:
                    totalPrice = 2000
                    break
                case 4:
                    totalPrice = 1500
                    break
                default:
                    totalPrice = 0
            }
        }
    }

    for (const year of selectsYear) {
        if (year.checked == true) {
            const valueYear = year.value
            console.log(valueYear)
            totalPrice = totalPrice * parseFloat(valueYear)
        } 
    }
    console.log(totalPrice)
    const powerValue = Number(inputPower.value)
    const engineValue = Number(inputEngine.value)
    const mileageValue = Number(inputMileage.value)
    console.log(powerValue)

    let k = 0.0
    let x = 0.0
    let y = 0.0
    if (powerValue == 0) {
        k = 0.0
    } else if (powerValue < 10 && powerValue > 5) {
        k = 0.9
    } else if (powerValue <= 5) {
        k = 0.7
    } else {
        k = 1.0
    }

    if (engineValue == 0) {
        x = 0.0
    } else if (engineValue < 10 && engineValue > 5) {
        x = 0.9
    } else if (engineValue <= 5) {
        x = 0.7
    } else {
        x = 1.0
    }

    if (mileageValue == 0) {
        y = 0.0
    } else if (mileageValue < 1000 && mileageValue > 5000) {
        y = 0.9
    } else if (mileageValue <= 5) {
        y = 1.0
    } else {
        y = 0.6
    }
    console.log(totalPrice)
    totalPrice = totalPrice * x * k * y
    console.log(totalPrice)
    let p = document.createElement("p")
    if (totalPrice === 0) {
        p.textContent = `Чтобы получить более точную оценку, заполните все поля`
    } else if (isNaN(powerValue) || isNaN(engineValue) || isNaN(mileageValue)) {
        p.textContent = `Ошибка. Введены некорректные данные`
    } else {
        p.textContent = `Приблизительная стоимость: ${totalPrice} тыс.рублей`
    }
    evaluate.appendChild(p)
}

button.addEventListener("click", getEvaluate)
