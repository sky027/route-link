import CommonUtil from '@/utils/commonUtil'

const weatherData = {
  weeks: [
    { id: '1', name: '周一' },
    { id: '2', name: '周二' },
    { id: '3', name: '周三' },
    { id: '4', name: '周四' },
    { id: '5', name: '周五' },
    { id: '6', name: '周六' },
    { id: '7', name: '周日' }
  ],
  // status 1优 2良 3轻度 4中度 5重度
  status: [
    { id: '1', name: '优' },
    { id: '2', name: '良' },
    { id: '3', name: '轻度' },
    { id: '4', name: '中度' },
    { id: '5', name: '重度' }
  ],
  weatherIcon: ['light-rain', 'heavy-rain', 'sunrise-1', 'sunny', 'cloudy', 'cloudy-and-sunny', 'sunset', 'lightning'],
  initData: days => {
    if (!days) {
      days = 7
    }
    const list = [];
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const w = date.getDay();
    let n = 0
    for (let i = d - 1; i < d + days - 1; i++) {
      const p = {
        label: '',
        date: '',
        icon: '',
        maxTemper: CommonUtil.getRoundNum(10, 20),
        minTemper: CommonUtil.getRoundNum(0, 10),
        windLevel: CommonUtil.getRoundNum(0, 5),
        status: CommonUtil.getRoundNum(1, 5),
        statusName: ''
      };
      if (i === d - 1) {
        p.label = '昨天'
      } else if (i === d) {
        p.label = '今天'
        n = 1
      } else if (i === d + 1) {
        p.label = '明天'
      } else {
        n++
        const obj = weatherData.weeks.find(v => v.id === n + w + '')
        p.label = obj.name
      }
      p.date = ((m < 10) ? '0'+ m : m) +'/'+ ((i < 10) ? '0'+ i : i);
      p.icon = 'el-icon-' + weatherData.weatherIcon[CommonUtil.getRoundNum(0, 7)];
      // 状态
      const obj = weatherData.status.find(v => v.id === p.status+'')
      p.statusName = obj.name
      list.push(p)
    }
    return list;
  }
};
export default weatherData;
