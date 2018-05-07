//下拉列表数据
export const type = ['HTML5', 'JS', 'CSS', 'HTTP', 'React',
  'Vue', 'Node.js', 'Angular'
];
//排序方式列表
export const sortType = [{
    label: '时间',
    value: 'time'
  },
  {
    label: '重要性',
    value: 'important'
  },
  {
    label: '火热度',
    value: 'clicks'
  }
];
//表头数据
export const tableColumns=[{
    type: 'selection',
    width: 60,
    align: 'center'
},
{
    title: '题目',
    key: 'title',

},
{
    title: '类型',
    key: 'type'
},
{
    title: '点击数',
    key: 'clicks'
},
{
    title: '重要性',
    key: 'important'
},
]
