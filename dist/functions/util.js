"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateArray = exports.getCreditCardType = exports.verificarExtensao = exports.fileTypeIcons = exports.filter = exports.limparNumero = exports.limparString = exports.isCpfValid = exports.isBirthValid = exports.isEmailValid = exports.isDateValid = exports.isNullOrEmpty = exports.isObjectEmpty = exports.queryable = exports.request = exports.newId = void 0;
const uuid_1 = require("uuid");
const newId = () => (0, uuid_1.v4)();
exports.newId = newId;
const request = (url, param, query = false) => {
    if (query)
        url += (0, exports.queryable)(param);
    else
        url += (param !== "" ? "/" + param : "");
    return url;
};
exports.request = request;
const queryable = (obj) => {
    let query = '?';
    Object.keys(obj).forEach(k => query += `${k}=${obj[k]}&`);
    return query.substring(0, query.length - 1);
};
exports.queryable = queryable;
const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};
exports.isObjectEmpty = isObjectEmpty;
const isNullOrEmpty = (str) => {
    return str === undefined || str === null || str === "" || str.trim() == "";
};
exports.isNullOrEmpty = isNullOrEmpty;
const isDateValid = (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateStr.match(regex) === null) {
        return false;
    }
    const date = new Date(dateStr);
    const timestamp = date.getTime();
    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
        return false;
    }
    return date.toISOString().startsWith(dateStr);
};
exports.isDateValid = isDateValid;
const isEmailValid = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
exports.isEmailValid = isEmailValid;
const isBirthValid = (data) => {
    const re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    return re.test(data);
};
exports.isBirthValid = isBirthValid;
const isCpfValid = (cpf) => {
    cpf = cpf.replace(/[\s.-]*/igm, '');
    const re = /(\d)\1{10}/;
    if (re.test(cpf))
        return false;
    var soma = 0;
    var resto;
    for (var i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11))
        resto = 0;
    if (resto != parseInt(cpf.substring(9, 10)))
        return false;
    soma = 0;
    for (var i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11))
        resto = 0;
    if (resto != parseInt(cpf.substring(10, 11)))
        return false;
    return true;
};
exports.isCpfValid = isCpfValid;
const limparString = (str) => {
    if (!str || str.trim() == "")
        return "";
    return str.replace(/\d+$/g, "");
};
exports.limparString = limparString;
const limparNumero = (str) => {
    if (!str || str.trim() == "")
        return "";
    return str.replace(/\D/g, "");
};
exports.limparNumero = limparNumero;
const filter = (value, lista, header) => {
    if (!value || value == "")
        return lista;
    var t = lista.filter((item) => {
        let has = false;
        header.forEach(head => {
            if (item.hasOwnProperty(head.key) && item[head.key] && item[head.key].toLowerCase().includes(value.toLowerCase())) {
                has = true;
            }
        });
        if (has)
            return item;
    });
    return t;
};
exports.filter = filter;
const fileTypeIcons = (ext) => {
    switch (ext) {
        case "txt":
            return "assets/imgs/icones/txt-azul.png";
        case "doc":
            return "assets/imgs/icones/docx-azul.png";
        case "docx":
            return "assets/imgs/icones/docx-azul.png";
        case "pdf":
            return "assets/imgs/icones/pdf-azul.png";
        case "xls":
            return "assets/imgs/icones/xlsx-azul.png";
        case "xlsx":
            return "assets/imgs/icones/xlsx-azul.png";
        case "csv":
            return "assets/imgs/icones/xlsx-azul.png";
        case "ppt":
            return "assets/imgs/icones/ppt-azul.png";
        case "jpeg":
            return "assets/imgs/icones/jpg-azul.png";
        case "jpg":
            return "assets/imgs/icones/jpg-azul.png";
        case "png":
            return "assets/imgs/icones/png-azul.png";
        default:
            return "assets/imgs/icones/pdf-azul.png";
    }
};
exports.fileTypeIcons = fileTypeIcons;
const verificarExtensao = (nome) => {
    let ext = nome.split(".").pop();
    if (ext.search(/xlsx|csv|png|jpeg|jpg|doc|docx|pdf|txt|ppt/) == -1)
        return false;
    else
        return true;
};
exports.verificarExtensao = verificarExtensao;
const getCreditCardType = (accountNumber) => {
    if (/^(636368|655000|655007|506775|504175|5090|65165|65050)/.test(accountNumber))
        return "elo";
    else if (/^5[1-5]/.test(accountNumber))
        return "mastercard";
    else if (/^2[2-7]/.test(accountNumber))
        return "mastercard";
    else if (/^4/.test(accountNumber))
        return "visa";
    else if (/^(34|37)/.test(accountNumber))
        return "amex";
    else if (/^60/.test(accountNumber))
        return "hipercard";
    else
        return "";
};
exports.getCreditCardType = getCreditCardType;
const generateArray = (num) => {
    return Array.from({ length: num }, (_, i) => i + 1);
};
exports.generateArray = generateArray;
