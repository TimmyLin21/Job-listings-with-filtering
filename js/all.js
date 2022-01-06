// renderData
let allData;
let filteredData = [];
const jobList = document.querySelector('#job-list');
function renderData(data) {
  let str = '';
  data.forEach((item) => {
    const cardClass = item.featured ? 'card card-highlight mb-10' : 'card mb-10';
    const newSpan = item.new ? '<span class="badge bg-primary mr-2">New!</span>' : '';
    const featuredSpan = item.featured ? '<span class="badge bg-grayish-cyan-400">Featured</span>' : '';
    let langBtns = '';
    let toolBtns = '';
    // languages buttons
    item.languages.forEach((lang) => {
      langBtns += `<button type="button" class="btn bg-grayish-cyan-100 mr-4" data-type="languages">${lang}</button>`;
    });
    // tool buttons
    item.tools.forEach((tool) => {
      toolBtns = `<button type="button" class="btn bg-grayish-cyan-100 mr-4" data-type="tools">${tool}</button>`;
    });
    // mixed
    str += `
    <li class="${cardClass}">
      <img src="${item.logo}" alt="${item.company} logo" class="card-logo">
      <div class="card-body">
        <img src="${item.logo}" alt="${item.company} logo" class="hidden mr-6 lg:block">
        <section>
          <div class="flex items-center mb-4">
            <h3 class="mr-4 text-primary font-medium">${item.company}</h3>
            ${newSpan}
            ${featuredSpan}
          </div>
          <h2 class="text-lg text-grayish-cyan-400 font-bold mb-4 hover:text-primary cursor-pointer">${item.position}</h2>
          <div class="flex items-center pb-4 mb-4 border-b lg:border-none lg:pb-0 lg:mb-0">
            <p class="mr-2 font-header">${item.postedAt}</p>
            <ul class="flex font-header">
              <li class="mr-2 list-dot">${item.contract}</li>
              <li class="list-dot">${item.location}</li>
            </ul>
          </div>
        </section>
        <section class="lg:ml-auto">
          <button type="button" class="btn bg-grayish-cyan-100 mr-4" data-type="role">${item.role}</button>
          <button type="button" class="btn bg-grayish-cyan-100 mr-4" data-type="level">${item.level}</button>
          ${langBtns}
          ${toolBtns}        
        </section>
      </div>
    </li>
    `;
  });
  jobList.innerHTML = str;
}
// renderFilterList
const filterItems = {
  role: '',
  level: '',
  languages: [],
  tools: [],
};
const keys = Object.keys(filterItems);
function filterItemsReset() {
  filterItems.role = '';
  filterItems.level = '';
  filterItems.languages.splice(0);
  filterItems.tools.splice(0);
}
const filterList = document.querySelector('#filter-list');
function renderFilterList() {
  let str = '';
  keys.forEach((key, i) => {
    if (i <= 1) {
      if (filterItems[key]) {
        str += `
        <li class="btn-group mr-4">
          <div class="btn bg-grayish-cyan-100 rounded-r-none">${filterItems[key]}</div>
          <button type="button" class="btn-addon" data-type="${key}" data-value="${filterItems[key]}">
            <i data-type="${key}" data-value="${filterItems[key]}" class="w-[14px] h-[14px] bg-remove-icon"></i>  
          </button>
        </li>
        `;
      }
    } else if (i >= 2) {
      if (filterItems[key]) {
        filterItems[key].forEach((item) => {
          str += `
          <li class="btn-group mr-4">
            <div class="btn bg-grayish-cyan-100 rounded-r-none">${item}</div>
            <button type="button" class="btn-addon" data-type="${key}" data-value="${item}">
              <i data-type="${key}" data-value="${item}" class="w-[14px] h-[14px] bg-remove-icon"></i>
            </button>
          </li>
          `;
        });
      }
    }
  });
  filterList.innerHTML = str;
}
// filterData
function filterData() {
  keys.forEach((key, i) => {
    // 判斷資料是不是陣列
    if (i <= 1) {
      if (filterItems[key]) {
        // 判斷資料篩選過了沒有
        if (filteredData.length !== 0) {
          const filteredArr = filteredData.filter((item) => item[key] === filterItems[key]);
          filteredData = filteredArr;
        } else {
          const filteredArr = allData.filter((item) => item[key] === filterItems[key]);
          filteredData = filteredArr;
        }
      }
    } else if (i >= 2) {
      if (filterItems[key]) {
        // 因為陣列有多筆資料所以使用forEach
        filterItems[key].forEach((item) => {
          if (filteredData.length !== 0) {
            const filteredArr = filteredData.filter((data) => data[key].includes(item));
            filteredData = filteredArr;
          } else {
            const filteredArr = allData.filter((data) => data[key].includes(item));
            filteredData = filteredArr;
          }
        });
      }
    }
  });
}
// buttons eventListener
const filterCard = document.querySelector('#filterCard');
function addBtnEvent() {
  const cards = document.querySelectorAll('#job-list .card');
  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.nodeName === 'BUTTON') {
        const value = e.target.textContent;
        const type = e.target.getAttribute('data-type');
        if (filterCard.classList.contains('hidden')) {
          filterCard.classList.remove('hidden');
          filterCard.classList.add('animate','pop')
        }
        if (type === 'role') {
          filterItems.role = value;
        } else if (type === 'level') {
          filterItems.level = value;
        } else if (!filterItems[type].includes(value)) {
          filterItems[type].push(value);
        }
        filterData();
        renderData(filteredData);
        addBtnEvent();
        renderFilterList();
      }
    });
  });
}
// clear all
const clearAllBtn = document.querySelector('#clearAllBtn');
clearAllBtn.addEventListener('click', () => {
  filterItemsReset();
  filteredData.splice(0);
  filterCard.classList.add('hidden');
  filterCard.classList.remove('animate','pop');
  renderData(allData);
  addBtnEvent();
});
// remove item
filterCard.addEventListener('click', (e) => {
  if (e.target.className === 'btn-addon' || e.target.nodeName === 'I') {
    // remove the chosen item
    const value = e.target.getAttribute('data-value');
    const type = e.target.getAttribute('data-type');
    if (type === 'role') {
      filterItems.role = '';
    } else if (type === 'level') {
      filterItems.level = '';
    } else {
      const index = filterItems[type].findIndex((item) => item === value);
      filterItems[type].splice(index, 1);
    }
    // render filter again
    filteredData.splice(0);
    filterData();
    renderData(filteredData);
    addBtnEvent();
    renderFilterList();
    // close the filter while list is empty
    if (Object.values(filterItems).join('') === '') {
      filterCard.classList.add('hidden');
      filterCard.classList.remove('animate','pop');
      renderData(allData);
      addBtnEvent();
    }
  }
});
// getData
function getData() {
  // eslint-disable-next-line no-undef
  axios.get('./data.json')
    .then((res) => {
      allData = res.data;
      renderData(allData);
      addBtnEvent();
    }).catch((err) => {
      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.error(err.response);
    });
}
// initial
function init() {
  getData();
}
init();
