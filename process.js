const fs = require('fs');
const path = require('path');
const masterData = require('./master.json');
const _data = require('./master2.json');


const fitler = masterData.filter((item => !!item.amphoe_code && !!item.district_code));
// const provinces = data.reduce((acc, i) => {
//   const { province, province_code } = i;
//   if (acc[province_code]) return acc;
//   return {
//     ...acc,
//     [province_code]: {
//       province,
//       province_code,
//     },
//   };
// }, {});

// const mData = masterData.filter((item) => item.province_code === 97);
// console.log('data size', mData.length);

// const data = _data.filter((item) => item.province_id === '77');
// console.log('ndata size', data.length);

// const amphoes = data.reduce((acc, i) => {
//   const { province_code, amphoe, amphoe_code } = i;
//   if (acc[amphoe_code]) return acc;
//   return {
//     ...acc,
//     [amphoe_code]: {
//       district: amphoe,
//       district_code: amphoe_code,
//       province_code,
//     },
//   };
// }, {});

// const subDistricts = data.reduce((acc, i) => {
//   const { amphoe_code, district, district_code, zipcode } = i;
//   if (acc[district_code]) return acc;
//   return {
//     ...acc,
//     [district_code]: {
//       sub_district: district,
//       sub_district_code: district_code,
//       district_code: amphoe_code,
//       postal_code: zipcode,
//     },
//   };
// }, {});

// const amphoes = data.reduce((acc, i) => {
//   const { province_code, amphoe, amphoe_code } = i;
//   if (acc[amphoe_code]) return acc;
//   return {
//     ...acc,
//     [amphoe_code]: {
//       district: amphoe,
//       district_code: amphoe_code,
//       province_code,
//     },
//   };
// }, {});

const subDistricts = fitler.reduce((acc, i) => {
  const { amphoe_code, district, district_code, zipcode } = i;
  if (acc[district_code]) return acc;
  return {
    ...acc,
    [district_code]: {
      sub_district: district,
      sub_district_code: district_code,
      district_code: amphoe_code ? amphoe_code.toString() : amphoe_code,
      postal_code: zipcode,
    },
  };
}, {});

// fs.writeFileSync(path.join(__dirname, 'result/provinces.json'), JSON.stringify(provinces));
// fs.writeFileSync(path.join(__dirname, 'result/amphoes.json'), JSON.stringify(amphoes));
// fs.writeFileSync(path.join(__dirname, 'result/tambons.json'), JSON.stringify(subDistricts));
