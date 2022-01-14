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
    { id: '1', name: '优', color: '#98fb03' },
    { id: '2', name: '良', color: '#83c624' },
    { id: '3', name: '轻度', color: '#f76707' },
    { id: '4', name: '中度', color: '#e03131' },
    { id: '5', name: '重度', color: '#7c0404' }
  ],
  weatherIcon: ['light-rain', 'heavy-rain', 'sunrise-1', 'sunny', 'cloudy', 'cloudy-and-sunny', 'sunset', 'lightning'],
  initData: (days, time) => {
    if (!days) {
      days = 7
    }
    const list = [];
    let date = new Date();
    if (time) {
      date = new Date(time);
    }
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
        windLevel: CommonUtil.getRoundNum(1, 5),
        status: CommonUtil.getRoundNum(1, 5),
        statusName: '',
        color: ''
      };
      if (i === d - 1) {
        p.label = '昨天';
      } else if (i === d) {
        p.label = '今天';
        n = 1
      } else if (i === d + 1) {
        p.label = '明天';
      } else {
        n++
        if (n + w > 7) {
          const obj = weatherData.weeks.find(v => v.id === ((n + w) % 7) + '');
          p.label = obj.name;
        } else {
          const obj = weatherData.weeks.find(v => v.id === (n + w) + '');
          p.label = obj.name;
        }
      }
      p.date = ((m < 10) ? '0'+ m : m) +'/'+ ((i < 10) ? '0'+ i : i);
      p.icon = 'el-icon-' + weatherData.weatherIcon[CommonUtil.getRoundNum(0, 7)];
      // 状态
      const obj = weatherData.status.find(v => v.id === p.status+'');
      p.statusName = obj.name;
      p.color = obj.color;
      list.push(p)
    }
    return list;
  }
};
export default weatherData;
