"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateWeekDays = exports.getCompetenciaAtual = exports.diffBetweenDays = exports.isDateSameBefore = exports.isDateBefore = exports.isDateSameAfter = exports.isDateAfter = exports.isDateSame = exports.subDay = exports.addDay = exports.addMinutes = exports.getMoment = exports.getDate = exports.getDateFromString = exports.getDataString = exports.getCompetencia = exports.getToday = void 0;
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('pt-br');
const getToday = () => {
    return (0, moment_1.default)();
};
exports.getToday = getToday;
const getCompetencia = (data) => {
    return (0, moment_1.default)((0, moment_1.default)(data).format("YYYY-MM-01")).toDate();
};
exports.getCompetencia = getCompetencia;
const getDataString = (data, format = "DD/MM/YYYY HH:mm") => {
    return (0, moment_1.default)(data).format(format);
};
exports.getDataString = getDataString;
const getDateFromString = (dt, format = "DD/MM/YYYY") => {
    return (0, moment_1.default)(dt, format);
};
exports.getDateFromString = getDateFromString;
const getDate = (dt) => {
    return (0, moment_1.default)(dt).toDate();
};
exports.getDate = getDate;
const getMoment = (dt) => {
    return (0, moment_1.default)(dt);
};
exports.getMoment = getMoment;
const addMinutes = (dt, mins) => {
    return (0, exports.getMoment)((0, exports.getMoment)(dt).add(mins, 'minutes').format("YYYY-MM-DD HH:mm:ss"));
};
exports.addMinutes = addMinutes;
const addDay = (dt, days = 1) => {
    return (0, moment_1.default)(dt).add(days, 'days');
};
exports.addDay = addDay;
const subDay = (dt, days = 1) => {
    return (0, moment_1.default)(dt).subtract(days, 'days');
};
exports.subDay = subDay;
const isDateSame = (dt1, dt2) => {
    let dtx = moment_1.default.isMoment(dt1) ? dt1 : (0, exports.getDataString)(dt1, "YYYY-MM-DD");
    let dty = moment_1.default.isMoment(dt2) ? dt2 : (0, exports.getDataString)(dt2, "YYYY-MM-DD");
    return (0, moment_1.default)(dtx).isSame((0, moment_1.default)(dty));
};
exports.isDateSame = isDateSame;
const isDateAfter = (dt1, dt2) => {
    let dtx = moment_1.default.isMoment(dt1) ? dt1 : (0, exports.getDataString)(dt1, "YYYY-MM-DD");
    let dty = moment_1.default.isMoment(dt2) ? dt2 : (0, exports.getDataString)(dt2, "YYYY-MM-DD");
    return (0, moment_1.default)(dtx).isAfter((0, moment_1.default)(dty));
};
exports.isDateAfter = isDateAfter;
const isDateSameAfter = (dt1, dt2) => {
    return (0, moment_1.default)(dt1).isSameOrAfter((0, moment_1.default)(dt2));
};
exports.isDateSameAfter = isDateSameAfter;
const isDateBefore = (dt1, dt2) => {
    return (0, moment_1.default)(dt1).isBefore((0, moment_1.default)(dt2));
};
exports.isDateBefore = isDateBefore;
const isDateSameBefore = (dt1, dt2) => {
    return (0, moment_1.default)(dt1).isSameOrBefore((0, moment_1.default)(dt2));
};
exports.isDateSameBefore = isDateSameBefore;
const diffBetweenDays = (dt1, dt2) => {
    const a = (0, moment_1.default)(dt1);
    const b = (0, moment_1.default)(dt2);
    return a.diff(b, 'days');
};
exports.diffBetweenDays = diffBetweenDays;
const getCompetenciaAtual = () => {
    const firstDay = (0, moment_1.default)().clone().startOf('month');
    const endOfmonth = (0, moment_1.default)().clone().endOf('month').subtract(1, "days");
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
