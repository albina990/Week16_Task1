const select = document.querySelectorAll(".select"); //все выпадающие списки
const button = document.querySelector("button"); // кнопка "оценить"
let txt = document.querySelector(".form__evaluate__txt p"); // коментарий к кнопке
let formEvaluate = document.querySelector(".form__evaluate"); // див, в котором лежит кнопка и комментарий с результатом вычислений
let evaluate = document.querySelector(".form__evaluate__txt"); // див, в котором лежит комментарий
let selectsBrand = document.querySelectorAll('input[name = "singleSelect1"]'); // инпуты первого списка
let selectsYear = document.querySelectorAll('input[name = "singleSelect2"]'); // инпуты второго списка
let inputPower = document.getElementById("power"); // инпут мощность
let inputEngine = document.getElementById("engine"); // инпут двигатель
let inputMileage = document.getElementById("mileage"); // инпут пробег
let totalPrice = 0;

//функционал выпадающих списков
for (let j = 0; j < select.length; j++) {
    let currentSelect = select[j];
    const selectedTitle = currentSelect.querySelector(".select__title");
    // Разворачиват список при клике, если он неактивен и сворачивает, если был активен
    selectedTitle.addEventListener("click", () => {
        if ("active" === currentSelect.getAttribute("active")) {
            currentSelect.removeAttribute("active");
        } else {
            currentSelect.setAttribute("active", "active");
        }
    })
    const selectLabels = currentSelect.querySelectorAll(".select__label");
    // активирует опцию и сворачивает список
    for (let i = 0; i < selectLabels.length; i++) {
        selectLabels[i].addEventListener("click", (evt) => {
            selectedTitle.textContent = evt.target.textContent
            currentSelect.removeAttribute("active");
        })
    }
}

// событие при клике на кнопку "оценить"
function getEvaluate(evt) {
    evaluate.innerHTML = ""; 
    evt.preventDefault();
    // проходится по массиву значений списка марок автомобилей и устанавливает начальную цену
    for (const brand of selectsBrand) { 
        if (brand.checked == true) {
            const valueBrand = parseInt(brand.value);
            console.log(valueBrand);
            switch (valueBrand) {
                case 1:
                    totalPrice = 3000;
                    break;
                case 2:
                    totalPrice = 2000;
                    break;
                case 3:
                    totalPrice = 2000;
                    break;
                case 4:
                    totalPrice = 1500;
                    break;
                default:
                    totalPrice = 0;
            }
        }
    }
 // проходится по массиву значений списка годов выпуска и меняет цену
    for (const year of selectsYear) {
        if (year.checked == true) {
            const valueYear = year.value;
            totalPrice = totalPrice * parseFloat(valueYear);
        } 
    }
    // значения инпутов мощности, объёма двигателя и пробега
    const powerValue = Number(inputPower.value); 
    const engineValue = Number(inputEngine.value);
    const mileageValue = Number(inputMileage.value);

    //коэффициенты умножения полной цены в зависимости от значиний мощности, объёма двигателя и пробега
    let k = 0.0; 
    let x = 0.0;
    let y = 0.0;
    if (powerValue == 0) {
        k = 0.0;
    } else if (powerValue < 10 && powerValue > 5) {
        k = 0.9;
    } else if (powerValue <= 5) {
        k = 0.7;
    } else {
        k = 1.0;
    }

    if (engineValue == 0) {
        x = 0.0;
    } else if (engineValue < 10 && engineValue > 5) {
        x = 0.9;
    } else if (engineValue <= 5) {
        x = 0.7;
    } else {
        x = 1.0;
    }

    if (mileageValue == 0) {
        y = 0.0;
    } else if (mileageValue < 1000 && mileageValue > 5000) {
        y = 0.9;
    } else if (mileageValue <= 5) {
        y = 1.0;
    } else {
        y = 0.6;
    }
    totalPrice = totalPrice * x * k * y; 
    
    //создание комментария с результирующей ценой либо с выводом ошибки
    let p = document.createElement("p");
    if (totalPrice === 0) {
        p.textContent = `Чтобы получить более точную оценку, заполните все поля`;
    } else if (isNaN(powerValue) || isNaN(engineValue) || isNaN(mileageValue)) {
        p.textContent = `Ошибка. Введены некорректные данные`;
    } else {
        p.textContent = `Приблизительная стоимость: ${totalPrice} тыс.рублей`;
    }
    evaluate.appendChild(p);
}

button.addEventListener("click", getEvaluate);
