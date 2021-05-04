// Общая схема дороги
import SchemaOrwSvg from '/public/svg/tablo.svg';
import LegendOrwSvg from '/public/svg/legend.svg';
// Схема города
import SchemaCitySvg from '/public/svg/city.svg';
import LegendCitySvg from '/public/svg/city_legend.svg';
// Схема московского отделения
import SchemaMoscowSvg from '/public/svg/moscow.svg';
import LegendMoscowSvg from '/public/svg/moscow_legend.svg';
import TableMoscowSvg from '/public/svg/moscow_legend_table.svg';
// Схема мурманского отделения
import SchemaMurmanskSvg from '/public/svg/murm.svg';
import LegendMurmanskSvg from '/public/svg/murm_legend.svg';
import TableMurmanskSvg from '/public/svg/murm_legend_table.svg';
// Схема петрозаводского отделения
import SchemaPetrozavodskSvg from '/public/svg/petrozavodsk.svg';
import LegendPetrozavodskSvg from '/public/svg/petrozavodsk_legend.svg';
import TablePetrozavodskSvg from '/public/svg/petrozavodsk_legend_table.svg';
// Схема петрозаводского отделения
import SchemaSpbSvg from '/public/svg/spb.svg';
import LegendSpbSvg from '/public/svg/spb_legend.svg';
import TableSpbSvg from '/public/svg/spb_legend_table.svg';
// Схема волховского отделения
import SchemaVolhovSvg from '/public/svg/volhov.svg';
import LegendVolhovSvg from '/public/svg/volhov_legend.svg';
import TableVolhovSvg from '/public/svg/volhov_legend_table.svg';
// Схема витебского отделения
import SchemaVitebskSvg from '/public/svg/vit.svg';
import LegendVitebskSvg from '/public/svg/vit_legend.svg';
import TableVitebskSvg from '/public/svg/vit_legend_table.svg';

import {useEffect, useRef, useState} from "react";

export {SchemaOrwSvg, LegendOrwSvg}
export {SchemaCitySvg, LegendCitySvg}
export {SchemaMoscowSvg, LegendMoscowSvg, TableMoscowSvg}
export {SchemaMurmanskSvg, LegendMurmanskSvg, TableMurmanskSvg}
export {SchemaPetrozavodskSvg, LegendPetrozavodskSvg, TablePetrozavodskSvg}
export {SchemaSpbSvg, LegendSpbSvg, TableSpbSvg}
export {SchemaVolhovSvg, LegendVolhovSvg, TableVolhovSvg}
export {SchemaVitebskSvg, LegendVitebskSvg, TableVitebskSvg}

import UstLugaSvg from '/public/svg/ust-luga.svg'
import VysockSvg from '/public/svg/vysotsk.svg'
import KandalakshaSvg from '/public/svg/kandalaksha.svg'
import SpbPortSvg from '/public/svg/spb_port.svg'
import MurmPortSvg from '/public/svg/murm_port.svg'
import VyborgSvg from '/public/svg/Vyborg.svg'

export {UstLugaSvg, VyborgSvg, VysockSvg, KandalakshaSvg, SpbPortSvg, MurmPortSvg}

const initialState =  {desc: {schema: SchemaOrwSvg, legend: LegendOrwSvg, table: undefined}};

export function schemaReducer(state, action) {
    switch (action.type) {
        case 'root':
            return {desc: {schema: SchemaOrwSvg, legend: LegendOrwSvg, table: undefined}};
        case 'orw':
            return {desc: {schema: SchemaOrwSvg, legend: LegendOrwSvg, table: undefined}, prev: initialState};
        case 'city':
            return {desc: {schema: SchemaCitySvg, legend: LegendCitySvg, table: undefined}, prev: initialState};
        case 'nod1':
        case 'Рег-1':
        case 'go_moscow':
            return {desc: {schema: SchemaMoscowSvg, legend: LegendMoscowSvg, table: TableMoscowSvg}, prev: initialState};
        case 'nod2':
        case 'Рег-2':
        case 'go_spb_vit':
            return {desc: {schema: SchemaVitebskSvg, legend: LegendVitebskSvg, table: TableVitebskSvg}, prev: initialState};
        case 'nod3':
        case 'Рег-3':
        case 'go_spb':
            return {desc: {schema: SchemaSpbSvg, legend: LegendSpbSvg, table: TableSpbSvg}, prev: initialState};
        case 'nod4':
        case 'Рег-4':
        case 'go_petrozavodsk':
            return {desc: {schema: SchemaPetrozavodskSvg, legend: LegendPetrozavodskSvg, table: TablePetrozavodskSvg}, prev: initialState};
        case 'nod5':
        case 'Рег-5':
        case 'go_murm':
            return {desc: {schema: SchemaMurmanskSvg, legend: LegendMurmanskSvg, table: TableMurmanskSvg}, prev: initialState};
        case 'nod6':
        case 'Рег-6':
        case 'go_volhov':
            return {desc: {schema: SchemaVolhovSvg, legend: LegendVolhovSvg, table: TableVolhovSvg}, prev: initialState};
        case 'port_st_07630':
            return {desc: {schema: UstLugaSvg, legend: undefined, table: undefined}, prev: state};
        case 'port_st_02060':
            return {desc: {schema: VysockSvg, legend: undefined, table: undefined}, prev: state};
        case 'port_st_01490':
            return {desc: {schema: KandalakshaSvg, legend: undefined, table: undefined}, prev: state};
        case 'port_st_03580':
            return {desc: {schema: SpbPortSvg, legend: undefined, table: undefined}, prev: state};
        case 'port_st_01840':
            return {desc: {schema: MurmPortSvg, legend: undefined, table: undefined}, prev: state};
        case 'port_st_02000':
            return {desc: {schema: VyborgSvg, legend: undefined, table: undefined}, prev: state};
        case 'back':
            return state.prev;
        default:
            return state; //{schema: undefined, legend: undefined, table: undefined};
    }
}