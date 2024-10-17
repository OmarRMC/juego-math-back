"use strict";
//export type Weather = "sunny"|"rainy"|"cloudy"|"windy"|"stormy"
//export type Visibility="great"|"good"|"ok"|"poor"
//import { Request} from "express"
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weather = exports.Visibility = void 0;
var Visibility;
(function (Visibility) {
    Visibility["great"] = "great";
    Visibility["good"] = "good";
    Visibility["ok"] = "ok";
    Visibility["poor"] = "poor";
})(Visibility || (exports.Visibility = Visibility = {}));
var Weather;
(function (Weather) {
    Weather["sunny"] = "sunny";
    Weather["rainy"] = "rainy";
    Weather["cloudy"] = "cloudy";
    Weather["windy"] = "windy";
    Weather["stormy"] = "stormy";
})(Weather || (exports.Weather = Weather = {}));
;
