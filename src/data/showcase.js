const base = import.meta.env.BASE_URL;

const showcaseItems = [
  {
    id: 1,
    subtitle: "New-Tik",
    year: "AD",
    video: `${base}media/tik.mp4`,
  },

  // {
  //   id: 2,
  //   subtitle: "Ahl-AlQuran",
  //   year: "AD",
  //   video: `${base}media/AhlElQuran.mp4`,
  // },

  {
    id: 2,
    subtitle: "SDI",
    year: "Story-Telling",
    video: `${base}media/Laundry.mp4`,
  },

  {
    id: 3,
    subtitle: "Al-Saif Gallery",
    year: "Motion Graphics",
    video: `${base}media/3rood.mp4`,
  },

  // {
  //   id: 3,
  //   subtitle: "Product",
  //   year: "Branding",
  //   video: `${base}media/manadeel.mp4`,
  // },
];

export default showcaseItems;
