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

export { SchemaOrwSvg, LegendOrwSvg }
export { SchemaCitySvg, LegendCitySvg }
export { SchemaMoscowSvg, LegendMoscowSvg, TableMoscowSvg }
export { SchemaMurmanskSvg, LegendMurmanskSvg, TableMurmanskSvg }
export { SchemaPetrozavodskSvg, LegendPetrozavodskSvg, TablePetrozavodskSvg }
export { SchemaSpbSvg, LegendSpbSvg, TableSpbSvg }
export { SchemaVolhovSvg, LegendVolhovSvg, TableVolhovSvg }
export { SchemaVitebskSvg, LegendVitebskSvg, TableVitebskSvg }

export function getSchema(id) {
//    console.log('Schema id', id)
    switch(id) {
        case 'orw':
            return {schema: SchemaOrwSvg, legend: LegendOrwSvg, table: undefined};
        case 'city':
            return {schema: SchemaCitySvg, legend: LegendCitySvg, table: undefined};
        case 'nod1':
        case 'Рег-1':
        case 'go_moscow':
            return {schema: SchemaMoscowSvg, legend: LegendMoscowSvg, table: TableMoscowSvg};
        case 'nod2':
        case 'Рег-2':
        case 'go_spb_vit':
            return {schema: SchemaVitebskSvg, legend: LegendVitebskSvg, table: TableVitebskSvg};
        case 'nod3':
        case 'Рег-3':
        case 'go_spb':
            return {schema: SchemaSpbSvg, legend: LegendSpbSvg, table: TableSpbSvg};
        case 'nod4':
        case 'Рег-4':
        case 'go_petrozavodsk':
            return {schema: SchemaPetrozavodskSvg, legend: LegendPetrozavodskSvg, table: TablePetrozavodskSvg};
        case 'nod5':
        case 'Рег-5':
        case 'go_murm':
            return {schema: SchemaMurmanskSvg, legend: LegendMurmanskSvg, table: TableMurmanskSvg};
        case 'nod6':
        case 'Рег-6':
        case 'go_volhov':
            return {schema: SchemaVolhovSvg, legend: LegendVolhovSvg, table: TableVolhovSvg};
        default:
            return {schema: undefined, legend: undefined, table: undefined};
    }
}