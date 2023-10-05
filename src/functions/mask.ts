import * as Util from './util';

export const maskDateCard = (str: string) => {
    return !str || str.trim() == "" ? "" : Util
        .cleanNumber(str)
        .substring(0, 6)
        .replace(/(\d{2})(\d{4})/gi, "$1/$2")
}

export const maskDate = (str: string) => {
    return !str || str.trim() == "" ? "" : Util
        .cleanNumber(str)
        .substring(0, 10)
        .replace(/(\d{2})(\d{2})(\d{4})/gi, "$1/$2/$3")
}

export const maskPhone = (str: string) => {
    return !str || str.trim() == "" ? "" : Util
        .cleanNumber(str)
        .substring(0, 12)
        .replace(/(\d{2})(\d{8,9})/gi, "($1) $2")
}

export const maskCPF = (str: string) => {
    return !str || str.trim() == "" ? "" : Util
        .cleanNumber(str)
        .substring(0, 11)
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/gi, "$1.$2.$3-$4")
}

export const maskCNPJ = (str: string) => {
    return !str || str.trim() == "" ? "" : Util
        .cleanNumber(str)
        .substring(0, 14)
        .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/gi, "$1.$2.$3/$4-$5")
}

export const maskCPFCNPJ = (cpfcnpj: string) => {
    if (!cpfcnpj || cpfcnpj.trim() == "") return ""
    const str = Util.cleanNumber(cpfcnpj)
    return str.length > 11 ? maskCNPJ(str) : maskCPF(str)
}

export const maskCurrency = (num: any, hasFormat = true) => {
    if (num) {
        if (/,/.test(num)) {
            let v = num.split(',')
            let inteiro = Util.cleanNumber(v[0])
            let decimal = v[1] == null || v[1] == '' ? '00' : v[1]
            num = `${inteiro}.${decimal}`
        }
        else {
            let decimal = '00'
            let inteiro = Util.cleanNumber(num)
            num = `${inteiro}.${decimal}`
        }

        if (hasFormat) {
            let intl = Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            });
            const formatado = intl.format(num)
            return formatado === "R$ NaN" ? "" : formatado
        }
        else return num
    }
    return ""
}

export const maskCurrencyIntl = (event: any) => {
    return new Intl
        .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 })
        .format(event.target.value)
}

export const maskEmail = (email: string) => {
    if (Util.isNullOrEmpty(email)) return email
    let v = email.split('@')
    let str1 = v[0].substring(0, 2)
    let str2 = v[1]
    return `${str1}*******@${str2}`
}

export const maskCNJ = (cnj: string, valid = false) => {
    if (!cnj || cnj.trim() == "") return "";
    const mask = Util.cleanNumber(cnj)
        .padStart(20, "0")
        .replace(
        /(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})/g, "$1-$2.$3.$4.$5.$6")

    return valid ? (!validCNJ(mask) ? cnj : mask) : mask
}

const validCNJ = (str: string) => {
    const v = str.replace("-", ".").split(".")

    const NNNNNNN = Number.parseInt(v[0])
    const DD = v[1]
    const AAAA = Number.parseInt(v[2])
    const JTR = Number.parseInt(v[3] + v[4])
    const OOOO = Number.parseInt(v[5])

    const Digito = calculate_mod97(NNNNNNN, AAAA, JTR, OOOO)

    return Digito == DD
}

const calculate_mod97 = (NNNNNNN: number, AAAA: number, JTR: number, OOOO: number) => {
    let valor1 = ""
    let resto1 = 0
    let valor2 = ""
    let resto2 = 0
    let valor3 = ""
    valor1 = fillZero(NNNNNNN, 7)
    resto1 = Number.parseInt(valor1) % 97
    valor2 =
        fillZero(resto1, 2) +
        fillZero(AAAA, 4) +
        fillZero(JTR, 3);
    resto2 = Number.parseInt(valor2) % 97
    valor3 = fillZero(resto2, 2) + fillZero(OOOO, 4) + "00"
    return fillZero(98 - (Number.parseInt(valor3) % 97), 2)
}

const fillZero = (numero: any, quantidade: number) => {
    let temp = numero.toString()
    let retorno = ""
    if (quantidade < temp.length) return temp
    else {
        for (let i = 0; i < quantidade - temp.length; i++) {
            retorno = "0" + retorno;
        }
        return retorno + temp
    }
}