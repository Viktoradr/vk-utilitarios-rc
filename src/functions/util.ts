import { v4 as uuidv4 } from 'uuid';

export const newId = () => uuidv4()

export const queryable = (obj: any) => {
    let query = '?'
    Object.keys(obj).forEach(k => query += `${k}=${obj[k]}&`)
    return query.substring(0, query.length - 1)
}

export const isObjectEmpty = (obj: any) => Object.keys(obj).length === 0

export const isNullOrEmpty = (value: any | string | number): boolean => {
    if (value === undefined || value === null || value === "") return true
    else {
        if (typeof(value) == 'string') return value.trim() == ""
        else return false
    }
    // const verificador = (type: string) => {
    //     if (typeof(type) == 'string') return type.trim() == ""
    //     else return false
    // }

    // const result = !value 
    // || value == "undefined" 
    // || value == null 
    // || value === null 
    // || value == "null" 
    // || value == "" 
    // || value === "";

    // return result ? true : verificador(typeof value)
}

export const isDateValid = (dateStr: any): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/

    if (dateStr.match(regex) === null) {
        return false
    }

    const date = new Date(dateStr)

    const timestamp = date.getTime()

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
        return false
    }

    return date.toISOString().startsWith(dateStr)
}

export const isEmailValid = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

export const isBirthValid = (data: string): boolean => {
    const re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    return re.test(data)
}

export const isCpfValid = (cpf: string): boolean => {
    cpf = cpf.replace(/[\s.-]*/igm, '')

    const re = /(\d)\1{10}/

    if (re.test(cpf)) return false

    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }

    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(9, 10))) return false
    soma = 0
    for (var i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }

    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(10, 11))) return false
    return true
}

export const generateArray = (num: number) => Array.from({ length: num }, (_, i) => i + 1)

export const cleanString = (str: string): string => !str || str.trim() == "" ? "" : str.replace(/\d+$/g, "")

export const cleanNumber = (str: string): string => !str || str.trim() == "" ? "" : str.replace(/\D/g, "")

export const filter = (value: any, lista: any[], header: any[]): any[] => {
    if (!value || value == "") return lista

    var t = lista.filter((item: any) => {
        let has = false

        header.forEach(head => {
            if (item.hasOwnProperty(head.key) && item[head.key] && item[head.key].toLowerCase().includes(value.toLowerCase())) {
                has = true
            }
        })

        if (has) return item
    })
    return t
}

export const getCreditCardType = (accountNumber: any) => {
    if (
        /^(636368|655000|655007|506775|504175|5090|65165|65050)/.test(
            accountNumber
        )
    ) return "elo";
    else if (/^5[1-5]/.test(accountNumber)) return "mastercard";
    else if (/^2[2-7]/.test(accountNumber)) return "mastercard";
    else if (/^4/.test(accountNumber)) return "visa";
    else if (/^(34|37)/.test(accountNumber)) return "amex";
    else if (/^60/.test(accountNumber)) return "hipercard";
    else return ""
}

export const reduceText = (str: string, len: number = 500) => {
    return isNullOrEmpty(str) ? "" : str.length > len
        ? str.substring(0, len) + "..."
        : str
}