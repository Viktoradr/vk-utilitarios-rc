import { MaskType } from '../types/mask.type';
export declare const convertToMask: (value: string | number, type: MaskType) => string | number;
export declare const maskDateCard: (str: string) => string;
export declare const maskDate: (str: string, send?: boolean) => string;
export declare const maskPhone: (str: string) => string;
export declare const maskCPF: (str: string) => string;
export declare const maskCNPJ: (str: string) => string;
export declare const maskCPFCNPJ: (cpfcnpj: string) => string;
export declare const maskCurrency: (num: any, hasFormat?: boolean) => any;
export declare const maskCurrencyIntl: (event: any) => string;
export declare const maskEmail: (email: string) => string;
export declare const maskCep: (str: string) => string;
export declare const maskCNJ: (cnj: string, valid?: boolean) => string;
//# sourceMappingURL=mask.d.ts.map