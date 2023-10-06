"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskCNJ = exports.maskEmail = exports.maskCurrencyIntl = exports.maskCurrency = exports.maskCPFCNPJ = exports.maskCNPJ = exports.maskCPF = exports.maskPhone = exports.maskDate = exports.maskDateCard = void 0;
const Util = __importStar(require("./util"));
const maskDateCard = (str) => {
    return !str || str.trim() == "" ? "" : Util
        .cleanNumber(str)
        .substring(0, 6)
        .replace(/(\d{2})(\d{4})/gi, "$1/$2");
};
exports.maskDateCard = maskDateCard;
const maskDate = (str) => {
    return !str || str.trim() == "" ? "" : Util
        .cleanNumber(str)
        .substring(0, 10)
        .replace(/(\d{2})(\d{2})(\d{4})/gi, "$1/$2/$3");
};
exports.maskDate = maskDate;
const maskPhone = (str) => {
    return !str || str.trim() == "" ? "" : Util
        .cleanNumber(str)
        .substring(0, 12)
        .replace(/(\d{2})(\d{8,9})/gi, "($1) $2");
};
exports.maskPhone = maskPhone;
const maskCPF = (str) => {
    return !str || str.trim() == "" ? "" : Util
        .cleanNumber(str)
        .substring(0, 11)
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/gi, "$1.$2.$3-$4");
};
exports.maskCPF = maskCPF;
const maskCNPJ = (str) => {
    return !str || str.trim() == "" ? "" : Util
        .cleanNumber(str)
        .substring(0, 14)
        .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/gi, "$1.$2.$3/$4-$5");
};
exports.maskCNPJ = maskCNPJ;
const maskCPFCNPJ = (cpfcnpj) => {
    if (!cpfcnpj || cpfcnpj.trim() == "")
        return "";
    const str = Util.cleanNumber(cpfcnpj);
    return str.length > 11 ? (0, exports.maskCNPJ)(str) : (0, exports.maskCPF)(str);
};
exports.maskCPFCNPJ = maskCPFCNPJ;
const maskCurrency = (num, hasFormat = true) => {
    if (num) {
        if (/,/.test(num)) {
            let v = num.split(',');
            let inteiro = Util.cleanNumber(v[0]);
            let decimal = v[1] == null || v[1] == '' ? '00' : v[1];
            num = `${inteiro}.${decimal}`;
        }
        else {
            let decimal = '00';
            let inteiro = Util.cleanNumber(num);
            num = `${inteiro}.${decimal}`;
        }
        if (hasFormat) {
            let intl = Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            });
            const formatado = intl.format(num);
            return formatado === "R$ NaN" ? "" : formatado;
        }
        else
            return num;
    }
    return "";
};
exports.maskCurrency = maskCurrency;
const maskCurrencyIntl = (event) => {
    return new Intl
        .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 })
        .format(event.target.value);
};
exports.maskCurrencyIntl = maskCurrencyIntl;
const maskEmail = (email) => {
    if (Util.isNullOrEmpty(email))
        return email;
    let v = email.split('@');
    let str1 = v[0].substring(0, 2);
    let str2 = v[1];
    return `${str1}*******@${str2}`;
};
exports.maskEmail = maskEmail;
const maskCNJ = (cnj, valid = false) => {
    if (!cnj || cnj.trim() == "")
        return "";
    const mask = Util.cleanNumber(cnj)
        .padStart(20, "0")
        .replace(/(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})/g, "$1-$2.$3.$4.$5.$6");
    return valid ? (!validCNJ(mask) ? cnj : mask) : mask;
};
exports.maskCNJ = maskCNJ;
const validCNJ = (str) => {
    const v = str.replace("-", ".").split(".");
    const NNNNNNN = Number.parseInt(v[0]);
    const DD = v[1];
    const AAAA = Number.parseInt(v[2]);
    const JTR = Number.parseInt(v[3] + v[4]);
    const OOOO = Number.parseInt(v[5]);
    const Digito = calculate_mod97(NNNNNNN, AAAA, JTR, OOOO);
    return Digito == DD;
};
const calculate_mod97 = (NNNNNNN, AAAA, JTR, OOOO) => {
    let valor1 = "";
    let resto1 = 0;
    let valor2 = "";
    let resto2 = 0;
    let valor3 = "";
    valor1 = fillZero(NNNNNNN, 7);
    resto1 = Number.parseInt(valor1) % 97;
    valor2 =
        fillZero(resto1, 2) +
            fillZero(AAAA, 4) +
            fillZero(JTR, 3);
    resto2 = Number.parseInt(valor2) % 97;
    valor3 = fillZero(resto2, 2) + fillZero(OOOO, 4) + "00";
    return fillZero(98 - (Number.parseInt(valor3) % 97), 2);
};
const fillZero = (numero, quantidade) => {
    let temp = numero.toString();
    let retorno = "";
    if (quantidade < temp.length)
        return temp;
    else {
        for (let i = 0; i < quantidade - temp.length; i++) {
            retorno = "0" + retorno;
        }
        return retorno + temp;
    }
};
