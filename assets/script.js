const select = document.querySelectorAll(".select"); //все выпадающие списки
const button = document.querySelector("button"); // кнопка "оценить"
let txt = document.querySelector(".form__evaluate__txt p"); // коментарий к кнопке
let formEvaluate = document.querySelector(".form__evaluate"); // див, в котором лежит кнопка и комментарий с результатом вычислений
let evaluate = document.querySelector(".form__evaluate__txt"); // див, в котором лежит комментарий
let selectsBrand = document.querySelectorAll('input[name = "singleSelect1"]'); // инпуты списка марок
let selectsOpel = document.querySelectorAll('input[name = "singleSelect6"]'); // инпуты списка моделей опель
let selectsRenault = document.querySelectorAll('input[name = "singleSelect5"]'); // инпуты списка моделей рено
let selectsMazda = document.querySelectorAll('input[name = "singleSelect4"]'); // инпуты списка моделей мазда
let selectsJaguar = document.querySelectorAll('input[name = "singleSelect3"]'); // инпуты списка моделей ягуара
let selectsYear = document.querySelectorAll('input[name = "singleSelect2"]'); // инпуты списка годов выпуска
let state = document.querySelectorAll('input[name = "singleSelect7"]'); // инпуты состояния
let ownersCount = document.querySelectorAll('input[name = "singleSelect8"]'); // инпуты количества владельцев
let owners = document.getElementById('owners'); //див, в котором лежит количество владельцев
let fuel = document.querySelectorAll('input[name = "singleSelect9"]'); // инпуты топливо
let inputPower = document.getElementById("power"); // инпут мощность
let inputEngine = document.getElementById("engine"); // инпут двигатель
let inputMileage = document.getElementById("mileage"); // инпут пробег
let payMethod = document.querySelectorAll('input[name = "singleSelect10"]'); // инпуты методов оплаты
let totalPrice = 0; // стоимость по умолчанию, когда поля не заполнены

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
// активируем список моделей в зависимости от выбранной марки
for (let i = 1; i < selectsBrand.length; i++ ){
    selectsBrand[i].addEventListener('click', evt => {
        let ind = parseInt(evt.target.value) + 1;
        // предварительно очищаем список
        for(let j = 1; j < select.length - 1; j++){
            select[j].hidden = true;
        }
        select[ind].removeAttribute('hidden');
    });
}
//событие при выборе состояния "подержанный"

state.forEach(el => {
    el.addEventListener('click', () => {
        if(state[1].checked == true){
            owners.hidden = false;
        } else {
            owners.hidden = true;
        }
    })
});

// событие при клике на кнопку "оценить"
function getEvaluate(evt) {
    evaluate.innerHTML = ""; 
    evt.preventDefault();

    // проходится по массиву значений списка марок автомобилей и по массиву моделей каждой марки 
    // и устанавливает стартовый вариант цены
    // здесь происходят страшные вещи o_O
    for (const brand of selectsBrand) { 
        if (brand.checked == true) {
            const valueBrand = parseInt(brand.value);
            switch (valueBrand) {
                case 1:
                    for(const model1 of selectsJaguar){
                        if(model1.checked == true){
                            const valueModel = parseInt(model1.value);
                            console.log(valueModel);
                            switch (valueModel){
                                case 1: 
                                console.log("hallo");
                                    totalPrice = 7000;
                                    console.log(totalPrice);
                                    break;
                                case 2:
                                    totalPrice = 6700;
                                    break;
                                case 3: 
                                    totalPrice = 6200;
                                    break;
                                case 4: 
                                    totalPrice = 6000;
                                    break;
                            }
                        }
                    }
                case 2:
                    for(const model of selectsMazda){
                        if(model.checked == true){
                            const valueModel = parseInt(model.value);
                            switch (valueModel){
                                case 1: 
                                    totalPrice = 5900;
                                    break;
                                    console.log(totalPrice);
                                case 2:
                                    totalPrice = 5400;
                                    break;
                                case 3: 
                                    totalPrice = 5000;
                                    break;
                                case 4: 
                                    totalPrice = 4500;
                                    break;
                                    console.log(totalPrice);
                            }
                        }
                    }
                case 3:
                    for(const model of selectsRenault){
                        if(model.checked == true){
                            const valueModel = parseInt(model.value);
                            switch (valueModel){
                                case 1: 
                                    totalPrice = 4500;
                                    break;
                                case 2:
                                    totalPrice = 4200;
                                    break;
                                case 3: 
                                    totalPrice = 3990;
                                    break;
                                case 4: 
                                    totalPrice = 3500;
                                    break;
                            }
                        }
                    }
                case 4 :
                    for(const model of selectsOpel){
                        if(model.checked == true){
                            const valueModel = parseInt(model.value);
                            switch (valueModel){
                                case 1: 
                                    totalPrice = 3000;
                                    break;
                                case 2:
                                    totalPrice = 2500;
                                    break;
                                case 3: 
                                    totalPrice = 2100;
                                    break;
                                case 4: 
                                    totalPrice = 1900;
                                    break;
                            }
                        }
                    }
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

    // проходимся по массиву инпутов состояния
    let ind = 0; //множители для случая, когда пользователь не выбрал ничего
    let ind2 = 0;
    let stateValue = 0;
    state.forEach(el => {
        if(el.checked == true){
            stateValue = parseInt(el.value);
            switch(stateValue){
                case 1: // случай нового состояния
                    ind = stateValue;
                    break;
                case 2: // случай подержанного состояния
                    for(count of ownersCount){
                        if(count.checked == true){
                            let ownerValue = parseFloat(count.value);
                            ind2 = ownerValue;
                            console.log(ownerValue);
                        }
                    }
                    break;
            }
        }
    })
    //меняем стоимость в зависимости от выбранного состояния
    if(stateValue == 2){
    totalPrice *= ind2;
    } else {
    totalPrice *= ind;
    }

    // проходимся по массиву инпутов топлива
    let fuelValue = 0; //множитель для случая, когда пользователь не выбрал ничего
    fuel.forEach(el => {
        if(el.checked == true){
            fuelValue = parseFloat(el.value);
        }
    })
    totalPrice *= fuelValue; //меняем стоимость в зависимости от выбранного вида топлива 

    // проходимся по массиву инпутов методов оплаты
    let paymentValue = 0;//множители для случая, когда пользователь не выбрал ничего
    payMethod.forEach(el => {
        if(el.checked == true){
            paymentValue = parseFloat(el.value);
        }
    })
    totalPrice *= paymentValue; //меняем стоимость в зависимости от выбранного способа оплаты


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
    } else if (engineValue <  3.1 && engineValue > 2.1) {
        x = 0.9;
    } else if (engineValue <= 2.1) {
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
    totalPrice = Math.round(totalPrice * x * k * y, 2); // окончательный расчёт стоимости
    
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
