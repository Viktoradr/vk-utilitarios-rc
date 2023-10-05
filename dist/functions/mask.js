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
exports.ValidarCNJ = exports.reduzirTexto = exports.mascararEmail = exports.formatCurrency = exports.mascara_VALOR = exports.mascara_CNJ = exports.mascara_CPFCNPJ = exports.mascara_CNPJ = exports.mascara_CPF = exports.mascara_TEL = exports.mascara_DT = exports.mascara_DTCartao = void 0;
const Util = __importStar(require("./util"));
const mascara_DTCartao = (data) => {
    if (!data || data.trim() == "")
        return "";
    return Util.cleanNumero(data)
        .substring(0, 6)
        .replace(/(\d{2})(\d{4})/gi, "$1/$2");
};
exports.mascara_DTCartao = mascara_DTCartao;
const mascara_DT = (data) => {
    if (!data || data.trim() == "")
        return "";
    return Util.cleanNumero(data)
        .substring(0, 10)
        .replace(/(\d{2})(\d{2})(\d{4})/gi, "$1/$2/$3");
};
exports.mascara_DT = mascara_DT;
const mascara_TEL = (tel) => {
    if (!tel || tel.trim() == "")
        return "";
    return Util.cleanNumero(tel)
        .substring(0, 12)
        .replace(/(\d{2})(\d{8,9})/gi, "($1) $2");
};
exports.mascara_TEL = mascara_TEL;
const mascara_CPF = (cpf) => {
    if (!cpf || cpf.trim() == "")
        return "";
    return Util.cleanNumero(cpf)
        .substring(0, 11)
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/gi, "$1.$2.$3-$4");
};
exports.mascara_CPF = mascara_CPF;
const mascara_CNPJ = (cnpj) => {
    if (!cnpj || cnpj.trim() == "")
        return "";
    return Util.cleanNumero(cnpj)
        .substring(0, 14)
        .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/gi, "$1.$2.$3/$4-$5");
};
exports.mascara_CNPJ = mascara_CNPJ;
const mascara_CPFCNPJ = (cpfcnpj) => {
    if (!cpfcnpj || cpfcnpj.trim() == "")
        return "";
    let str = Util.cleanNumero(cpfcnpj);
    return str.length > 11 ? (0, exports.mascara_CNPJ)(str) : (0, exports.mascara_CPF)(str);
};
exports.mascara_CPFCNPJ = mascara_CPFCNPJ;
const mascara_CNJ = (cnj, valid = false) => {
    if (!cnj || cnj.trim() == "")
        return "";
    let limpo = Util.cleanNumero(cnj).padStart(20, "0");
    let mask = limpo.replace(/(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})/g, "$1-$2.$3.$4.$5.$6");
    if (valid)
        return !(0, exports.ValidarCNJ)(mask) ? cnj : mask;
    return mask;
};
exports.mascara_CNJ = mascara_CNJ;
const mascara_VALOR = (value) => {
    if (Util.isNullOrEmpty(value))
        return "";
    let v = value.split(',');
    let inteiro = Util.cleanNumero(v[0]);
    let decimal = v[1] == null || v[1] == '' ? '00' : v[1];
    value = `${inteiro}.${decimal}`;
    let conversao = new Intl.NumberFormat('pt-BR', { currency: 'BRL' }).format(value);
    if (conversao == 'NaN')
        conversao = "";
    return conversao;
};
exports.mascara_VALOR = mascara_VALOR;
const formatCurrency = (event) => {
    const uy = new Intl
        .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 })
        .format(event.target.value);
    return uy;
};
exports.formatCurrency = formatCurrency;
const mascararEmail = (email) => {
    if (Util.isNullOrEmpty(email))
        return email;
    let v = email.split('@');
    let str1 = v[0].substring(0, 2);
    let str2 = v[1];
    return `${str1}*******@${str2}`;
};
exports.mascararEmail = mascararEmail;
const reduzirTexto = (str, len = 500) => {
    if (Util.isNullOrEmpty(str))
        return "";
    return str.length > len
        ? str.substring(0, len) + "..."
        : str;
};
exports.reduzirTexto = reduzirTexto;
const ValidarCNJ = (NumeroProcesso) => {
    var v = NumeroProcesso.replace("-", ".").split(".");
    var NNNNNNN = Number.parseInt(v[0]);
    var DD = v[1];
    var AAAA = Number.parseInt(v[2]);
    var JTR = Number.parseInt(v[3] + v[4]);
    var OOOO = Number.parseInt(v[5]);
    var Digito = calculo_mod97(NNNNNNN, AAAA, JTR, OOOO);
    return Digito == DD;
};
exports.ValidarCNJ = ValidarCNJ;
const calculo_mod97 = (NNNNNNN, AAAA, JTR, OOOO) => {
    let valor1 = "";
    let resto1 = 0;
    let valor2 = "";
    let resto2 = 0;
    let valor3 = "";
    valor1 = preencher_zero(NNNNNNN, 7);
    resto1 = Number.parseInt(valor1) % 97;
    valor2 =
        preencher_zero(resto1, 2) +
            preencher_zero(AAAA, 4) +
            preencher_zero(JTR, 3);
    resto2 = Number.parseInt(valor2) % 97;
    valor3 = preencher_zero(resto2, 2) + preencher_zero(OOOO, 4) + "00";
    return preencher_zero(98 - (Number.parseInt(valor3) % 97), 2);
};
const preencher_zero = (numero, quantidade) => {
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
