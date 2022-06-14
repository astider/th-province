const fs = require('fs');
const path = require('path');

const { District_MainDataSheet: data } = require('./district.json');

const mapData = data.map((item) => ({
  province_code: item.ProvinceMOI_ID,
  province_name_th: item.ProvinceNameThai,
  district_name_th: item.DistrictNameThai.includes('เขต')
    ? item.DistrictNameThai.replace('เขต', '').trim()
    : item.DistrictNameThai.replace('อำเภอ', '').trim(),
  district_name_en: item.DistrictNameEnglish.replace('District', '').trim(),
  district_code: item.DistrictMOI_ID,
}));

fs.writeFileSync(path.join(__dirname, 'result/gov-district.json'), JSON.stringify(mapData));

const changwats = mapData.reduce((acc, i) => {
  const { province_code, province_name_th } = i;
  if (acc[province_code]) return acc;
  return {
    ...acc,
    [province_code]: {
      province: province_name_th.includes('จังหวัด') ? province_name_th.replace('จังหวัด', '') : province_name_th,
      province_code: province_code,
    },
  };
}, {});

const amphoes = mapData.reduce((acc, i) => {
  const { province_code, district_name_th, district_code } = i;
  if (acc[district_code]) return acc;
  return {
    ...acc,
    [district_code]: {
      district: district_name_th,
      district_code: district_code,
      province_code: province_code,
    },
  };
}, {});

fs.writeFileSync(path.join(__dirname, 'result/provinces-2.json'), JSON.stringify(changwats));
fs.writeFileSync(path.join(__dirname, 'result/amphoes.json'), JSON.stringify(amphoes));
