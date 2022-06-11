const guildTourLocation = {
  lat: 40.74779659105191,
  lng: -73.97710788928774,
};

const guildTourPov = {
  heading: 247,
  pitch: 8,
  zoom: 1,
};

const guildTourImagePano = "O06zgWTW9GvbMLOT1CKrEg";

export const googleMapConfig = {
  panoId: guildTourImagePano,
  position: guildTourLocation,
  povConfig: guildTourPov,
  staticMapZoom: 18,
};
