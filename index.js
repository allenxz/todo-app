// 清空list
function clearList () {
  let _list = document.querySelector('.todo-list')
  _list.innerHTML = ''
}

// 渲染列表
function renderList (node, list) {
  for (let key in list) {
    renderSingleItem(node,list,key)
  }
}

// 渲染单一项
function renderSingleItem (node,list,key) {
  let span = document.createElement('span')
  span.innerHTML = key
  span.className = 'todo__content'
  let li = document.createElement('li')
  li.className = list[key] === 1 ? 'todo' : 'todo todo--completed'
  li.appendChild(span)
  // 可用事件委托进行优化
  li.addEventListener('click',()=>{
    let list = JSON.parse(localStorage.getItem('todo-app'))
    li.className = li.className === 'todo'? 'todo todo--completed': 'todo'
    list[key] = -list[key]
    localStorage.setItem('todo-app',JSON.stringify(list))
  })
  node.appendChild(li)
}

// 初始化
let flag = localStorage.getItem('todo-app')
if (!flag) {
  localStorage.setItem('todo-app',JSON.stringify(config.list))
}

// 注入title
let _title = document.querySelector('.todo-title')
_title.innerHTML = config.name

// 注入list
let _list = document.querySelector('.todo-list')
let content = JSON.parse(localStorage.getItem('todo-app'))
renderList(_list,content)

// 处理新增todo项
let addTrigger = document.querySelector('.add-todo__btn')
addTrigger.addEventListener('click', ()=> {
  let todoText = document.querySelector('.add-todo__input').value
  // 新增项本地持久化
  let list = JSON.parse(localStorage.getItem('todo-app'))
  list[todoText] = 1
  localStorage.setItem('todo-app',JSON.stringify(list))
  renderSingleItem(_list,list,todoText)
  document.querySelector('.add-todo__input').value = ''
})

// 绑定重置事件
let resetTrigger = document.querySelector('#reset')
resetTrigger.addEventListener('click',()=>{
  let list = JSON.parse(localStorage.getItem('todo-app'))
  // 重置标记
  for(let key in list){
    list[key]= 1
  }
  clearList()
  renderList(_list,list)
  localStorage.setItem('todo-app',JSON.stringify(list))
})

// 绑定初始化事件
let initTrigger = document.querySelector('#init')
initTrigger.addEventListener('click',()=>{
  clearList()
  renderList(_list,config.list)
  localStorage.setItem('todo-app',JSON.stringify(config.list))
})