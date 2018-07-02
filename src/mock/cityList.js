module.exports = {
    method: 'GET',
    path: '/admin/crmdatareport/getTradeData',
    response: {
      code: 200,
      msg: 'success',
      data: [
        {
            "name": "南京",
            'id': 1
        },
        {
            "name": "上海",
            'id': 2
        },
        {
            "name": "杭州",
            'id': 3
        },
        {
            "name": "北京",
            'id': 4
        },
        {
            "name": "武汉",
            'id': 5
        }
    ]
  }
}
