const select = document.querySelectorAll(".select"); //все выпадающие списки


//функционал выпадающих списков
for(let j = 0; j < select.length; j++) {
    let currentSelect = select[j];
    const selectedTitle = currentSelect.querySelector(".select__title");
    // Разворачиват список при клике, если он неактивен и сворачивает, если был активен
    selectedTitle.addEventListener("click", () => {
        if ("active" === currentSelect.getAttribute("active")) {
            currentSelect.removeAttribute("active")
        } else {
            currentSelect.setAttribute("active", "active")
        }
    })
    const selectLabels = currentSelect.querySelectorAll(".select__label");
    // активирует опцию и сворачивает список
    for (let i = 0; i < selectLabels.length; i++) {
        selectLabels[i].addEventListener("click", (evt) => {
            selectedTitle.textContent = evt.target.textContent;
            currentSelect.removeAttribute("active")
        })
    }
};


// расчёт

// событие при клике на кнопку "оценить"
const button = document.querySelector('button');
const txt = document.querySelector('.form__evaluate p');
let evaluate = document.querySelector('.form__evaluate');

function getEvaluate(evt){
    evt.preventDefault();
    txt.hidden = true;
    let p = document.createElement('p');
    p.textContent = `Приблизительная стоимость: ${555} тыс.рублей`;
    evaluate.appendChild(p);
    button.removeEventListener('click', getEvaluate);
}

button.addEventListener('click', getEvaluate);