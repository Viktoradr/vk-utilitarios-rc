import moment from 'moment';
export declare const getToday: () => moment.Moment;
export declare const getCompetencia: (data: any) => Date;
export declare const getDataString: (data: any, format?: string) => string;
export declare const getDateFromString: (dt: any, format?: string) => moment.Moment;
export declare const getDate: (dt: any) => Date;
export declare const getMoment: (dt: any) => moment.Moment;
export declare const addMinutes: (dt: any, mins: number) => moment.Moment;
export declare const addDay: (dt: any, days?: number) => moment.Moment;
export declare const subDay: (dt: any, days?: number) => moment.Moment;
export declare const isDateSame: (dt1: any, dt2: any) => boolean;
export declare const isDateAfter: (dt1: any, dt2: any) => boolean;
export declare const isDateSameAfter: (dt1: any, dt2: any) => boolean;
export declare const isDateBefore: (dt1: any, dt2: any) => boolean;
export declare const isDateSameBefore: (dt1: any, dt2: any) => boolean;
export declare const diffBetweenDays: (dt1: any, dt2: any) => number;
export declare const getCompetenciaAtual: () => any;
export declare const calculateWeekDays: (value: Date) => Date[];
