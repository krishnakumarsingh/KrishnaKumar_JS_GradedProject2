function Filter() {
    this.data = {};
    this.index = 0;
};

Filter.prototype.loadResume = function () {
    console.log(this.data);
    const quiz = new Quiz(this.data[this.index]);
    quiz.loadResume();
}

Filter.prototype.loadResumeData = function () {
    return fetch("./data/resume.json")
        .then(data => {
            return data.json();
        })
        .then(y => this.data = y)
        .then(() => this.loadFilterContainer());
};

Filter.prototype.nextResume = function () {
    if(filter.index === filter.data.length - 1) return;
    filter.index += 1;
    filter.loadFilterContainer();
};

Filter.prototype.prevResume = function () {
    if(filter.index === 0) return;
    filter.index -= 1;
    filter.loadFilterContainer();
};

Filter.prototype.searchResume = function (searchText) {
    let filterData = filter.data;
    const searchTextT = searchText && searchText.target.value && searchText.target.value.toLowerCase();
    let currentData = filterData.filter(item => {
        const job = item.job && item.job.toLowerCase();
        return job && job.includes(searchTextT);
    });
    filter.data = currentData;
    filter.loadFilterBtn();
    filter.loadResume();
};

Filter.prototype.resumeEventBind = function () {
    const nextResume = document.getElementById("nextResume");
    const prevResume = document.getElementById("prevResume");
    const searchResume = document.getElementById("searchResume");
    if(nextResume) nextResume.addEventListener("click", this.nextResume);
    if(prevResume) prevResume.addEventListener("click", this.prevResume);
    if(searchResume) searchResume.addEventListener("keyup", this.searchResume);
};

Filter.prototype.loadFilterBtn = function () {
    const prev = `<button id="prevResume" class="${this.data && this.index === 0 ? 'hide' : ''}">Previous</button>`;
    const nxt = `<button id="nextResume" class="${this.data && this.data.length - 1 === this.index ? 'hide' : ''}">Next</button>`;
    const prevWrap = document.getElementById("prevWrap");
    const nxtWrap = document.getElementById("nxtWrap");
    prevWrap.innerHTML = prev;
    nxtWrap.innerHTML = nxt;
};

Filter.prototype.loadFilterContainer = function () {
    console.log("Data::", this.data);
    const filterContainer = document.getElementById("filterContainer");
    let html = `<div id="prevWrap"></div>
            <input type="text" name="search" id="searchResume" placeholder="Search for keywords to filter the result" />
            <div id="nxtWrap"></div>`;
    filterContainer.innerHTML = html;
    this.loadFilterBtn();
    this.resumeEventBind();
    this.loadResume();
};

const filter = new Filter();
filter.loadResumeData();