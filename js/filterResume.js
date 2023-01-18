function Filter() {
    this.data = {};
    this.index = 0;
    this.currentData = {};
};

Filter.prototype.loadResume = function () {
    console.log("Hello## ", this.data, this.currentData);
    const quiz = new Quiz(this.currentData[this.index]);
    quiz.loadResume();
}

Filter.prototype.loadResumeData = function () {
    return fetch("./data/Data.json")
        .then(data => {
            return data.json();
        })
        .then(res => {
            this.data = res["resume"]
            this.currentData = this.data
        })
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
    console.log(filterData)
    const searchTextT = searchText && searchText.target.value && searchText.target.value.toLowerCase();
    let currentData = filterData.filter(item => {
        const job = item["basics"].AppliedFor && item["basics"].AppliedFor.toLowerCase();
        return job && job.includes(searchTextT);
    });
    filter.currentData = currentData;
    filter.loadFilterBtn();
    filter.resumeEventBind();
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
    const prev = `<button id="prevResume" class="${this.currentData.length === 0 || (this.currentData && this.index === 0) ? 'hide' : ''}">Previous</button>`;
    const nxt = `<button id="nextResume" class="${this.currentData.length === 0 || (this.currentData && this.currentData.length - 1 === this.index) ? 'hide' : ''}">Next</button>`;
    const prevWrap = document.getElementById("prevWrap");
    const nxtWrap = document.getElementById("nxtWrap");
    prevWrap.innerHTML = prev;
    nxtWrap.innerHTML = nxt;
};

Filter.prototype.loadFilterContainer = function () {
    console.log("Data::", this.data, this.currentData);
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