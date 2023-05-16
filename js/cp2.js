// pegando a tag form e o component dig com id alert no HMTL
const form = document.querySelector("#form");
const alertHtml = document.querySelector("#alert");


// settando o darkmode para false
let mode = false;


// Armazenando os principais botões e inputs em um array para o código não ficar repetitivo
const inputs = [
    document.querySelector("#name"),
    document.querySelector("#surname"),
    document.querySelector("#email"),
    document.querySelector("#password"),
    document.querySelector("#passwordConfirm"),
    document.querySelector("#mode-btn")
];


// Armazenando os elementos que sofreram alteração no darkmode ou lightmode
const elements = [
    document.querySelector("#form-div"),
    ...document.querySelectorAll("input"),
    document.querySelector("h2")
]


// adicionando o event de submit no form que executa a função de submut
form.addEventListener("submit", (event) => submit(event));


// funcção de init para adicionar os devidos eventos para cada elemento dentro do array inputs
function init() {
    light();
    for (let item of inputs) {
        item.style.outline = "none";
        if (item.nodeName === "INPUT") addFocus(item);
        if (item.id === "name" || item.id === "surname") {
            item.addEventListener("keyup", () => {
                const cond = required(item);
                error(cond, item);
            });
        }
        if (item.id === "email") {
            item.addEventListener("keyup", () => {
                const cond = validateEmail(item);
                error(cond, item);
            });
        }
        if (item.id === "password" || item.id === "passwordConfirm") {
            if (item.id === "password") {
                item.addEventListener("keyup", () => {
                    const cond = validadePass(item);
                    error(cond, item);
                });
            } else {
                item.addEventListener("keyup", () => {
                    const cond = comparePass(item);
                    error(cond, item);
                })
            }
        }
        if (item.id === "mode-btn") {
            item.addEventListener("click", () => changeMode(item))
        }
    }
}


// função para mudar o darkmode ou lightmode
function changeMode(item) {
    const icon = item.querySelector("img");
    const text = item.querySelector("p");
    const body = document.querySelector("body");
    console.log(icon, text)
    if (mode === false) {
        body.style.backgroundColor = "#001025";
        icon.src = "./img/moon.png";
        text.innerText = "Escuro";
        mode = true;
        dark();
    } else {
        body.style.background = "#f0f0f0";
        icon.src = "./img/sun.png";
        text.innerText = "Claro";
        mode = false
        light();
    }
}


// função para comparar as senhas
function comparePass(confirm) {
    const pass = document.querySelector("#password");
    if (pass.value === confirm.value && confirm.value.length > 0) {
        return true;
    }
    return false;
}


// função de submit do formulário
function submit(event) {
    event.preventDefault();
    let validation = [];
    for (let item of inputs) {
        if (item.id === "name" || item.id === "surname") {
            const cond = required(item);
            error(cond, item);
            validation.push(cond);
        }
        if (item.id === "email") {
            const cond = validateEmail(item);
            error(cond, item);
            validation.push(cond);
        }
        if (item.id === "password" || item.id === "passwordConfirm") {
            if (item.id === "password") {
                const cond = validadePass(item);
                error(cond, item);
                validation.push(cond);
            } else {
                const cond = comparePass(item);
                error(cond, item);
                validation.push(cond);
            }
        }
    }
    // validando se tem algúm campo inválido
    if (validation.includes(false)) {
        if (alertHtml.style.display === "" || alertHtml.style.display === "none") showAlert();
    } else {
        inputs.forEach(element => element.value = "");
    }
}


// função que faz com que o campo fique com a borda vermelha
function error(cond, item) {
    if (!cond) {
        item.classList.add("input-error");
    } else {
        item.classList.remove("input-error");
    }
}


// função que torna o campo obridatório no html
function required(value) {
    if (value.value.length < 5) {
        return false;
    }
    return true;
}


// função para validar o campo de email
function validateEmail(email) {
    // validando o @
    if (!email.value.includes("@")) {
        return false;
    }
    if (email.value.length < 5) {
        return false;
    }
    return true;
}


// função para validar a senha
function validadePass(pass) {
    if (pass.value.length < 6) {
        return false;
    }
    if (pass.value.length > 8) {
        return false;
    }
    return true;
}


// função de fazer o alerta aparecer na tela
function showAlert() {
    alertHtml.style.transform = "scale(1)";
    setTimeout(() => alertHtml.style.transform = "scale(0)", 3000);
}


function light() {
    elements.forEach(element => {
        if (element.nodeName === "INPUT") {
            if (element.classList.contains("dark")) element.classList.remove("dark");
            element.classList.add("light");
        }
        if (element.nodeName === "H2") {
            element.style.color = "#000811";
        }
        if (element.nodeName === "DIV") {
            if (element.classList.contains("dark-card")) element.classList.remove("dark-card");
            element.classList.add("light-card");
        }
    })
}

function dark() {
    elements.forEach(element => {
        if (element.nodeName === "INPUT") {
            if (element.classList.contains("light")) element.classList.remove("light");
            element.classList.add("dark");
        }
        if (element.nodeName === "H2") {
            element.style.color = "#D9D9D9";
        }
        if (element.nodeName === "DIV") {
            if (element.classList.contains("light-card")) element.classList.remove("light-card");
            element.classList.add("dark-card");
        }
    })
}


function addFocus(item) {
    item.addEventListener("focus", () => {
        item.classList.add("input-focus")
    })
    item.addEventListener("blur", () => {
        item.classList.remove("input-focus")
    })
}


// chamando a função de init 
init();