"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const newDatoVerifica = (object) => {
    return {
        comment: parseCommet(object.comment),
        date: paseDate(object.date),
        weather: parseWather(object.weather),
        visibility: parseVisibility(object.visibility)
    };
};
const parseVisibility = (dato) => {
    if (!isString(dato) || !isVisibility(dato)) {
        throw new Error("Error en visibility ");
    }
    return dato;
};
const isVisibility = (data) => {
    return Object.values(types_1.Visibility).includes(data);
};
const parseWather = (dato) => {
    if (!isString(dato) || !isWeather(dato)) {
        throw new Error("Erorr en la whather");
    }
    return dato;
};
const isWeather = (dato) => {
    return Object.values(types_1.Weather).includes(dato);
};
const paseDate = (data) => {
    if (!isString(data) || !isDate(data)) {
        throw new Error(" Error en la fecha ");
    }
    return data;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseCommet = (in_comment) => {
    if (!isString(in_comment)) {
        throw new Error("Commnetario invalido");
    }
    return in_comment;
};
const isString = (cadena) => (typeof cadena == "string");
exports.default = newDatoVerifica;
