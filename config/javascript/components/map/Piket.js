export default class Piket {
  // "code": "31",
  // "param1": "Рег-3 - Рег-6",
  // "param2": "Жихарево - Войбокало",
  // "param3": "90 км 7 пк",
  // "id_piket": "piket_04840"

  constructor(code, id_picket, params) {
    this.code = code;
    this.id_picket = id_picket;
    this.params = params.map(item => item);
  }

  getParamsTxt() {
    return this.params.join(',');
  }

}