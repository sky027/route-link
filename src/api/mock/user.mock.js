import Mock from 'mockjs';
const Random = Mock.Random;

const starList = Mock.mock({
  'err_code':"0",
  'success_code':'200',
  'data|2-9':[{
    "carouselId|+1":1,
    "name":'@cname',
    'img':"@image('400x400','#50B347', '#FFF', 'Mock.js')",
    "description":"@cword(100,200)"
  }]
});
const user = Mock.mock({
  data: {
    "userId": Random.guid(),
    "name":'@cname',
    "isDelete|1": Random.boolean() ,
    'img':"@image('400x400','#50B347', '#FFF', 'Mock.js')",
    "description":"@cword(20, 50)",
    "sort|5000-9000": 9000,
    "dateTime": Random.datetime(),
    "image": Random.image('200x100', '#894FC4', '#FFF', 'png', '!')
  }
})

export default {
  starList,
  user
}
