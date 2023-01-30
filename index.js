// 模拟数据构造
const arr = [];
const nameArr = ['Alice', 'July', 'Roman', 'David', 'Sara', 'Lisa', 'Mike'];
for (let i = 0; i < 10000; i++) {
  arr.push({
    number: i + 1,
    name: `${nameArr[i % nameArr.length]}`,
  });
}

const wrapper = document.getElementById('infinite-wrapper'); //滚动监听容器
const container = document.getElementById('list'); //可视数据容器
const itemSize = 30, //每个元素的高度
  itemCount = 10, //可视窗口展示的条数
  bufferCount = 3, //缓存元素数量
  bufferSize = bufferCount * itemSize; //缓存区大小

// 根据数据量设置容器总高度
wrapper.style.height = `${arr.length * itemSize}px`;

/**
 * @method handleScroll
 * @description: 滚动事件监听：获取scrollTop，根据它获取数据，偏移可视窗口容器
 * @param {HTMLBodyElement} element scrollTop的元素
 */
const handleScroll = (element) => {
  const { scrollTop } = element;
  // 计算当前数据起止index
  const _startIndex = Math.floor(scrollTop / itemSize) - bufferCount;
  const _endIndex = _startIndex + itemCount + bufferCount * 2;

  // 起止index映射到数据中
  const startIndex = Math.max(_startIndex, 0);
  const endIndex = Math.min(_endIndex, arr.length);

  renderList(arr.slice(startIndex, endIndex));

  // 可视窗口容器偏移
  container.style.transform = `translateY(${
    _startIndex < 0 ? 0 : scrollTop - bufferSize - (scrollTop % itemSize)
  }px)`;
};
/**
 * @method renderList
 * @description: 渲染可视数据
 * @param {Array} data 筛选后的数据，可直接加载显示的数据
 */
const renderList = (data) => {
  //文档片段
  const fragment = document.createDocumentFragment();
  data.forEach((item) => {
    const li = document.createElement('li');
    li.className = item.number % 2 === 0 ? 'green-item' : 'red-item'; //奇偶行元素不同色
    const text = document.createTextNode(
      `${`${item.number}`.padStart(7, '0')}-${item.name}`
    );
    li.appendChild(text);
    fragment.appendChild(li);
  });
  // 移除所有节点
  Array.from(container.children).forEach((item) => container.removeChild(item));
  //重新添加子节点
  container.appendChild(fragment);
};

// 可视数据初始化
renderList(arr.slice(0, itemCount + bufferCount));
