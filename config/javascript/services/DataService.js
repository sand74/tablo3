import { parsePeriodToString, replaceURL } from "../utils/common";
import Stantion from "../components/map/Stantion";

const applicationInitialState = window.__INITIAL_STATE__;
const config = applicationInitialState //.config;

class DataService {
  async getMilRailsPokaz(id) {
    const data = await this.getResurce(`${config.mil_rails}${id}`);
    const res = {
      info: [
        {
          index: 1,
          name: data.title.name_pu,
          value: data.data[0].name_pu,
        },
        {
          index: 2,
          name: data.title.dlina_pu,
          value: data.data[0].dlina_pu,
        },
        {
          index: 3,
          name: data.title.v_rab,
          value: data.data[0].v_rab,
        },
        {
          index: 4,
          name: data.title.gruzonap,
          value: data.data[0].gruzonap,
        },
        {
          index: 5,
          name: data.title.teh_skor,
          value: data.data[0].teh_skor,
        },
        {
          index: 6,
          name: data.title.teh_skor_dal,
          value: data.data[0].teh_skor_dal,
        },
        {
          index: 7,
          name: data.title.teh_skor_prig,
          value: data.data[0].teh_skor_prig,
        },
        {
          index: 8,
          name: data.title.razmer_dvizh_gruzp,
          value: data.data[0].razmer_dvizh_gruzp,
        },
        {
          index: 9,
          name: data.title.razmer_dvizh_gruz_mass,
          value: data.data[0].razmer_dvizh_gruz_mass,
        },
        {
          index: 10,
          name: data.title.razmer_dizh_passp,
          value: data.data[0].razmer_dizh_passp,
        },
        {
          index: 11,
          name: data.title.skor_pass,
          value: data.data[0].skor_pass,
        },
        {
          index: 12,
          name: data.title.class_pu,
          value: data.data[0].class_pu,
        },
      ],
    };

    console.log(res);

    return res;
  }

  async getGPS(long, lat) {
    const url = replaceURL(config.gps, long, lat);
    const data = await this.getResurce(url);
    return data[0];
  }

  async getDivisions() {
    const stantion = {};
    const data = await this.getResurce(config.divisions);

    for (const t of data) {
      let key = t.ks.substr(0, 5);
      let stn = new Stantion(t.ks, t.ms, t.km, t.nodes, t.region);
      stantion[key] = stn;
    }

    return stantion;
  }

  getMenu() {
    return this.getResurce(config.menu);
  }

  async getSpecTech(id) {
    const items = await this.getResurce(`${config.spec_prp}${id}`);

    const result = items.data.map((item) => {
      const keys = Object.keys(item).filter((i) => items.title[i]);
      const text = keys.map((i) => {
        return `${items.title[i]}: <b>${item[i]}</b>`;
      });
      return {
        id: item.id_map,
        text: text,
      };
    });

    return result;
  }

  getPokaz(id, label) {
    return this.getResurce(`${config[label]}${id}`);
    //return this.getResurce(`${config.pokaz}`);
  }

  async getStormPokaz(id) {
    const data = await this.getResurce(`${config.storm_uch}${id}`);
    const informItems = data[0].data[0].data;
    const actions = data[0].data[0].action;
    const nameTrain = {
      name: data[0].data[0].name_trainuch,
      value: "",
    };

    let info = [];

    informItems.forEach((item) => {
      const value = parsePeriodToString(item.period);

      const result = item.event.map((item) => {
        return {
          name: item.name_event,
          value: value,
        };
      });

      info = [...info, ...result];
    });

    const replaseItem = (item) => {
      const arr = item.split(";");
      return arr.join("\n");
    };

    let arrPokaz = [];

    if (actions) {
      arrPokaz = actions.map((item) => {
        return {
          header: item.name_sluzhba,
          title: {
            c_name: "Мероприятия для формирования оперативного приказа",
          },
          data: item.data.map((item) => ({ c_name: replaseItem(item) })),
        };
      });
    }

    const objPokaz = { ...arrPokaz };

    const result = {
      info: [nameTrain, ...info],
      ...objPokaz,
    };

    return result;
  }

  async getStormAll() {
    const data = await this.getResurce(config.storm_all);

    const result = data.map((item) => {
      const isCritical = this.getCriticalEvent(item);
      const res = {
        id: item.region,
        //hits: firstUch.length > 0 ? firstUch[0].data : [],
        hits: [],
        isCritical,
      };
      return res;
    });
    return result;
  }

  getCriticalEvent({ data }) {
    let bool = false;
    data.forEach((item) => {
      const { data } = item;
      data.forEach((item) => {
        const { event } = item;
        event.forEach((item) => {
          if (item["type_critical"]) bool = true;
        });
      });
    });
    return bool;
  }

  async getStormRegion(id) {
    const data = await this.getResurce(`${config.storm_region}${id}`);

    if (data.length > 0) {
      const dataTrains = data[0].data.map((item) => {
        let isCritical = false;
        const arr = item.data.map((ev) => {
          const critical = ev.event.filter((item) => item["type_critical"]);
          if (critical.length > 0) {
            isCritical = true;
          }
          return {
            period: ev.period,
            data: ev.data,
            critical: critical,
          };
        });

        return {
          id: item.map,
          hits: arr,
          isCritical,
        };
      });
      //console.log(dataTrains);
      return dataTrains;
    } else {
      return [];
    }
  }

  getStormActions(id) {
    const data = this.getResurce(config.storm_uch);

    return data;
  }

  getPiket() {
    return this.getResurce(config.piket);
  }

  getPrognoz(id) {
    return this.getResurce(`${config.prognoz}${id}`);
  }

  getWeather(id) {
    return this.getResurce(`${config.weather_region}${id}`);
  }

  getSnowTech(id) {
    return this.getResurce(`${config.snow_tech}${id}`);
  }

  async getBridgePokaz(id) {
    return this.getResurce(`${config.bridges_pokaz}${id}`);
    //return this.getResurce(`./data/load_artfeat_153_42.json`);
  }

  async getPipePokaz(id) {
    return this.getResurce(`${config.pipe}${id}`);
    //return this.getResurce(`./data/load_artfeat_153_42.json`);
  }

  async getPipeCount(id) {
    return this.getResurce(`${config.pipe_count}${id}`);
  }

  async getHealthInfo(id) {
    return this.getResurce(`${config.health}${id}`);
  }

  async getSnowPokaz(id) {
    return this.getResurce(`${config.snow_pokaz}${id}`);
  }

  async getResurce(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Cloud not fetch ${url}, received ${response.status}`);
    } else {
      return await response.json();
    }
  }
}

export default DataService;
