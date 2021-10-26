import { AllProvince } from '@/assets/file/shengshiqu'


export const AllProvinceData = {
  getAllData: (flag) => {
    const item1 = AllProvince;
    const result = [];
    const allResult = [];
    for(let i in item1){
      const d1 = {
        value: i +"",
        label: item1[i].name,
        children: []
      };
      allResult.push(d1);
      if(item1[i].child){
        const item2 = item1[i].child;
        for(let k in item2){
          const d2 = {
            value: k +"",
            label: item2[k].name,
            children: []
          };
          allResult.push(d2);
          d1.children.push(d2);
          if(item2[k].child){
            const item3 = item2[k].child;
            for(let j in item3){
              const d3 = {
                value: j +"",
                label: item3[j]
              };
              d2.children.push(d3);
              allResult.push(d3);
            }
          }
        }
      }
      result.push(d1);
    }
    if (flag) {
      return result;
    } else {
      return allResult;
    }
  },
  getProvince: () => {
    const list = AllProvince;
    const province = [];
    for(let i in list){
      province.push({
        value: i + '',
        label: list[i].name
      });
    }
    return province;
  },
  getCities: () => {
    const list = AllProvince;
    const city = [];
    for(let i in list){
      if(list[i].child){
        const item2 = list[i].child;
        for(let k in item2){
          city.push({
            value: i + '',
            label: item2[k].name
          });
        }
      }
    }
    return city;
  },
  getArea: () => {
    const item1 = AllProvince;
    const area = []
    for(var i in item1){
      if(item1[i].child){
        const item2 = item1[i].child;
        for(var k in item2){
          if(item2[k].child){
            const item3 = item2[k].child;
            for(var j in item3){
              area.push({
                value: i + '',
                label: item3[j].name
              });
            }
          }
        }
      }
    }
    return area;
  }
}
