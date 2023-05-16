const form = document.querySelector("#form");

const inputs = [
    document.querySelector("#name"),
    document.querySelector("#surname"),
    document.querySelector("#email"),
    document.querySelector("#password"),
    document.querySelector("#passwordConfirm")
];

const alertHtml = document.querySelector("#alert");

form.addEventListener("submit", (event) => submit(event));

function init() {
    for (let item of inputs) {
        item.style.outline = "none";
        if (item.id != "email" && item.id != "password" && item.id != "passwordConfirm") {
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
    }

}

function comparePass(confirm) {
    const pass = document.querySelector("#password");
    if (pass.value === confirm.value && confirm.value.length > 0) {
        return true;
    } 
    return false;
}

function submit(event) {
    event.preventDefault();
    let validation = [];
    for (let item of inputs) {
        if (item.id != "email" && item.id != "password" && item.id != "passwordConfirm") {
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

function showAlert() {
    alertHtml.style.display = "flex";
    setTimeout(() => alertHtml.style.display = "none", 3000);  
}

function error(cond, item) {
    if (!cond) {
        item.style.border = "1px solid red";
    } else {
        item.style.border = "solid 1px #272727";
    }
}

function required(value) {
    if (value.value.length < 5) {
        return false;
    }
    return true;
}

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

function validadePass(pass) {
    if (pass.value.length < 6) {
        return false;
    }
    if (pass.value.length > 8) {
        return false;
    }
    return true;
}

init();