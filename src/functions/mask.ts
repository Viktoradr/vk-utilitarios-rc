import { MaskType } from '../types/mask.type';
import * as Util from './util';

export const convertToMask = (value: string | number, type: MaskType): string | number => {
    switch (type) {
        case 'CNPJ':
        return maskCNPJ(value.toString());
        case 'CPF':
            return maskCPF(value.toString());
        case 'CPFCNPJ':
            return maskCPFCNPJ(value.toString())
        case 'CNJ':
            return maskCNJ(value.toString())
        case 'MONEY':
            return maskCurrency(value.toString())
        case 'CEP':
            return maskCep(value.toString())
        case 'PHONE':
            return maskPhone(value.toString())
        default:
            return value
    }
}

export const maskDateCard = (str: string) => {
    return !str || str.trim() == "" ? "" : Util
        .cleanNumber(str)
        .substring(0, 6)
        .replace(/(\d{2})(\d{4})/gi, "$1/$2")
}

export const maskDate = (str: string, send: boolean = false) => {
    const format = !send ? "$1/$2/$3" : "$3-$2-$1"
    return !str || str.trim() == "" ? "" : Util
        .cleanNumber(str)
        .substring(0, 10)
        .replace(/(\d{2})(\d{2})(\d{4})/gi, format)
}

export const maskPhone = (str: string) => {
    return !str || str.trim() == "" ? "" : Util
        .cleanNumber(str)
        .substring(0, 12)
        .replace(/(\d{2})(\d{4,5})(\d{4})/gi, "($1) $2-$3")
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

export const maskCurrency = (num: any, hasFormat: boolean = true, decimals: number = 2) => {
    if(!num) return ""

    if (/,/.test(num)) {
        num = num.replace(",00", "")
        let str: string = Util.cleanNumber(num)
        let size = str.length - decimals
        let first = str.slice(0, size)
        let last = str.slice(size)
        num = `${first}.${last}`
    }
    else num = Util.cleanNumber(num.replace(",00", ""))

    let intl = Intl.NumberFormat("pt-BR", {
        style: "currency", 
        currency: "BRL",
        maximumFractionDigits: decimals,
        useGrouping: true
    })

    const formatado = intl.format(num)

    return formatado.includes("NaN") ? "" : (hasFormat ? formatado : formatado
        .replace("R$", '')
        .trimStart())
}

export const maskEmail = (email: string) => {
    if (Util.isNullOrEmpty(email)) return email
    let v = email.split('@')
    let str1 = v[0].substring(0, 2)
    let str2 = v[1]
    return `${str1}*******@${str2}`
}

export const maskCep = (str: string) => {
    return !str || str.trim() == "" ? "" : Util
        .cleanNumber(str)
        .substring(0, 8)
        .replace(/(\d{5})(\d{3})/gi, "$1-$2")
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

export const patterns = [
    {name : "ano", pattern : "^([\\d]{4})$", message : "O campo deve ser preenchido com um ano válido entre: 1900 á 2100 no formato ####"},
    {name : "cep", pattern : "^(([\\d]){5}([\\-])([\\d]{3}))$", message : "O campo deve ser preenchido com um CEP no formato: #####-###."},
    {name : "celular", pattern : "^(([\\d]{5})([\\-])([\\d]{4}))$", message : "O campo deve ser preenchido com um CELULAR no formato: ######-####."},
    {name : "cfop", pattern : "^(([1256]{1})([\\d]){3})$", message : "O campo deve ser preenchido com um CFOP numerico contendo apenas 4 digitos e iniciado com 1, 2, 5 ou 6."},
    {name : "chave", pattern : "^([\\d]){44}$", message : "O campo deve ser preenchido com uma CHAVE numerica contendo 44 digitos."},
    {name : "chassi", pattern : "^([A-Z\\d]){17}$", message : "O campo deve ser preenchido com um CHASSI de veiculo contendo 17 characeres."},
    {name : "cnh", pattern : "^([\\d]{11})$", message : "O campo deve ser preenchido com uma CNH no formato: ###########."},
    {name : "cnpj", pattern : "^(([\\d]{2})([\\.])([\\d]{3})([\\.])([\\d]{3})([\\/])([\\d]{4})([\\-])([\\d]{2}))$", message : "O campo deve ser preenchido com um CNPJ no formato: ##.###.###/####-##"},
    {name : "contabil", pattern : "^([.\\d]{1,60})$", message : "O campo deve ser preenchido com numeros ou pontos contendo no minimo 1 caracter."},
    {name : "cpf", pattern : "^(([\\d]{3})([\\.])([\\d]{3})([\\.])([\\d]{3})([\\-])([\\d]{2}))$", message : "O campo deve ser preenchido com um CPF no formato: ###.###.###-##"},
    {name : "cpfCnpj", pattern : "^((([\\d]{3})([\\.])([\\d]{3})([\\.])([\\d]{3})([\\-])([\\d]{2}))|(([\\d]{2})([\\.])([\\d]{3})([\\.])([\\d]{3})([\\/])([\\d]{4})([\\-])([\\d]{2})))$", message : "O campo deve ser preenchido com um CPF ou CNPJ nos formatos: ###.###.###-## e ##.###.###/####-##"},
    {name : "cst", pattern : "^([\\d]{3})$", message : "O campo deve ser preenchido com uma situacao tributaria contendo no maximo 3 caracteres"},
    {name : "data", pattern : "^(([0][1-9]|[1][\\d]|[2][\\d]|[3][0-1])([\\/])([0][1-9]|[1][0-2])([\\/])([1][9][\\d]{2}|[2][0][\\d]{2}))$", message : "O campo deve ser preenchido com uma data no formato: DD/MM/AAAA onde o ano deve ser maior que 1900"},
    {name : "dataHora", pattern : "^(([0][1-9]|[1][\\d]|[2][\\d]|[3][0-1])([\\/])([0][1-9]|[1][0-2])([\\/])([1][9][\\d]{2}|[2][0][\\d]{2})([\\s])([0][\\d]|[1][\\d]|[2][\\d])([:])([0-5][\\d]))$", message : "O campo deve ser preenchido com uma data no formato: DD/MM/AAAA HH:MM onde o ano deve ser maior que 1900"},
    {name : "dataHoraOpcional", pattern : "^(([0][1-9]|[1][\\d]|[2][\\d]|[3][0-1])([\\/])([0][1-9]|[1][0-2])([\\/])([1][9][\\d]{2}|[2][0][\\d]{2})(\\s([0][\\d]|[1][\\d]|[2][\\d])([:])([0-5][\\d]))?)$", message : "O campo deve ser preenchido com uma data no formato: DD/MM/AAAA ou DD/MM/AAAA HH:MM onde o ano deve ser maior que 1900"},
    {name : "ddd", pattern : "^([\\d]{2})$", message : "O campo deve ser preenchido com um DDD contendo dois digitos."},
    {name : "desdobramento", pattern : "^(([\\d]+)([\\/])([\\d]+))$", message : "O campo deve ser preenchido com um desdobramento no formato: 0-9/0-9."},
    {name : "email", pattern : "^(([aA-zZ\\d\\w\\.\\-]+)([@])([\\daA-zZ]+)([\\.])([aA-zZ]+)(([\\.])([aA-zZ])+)*)$", message : "O campo deve ser preenchido com um email válido aceitando apenas letras MAIUSCULAS, NUMEROS, PONTOS E UNDERLINES."},
    {name : "entradaSaida", pattern : "^([E|S])$", message : "O campo deve ser preenchido com uma letra MAIUSCULA informando E para entrada ou S para saida."},
    {name : "espacoLetra", pattern : "^(([A-Z])+(\\s[A-Z]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS."},
    {name : "espacoLetraBarraPonto", pattern : "^(([A-Z\\.\\/])+(\\s[A-Z\\.\\/]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. /)."},
    {name : "espacoLetraMin3", pattern : "^(([A-Z])(\\s[A-Z])*){3,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS contendo no minimo 3 caracteres."},
    {name : "espacoLetraMin4", pattern : "^(([A-Z])(\\s[A-Z])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS contendo no minimo 4 caracteres."},
    {name : "espacoLetraNumero", pattern : "^(([A-Z\\d])+(\\s[A-Z\\d]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros."},
    {name : "espacoLetraNumeroMin4", pattern : "^(([A-Z\\d])(\\s[A-Z\\d])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros contendo no minimo 4 caracteres."},
    {name : "espacoLetraNumeroBarraMaiorMenorParentesesPontoTracoVirgula", pattern : "^(([A-Z\\d\\.\\/\\-,><()])+(\\s[A-Z\\d\\.\\/\\-,><()]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - / , > < ( ))."},
    {name : "espacoLetraNumeroBarraMaisTraco", pattern : "^(([A-Z\\d\\/\\-\\+])+(\\s[A-Z\\d\\/\\-\\+]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (- / +)."},
    {name : "espacoLetraNumeroBarraPontoTraco", pattern : "^(([A-Z\\d\\.\\/\\-])+(\\s[A-Z\\d\\.\\/\\-]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - /)."},
    {name : "espacoLetraNumeroBarraPontoTracoMin4", pattern : "^(([A-Z\\d\\.\\/\\-])(\\s[A-Z\\d\\.\\/\\-])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - /) contendo no minimo 4 caracteres."},
    {name : "espacoLetraNumeroBarraPontoTracoVirgula", pattern : "^(([A-Z\\d\\.\\/\\-,])+(\\s[A-Z\\d\\.\\/\\-,]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - / ,)."},
    {name : "espacoLetraNumeroPonto", pattern : "^(([A-Z\\d\\.])+(\\s[A-Z\\d\\.]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.)."},
    {name : "espacoLetraNumeroPontoMin2", pattern : "^(([A-Z\\d\\.])(\\s[A-Z\\d\\.])*){2,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.) contendo no minimo 2 caracteres."},
    {name : "espacoLetraNumeroPontoMin3", pattern : "^(([A-Z\\d\\.])(\\s[A-Z\\d\\.])*){3,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.) contendo no minimo 3 caracteres."},
    {name : "espacoLetraNumeroPontoMin4", pattern : "^(([A-Z\\d\\.])(\\s[A-Z\\d\\.])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.) contendo no minimo 4 caracteres."},
    {name : "espacoLetraNumeroPontoTraco", pattern : "^(([A-Z\\d\\.\\-])+(\\s[A-Z\\d\\.\\-]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. -)."},
    {name : "espacoLetraNumeroPontoTracoMin3", pattern : "^(([A-Z\\d\\.\\-])(\\s[A-Z\\d\\.\\-])*){3,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. -) contendo no minimo 3 caracteres."},
    {name : "espacoLetraNumeroPontoVirgula", pattern : "^(([A-Z\\d\\.,])+(\\s[A-Z\\d\\.,]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. ,)."},
    {name : "espacoLetraNumeroTraco", pattern : "^(([A-Z\\d\\-])+(\\s[A-Z\\d\\-]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais (-)."},
    {name : "espacoLetraPontoTracoBarraMin4", pattern : "^(([A-Z\\.\\-\\/])(\\s[A-Z\\.\\-\\/])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS e aceita os seguintes caracteres especiais: (. - /) contendo no minimo 4 caracteres."},
    {name : "espacoLetraPontoTracoMin4", pattern : "^(([A-Z\\.\\-])(\\s[A-Z\\.\\-])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS e aceita os seguintes caracteres especiais: (. -) contendo no minimo 4 caracteres."},
    {name : "estado", pattern : "^([AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO|EX]{2})$", message : "O campo deve preenchido com a sigla de um estado brasileiro em MAIUSCULO ou com EX para informar exportacao."},
    {name : "hora", pattern : "^(([0][\\d]|[1][\\d]|[2][\\d])([:])([0-5][\\d]))$", message : "O campo deve preenchido com uma hora no formato ##:##."},
    {name : "icone", pattern : "^(([iI][cC][oO][nN])([\\-])([\\daA-zZ\\-])+)$", message : "O campo deve ser preenchido com um icone valido, sempre comecando com ICON-XXXX."},
    {name : "imagem", pattern : "^((([hH][tT][tT][pP])([:])([\\/]{2}))([wW]{3}|[aA-zZ]*)([\\.])([aA-zZ]*)([\\.])([aA-zZ]+)([\\.aA-zZ]*))$", message : "O campo deve ser preenchido com o nome de uma imagem com um dos seguintes formatos: (JPEG, JPG ou PNG)."},
    {name : "inscricao", pattern : "^(([\\d\\.\\-]+)|([I][S][E][N][T][O])|([N][A][O][\\s][C][O][N][T][R][I][B][U][I][N][T][E]))$", message : "O campo deve ser preenchido com uma inscricao valida, caso nao possua, informar ISENTO ou NAO CONTRIBUINTE."},
    {name : "letra", pattern : "^([A-Z]*)$", message : "O campo deve ser preenchido apenas letras MAIUSCULAS."},
    {name : "letraMin1Max1", pattern : "^([A-Z]{1})$", message : "O campo deve ser preenchido apenas com uma letra MAIUSCULA."},
    {name : "letraMin4", pattern : "^([A-Z]){4,}$", message : "O campo deve ser preenchido apenas letras MAIUSCULAS contendo no minimo 4 caracteres."},
    {name : "letraNumero", pattern : "^([A-Z\\d]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos."},
    {name : "letraNumeroBarraPonto", pattern : "^([A-Z\\d\\/\\.]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (/ .)."},
    {name : "letraNumeroBarraPontoTraco", pattern : "^([A-Z\\d\\/\\.\\-]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (/ . -)."},
    {name : "letraNumeroBarraTraco", pattern : "^([A-Z\\d\\/\\-]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (/ -)."},
    {name : "letraNumeroMin2", pattern : "^([A-Z\\d]{2,})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e contendo no minimo 2 caracteres."},
    {name : "letraNumeroMin4", pattern : "^([A-Z\\d]{4,})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e contendo no minimo 4 caracteres."},
    {name : "letraNumeroMin8Max8", pattern : "^([A-Z\\d]{8,8})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e contendo 8 caracteres."},
    {name : "letraNumeroPonto", pattern : "^([A-Z\\d\\.]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (.)."},
    {name : "letraNumeroPontoTraco", pattern : "^([A-Z\\d\\.\\-]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (. -)."},
    {name : "letraNumeroPontoMin2", pattern : "^([A-Z\\d\\.]){2,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (.)."},
    {name : "modulo", pattern : "^(([A][R][M])|([C][O][M])|([E][X][P])|([F][I][N])|([F][R][O])|([S][U][P]))$", message : "O campo deve ser preenchido com os seguintes modulos: ARM(Armazem), COM(Compras), EXP(Expedicao), FIN(Financeiro), FRO(Frota) ou SUP(Suprimento)."},
    {name : "modulos", pattern : "^([ACEFRS]*)$", message : "O campo deve ser preenchido com as seguintes letras: A(Armazem), C(Compras), E(Expedicao), F(Financeiro), R(Frota) ou S(Suprimento)."},
    {name : "municipio", pattern : "^(([A-Z\\'])+(\\s[A-Z\\']+)*)$", message : "O campo deve ser preenchido com letras MAISCULAS e aceita os seguintes caracteres especiais: (')."},
    {name : "nis", pattern : "^(([\\d]{3})([\\.])([\\d]{3})([\\.])([\\d]{3})([\\-])([\\d]{2}))$", message : "O campo deve ser preenchido com um NIS no formato: ###.###.###-##"},
    {name : "number0to9", pattern : "^([\\d]+)$", message : "O campo deve ser preenchido com apenas numeros inteiros de 0 a 9."},
    {name : "number0to9With4", pattern : "^([\\d]){4}$", message : "O campo deve ser preenchido com apenas numeros inteiros de 0 a 9 e contendo 4 digitos inteiros."},
    {name : "number1to9", pattern : "^([1-9]+)$", message : "O campo deve ser preenchido com apenas numeros inteiros de 1 a 9."},
    {name : "numberMinus0to9", pattern : "^(([-1]*)|([0-9])*)$", message : "O campo deve ser preenchido com apenas numeros inteiros de 0 a 9 ou -1."},
    {name : "numberMinus1to9", pattern : "^(([-1]*)|([1-9])*)$", message : "O campo deve ser preenchido com apenas numeros inteiros de 1 a 9 ou -1."},
    {name : "numeric3-2", pattern : "^(([\\d]{1,3})(\\,([\\d]{1,2}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 3 digitos e a decimal no maximo 2."},
    {name : "numeric5-2", pattern : "^(([\\d]{1,5})(\\,([\\d]{1,2}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 5 digitos e a decimal no maximo 2."},
    {name : "numeric10-2", pattern : "^(([\\d]{1,10})(\\,([\\d]{1,2}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 2."},
    {name : "numeric18-1", pattern : "^(([\\d]{1,18})(\\,([\\d]{1,1}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e um decimal."},
    {name : "numeric18-2", pattern : "^(([\\d]{1,18})(\\,([\\d]{1,2}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 2."},
    {name : "numeric18-3", pattern : "^(([\\d]{1,18})(\\,([\\d]{1,3}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 3."},
    {name : "numeric18-4", pattern : "^(([\\d]{1,18})(\\,([\\d]{1,4}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 4."},
    {name : "numeric18-6", pattern : "^(([\\d]{1,18})(\\,([\\d]{1,6}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 6."},
    {name : "numeroEndereco", pattern : "^(([A-Z\\d])*([S\\/N])*)$", message : "O campo deve ser preenchido com numeros ou letras referente a um endereço, caso não possua numero informar S/N(Sem Numero)."},
    {name : "numeroPontoTraco", pattern : "^([\\d\\.\\-]*)$", message : "O campo deve ser preenchido com numeros, pontos ou tracos."},
    {name : "numeroTraco", pattern : "^([\\d\\-]*)$", message : "O campo deve ser preenchido com numeros ou tracos."},
    {name : "pagarreceber", pattern : "[PR]", message : "O campo deve ser preenchido com P(À Pagar) ou R(À Receber)."},
    {name : "password", pattern : "^([A-Z\\d@-_\\.]{8})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (@ - _ .) contendo 8 caracteres."},
    {name : "path", pattern : "^((([aA-zZ][:][\\/])|([\\/]))([0-9aA-zZ]+)([\\-\\/0-9aA-zZ]*))", message : "O campo deve ser preenchido com um caminho de pasta e aceita os seguintes caracteres especiais: (- _)."},
    {name : "pis", pattern : "^(([\\d]{3})([\\.])([\\d]{5})([\\.])([\\d]{2})([\\-])([\\d]))$", message : "O campo deve ser preenchido com PIS no formato: ###.#####.##-#."},
    {name : "site", pattern : "^((([hH][tT][tT][pP])([:])([\\/]{2}))([wW]{3}|[aA-zZ]*)([\\.])([aA-zZ]*)([\\.])([aA-zZ]+)([\\.aA-zZ]*))$", message : "O campo deve ser preenchido com um site valido em MAISCULO, o site deve comecar com HTTP:// seguido por www ou subdominio e o restante do site."},
    {name : "telefone", pattern : "^(([\\d]{4})([\\-])([\\d]{4}))$", message : "O campo deve ser preenchido com um telefone no formato: ####-####."},
    {name : "textarea", pattern : "^([A-Z\\d\\s\\.\\/\\-\\,]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (@ - _ .)."},
    {name : "textareaEspacoLetraNumeroBarraPontoTracoVirgula", pattern : "^([A-Z\\d\\s\\.\\/\\-\\,]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (@ - _ .)."},
    {name : "textareaMin4", pattern : "^([A-Z\\d\\s\\.\\/\\-\\,]{4,})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (@ - _ .) contendo no minimo 4 caracteres."},
    {name : "tipoMunicipio", pattern : "^([MR])$", message : "O campo deve ser preenchido apenas com M(Municipio) ou R(Regiao)."},
    {name : "tipoCNH", pattern : "^(([A])|([B])|([C])|([D])|([E])|([A][B])|([A][C])|([A][D])|([A][E]))$", message : "O campo deve ser preenchido com letras referente a carta de habilitacao."},
    {name : "unidadeMedida", pattern : "^(([C][M])|([C])|([M][M])|([B][G])|([B][O])|([C][X])|([F][D])|([G][R])|([J][G])|([K][G])|([L][T])|([P][C])|([P][A])|([P][R])|([P][T])|([R][E])|([S][K])|([T][O])|([U][N])|([G]))$", message : "O campo deve ser preenchido com uma unidade de medida válida contendo dois caracteres."},
    {name : "user", pattern : "^([A-Z\\d\\.]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (.)."}
];