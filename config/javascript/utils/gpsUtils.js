export function startLocation(callback) {
  //console.log("start location");

  let uid = null;
  if (navigator.geolocation) {
    uid = navigator.geolocation.watchPosition(
      (pos) => {
        // console.log("pos latitude:", pos.coords.latitude);
        // console.log("pos longitude:", pos.coords.longitude);
        callback(pos.coords.longitude, pos.coords.latitude);
      },
      (err) => {
        console.log(err);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  return uid;
}

export function stopLocation(uid) {
  if (uid) {
    //console.log("stop location");
    navigator.geolocation.clearWatch(uid);
  }
}

export function loadStorage() {
  let initStorage = {};
  const gpsLocal = localStorage.getItem("gps");
  //console.log(gpsLocal);

  if (gpsLocal) {
    initStorage = JSON.parse(gpsLocal);

    if (!initStorage.gpsName) {
      //console.log("clear storage");
      localStorage.removeItem("gps");

      initStorage.gpsImg = "./svg/icons/button/gps_off.svg";
      initStorage.gpsToggle = false;
      initStorage.gpsName = "gpsOff";

      const gpsRaw = JSON.stringify(initStorage);
      localStorage.setItem("gps", gpsRaw);
    }
  } else {
    initStorage.gpsImg = "./svg/icons/button/gps_off.svg";
    initStorage.gpsToggle = false;
    initStorage.gpsName = "gpsOff";
  }
  return initStorage;
}

export const isHttps = () => {
  const protocol = document.location.protocol;
  return protocol.includes("https");
};
