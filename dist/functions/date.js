"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateWeekDays = exports.getCompetenciaAtual = exports.diffBetweenDays = exports.isDateSameBefore = exports.isDateBefore = exports.isDateSameAfter = exports.isDateAfter = exports.isDateSame = exports.subDay = exports.addDay = exports.addMinutes = exports.getMoment = exports.getDate = exports.getDateFromString = exports.getDataString = exports.getFirstDateOfMonth = exports.getToday = void 0;
const moment = require("moment");
moment.locale('pt-br');
const getToday = () => moment();
exports.getToday = getToday;
const getFirstDateOfMonth = (data) => {
    return moment(moment(data).format("YYYY-MM-01")).toDate();
};
exports.getFirstDateOfMonth = getFirstDateOfMonth;
const getDataString = (data, format = "DD/MM/YYYY HH:mm") => {
    return moment(data).format(format);
};
exports.getDataString = getDataString;
const getDateFromString = (dt, format = "DD/MM/YYYY") => {
    return moment(dt, format);
};
exports.getDateFromString = getDateFromString;
const getDate = (dt) => moment(dt).toDate();
exports.getDate = getDate;
const getMoment = (dt) => moment(dt);
exports.getMoment = getMoment;
const addMinutes = (dt, mins) => {
    return (0, exports.getMoment)((0, exports.getMoment)(dt).add(mins, 'minutes').format("YYYY-MM-DD HH:mm:ss"));
};
exports.addMinutes = addMinutes;
const addDay = (dt, days = 1) => moment(dt).add(days, 'days');
exports.addDay = addDay;
const subDay = (dt, days = 1) => moment(dt).subtract(days, 'days');
exports.subDay = subDay;
const isDateSame = (dt1, dt2) => {
    let dtx = moment.isMoment(dt1) ? dt1 : (0, exports.getDataString)(dt1, "YYYY-MM-DD");
    let dty = moment.isMoment(dt2) ? dt2 : (0, exports.getDataString)(dt2, "YYYY-MM-DD");
    return moment(dtx).isSame(moment(dty));
};
exports.isDateSame = isDateSame;
const isDateAfter = (dt1, dt2) => {
    let dtx = moment.isMoment(dt1) ? dt1 : (0, exports.getDataString)(dt1, "YYYY-MM-DD");
    let dty = moment.isMoment(dt2) ? dt2 : (0, exports.getDataString)(dt2, "YYYY-MM-DD");
    return moment(dtx).isAfter(moment(dty));
};
exports.isDateAfter = isDateAfter;
const isDateSameAfter = (dt1, dt2) => {
    return moment(dt1).isSameOrAfter(moment(dt2));
};
exports.isDateSameAfter = isDateSameAfter;
const isDateBefore = (dt1, dt2) => {
    return moment(dt1).isBefore(moment(dt2));
};
exports.isDateBefore = isDateBefore;
const isDateSameBefore = (dt1, dt2) => {
    return moment(dt1).isSameOrBefore(moment(dt2));
};
exports.isDateSameBefore = isDateSameBefore;
const diffBetweenDays = (dt1, dt2) => {
    const a = moment(dt1);
    const b = moment(dt2);
    return a.diff(b, 'days');
};
exports.diffBetweenDays = diffBetweenDays;
const getCompetenciaAtual = () => {
    const firstDay = moment().clone().startOf('month');
    const endOfmonth = moment().clone().endOf('month').subtract(1, "days");
    return {
        inicio: firstDay.toDate(),
        fim: endOfmonth.toDate(),
    };
};
exports.getCompetenciaAtual = getCompetenciaAtual;
const calculateWeekDays = (value) => {
    const dt = (0, exports.getMoment)(value);
    let dias = [];
    let isoWeekday = dt.isoWeekday();
    let start = isoWeekday == 7 ?
        dt.subtract(0, 'days') :
        dt.subtract(isoWeekday, 'days');
    dias = [...dias, start.toDate()];
    for (let index = 1; index <= 6; index++) {
        let param = start.add(1, 'days').toDate();
        dias = [...dias, param];
    }
    return dias;
};
exports.calculateWeekDays = calculateWeekDays;
