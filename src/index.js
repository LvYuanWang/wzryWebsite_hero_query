(async function () {
  /**
 * 从网络获取当前的英雄数据
 * @returns Promise
 */
  async function getHeroes() {
    return fetch('https://study.duyiedu.com/api/herolist')
      .then((resp) => resp.json())
      .then((resp) => resp.data.reverse());
  }
  function $(select) {
    return document.querySelector(select);
  };
  const doms = {
    ul: $('.list'),
    item: document.querySelectorAll('.item'),
    input: $('.keyword input')
  }
  // 初始化
  const allHeroes = await getHeroes();
  setHeroesHTML(allHeroes);
  /**
   * 根据指定的英雄数组,生成对应的html,放入到ul中
   * @param {*} heroes 
   */
  function setHeroesHTML(heroes) {
    doms.ul.innerHTML = heroes.map(item => {
      return `<li>
        <a href="https://pvp.qq.com/web201605/herodetail/${item.ename}.shtml" target="_blank">
          <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg" alt=${item.cname} title=${item.title}>
          <span>${item.cname}</span>
        </a>
      </li>`
    }).join('');
  }
  // 交互事件
  for (const radio of doms.item) {
    radio.addEventListener('click', function () {
      // 1. 更改radio里的属性
      setChoose(this);
      // 2. 更改ul中的数据
      setUlHTML(this);
    })
  }
  // 搜索事件
  doms.input.addEventListener('input', function () {
    const keyword = allHeroes.filter(item => item.cname.includes(this.value.trim()));
    setHeroesHTML(keyword);
    setChoose($('.item[data-type="all"]'));
  })
  /**
   * 设置某个被选中的元素
   * @param {*} radio 
   */
  function setChoose(radio) {
    const active = $('.active');
    active && active.classList.remove('active');
    radio.classList.add('active');
  }
  /**
   * 根据当前选中的类型数组重新渲染ul
   * @param {*} radio 
   */
  function setUlHTML(radio) {
    const dataType = radio.dataset.type;
    const dataValue = radio.dataset.value;
    let heroesArr;
    if (dataType === 'all') {
      heroesArr = allHeroes;
    } else if (dataType === 'pay_type') {
      heroesArr = allHeroes.filter(item => item.pay_type === +dataValue);
    } else {
      heroesArr = allHeroes.filter(item => item.hero_type === +dataValue || item.hero_type2 === +dataValue);
    }
    setHeroesHTML(heroesArr);
  }
})()
