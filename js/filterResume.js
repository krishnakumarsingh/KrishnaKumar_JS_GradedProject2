class Filter {
    constructor(items) {
        this.data = {};
        this.index = 0;
        this.currentData = {};
    }
};

Filter.prototype.loadResume = function () {
    const resumeCreate = new ResumeCreate(this.currentData[this.index]);
    resumeCreate.loadResume();
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
    if (filter.index === filter.data.length - 1) return;
    filter.index += 1;
    filter.loadFilterContainer();
};

Filter.prototype.prevResume = function () {
    if (filter.index === 0) return;
    filter.index -= 1;
    filter.loadFilterContainer();
};

Filter.prototype.searchResume = function (searchText) {
    let filterData = filter.data;
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
    if (nextResume) nextResume.addEventListener("click", this.nextResume);
    if (prevResume) prevResume.addEventListener("click", this.prevResume);
    if (searchResume) searchResume.addEventListener("keyup", this.searchResume);
};

Filter.prototype.loadFilterBtn = function () {
    const prevWrap = document.getElementById("prevResume");
    const nxtWrap = document.getElementById("nextResume");
    if(this.currentData.length === 0 || (this.currentData && this.index === 0)) {
        prevWrap.style.display = "none";
    } else {
        prevWrap.style.display = "block";
    }
    if(this.currentData.length === 0 || (this.currentData && this.currentData.length - 1 === this.index)) {
        nxtWrap.style.display = "none";
    } else {
        nxtWrap.style.display = "block";
    }
};

Filter.prototype.loadFilterContainer = function () {
    const logout = document.getElementById("logout");
    logout.addEventListener("click", () => {
        console.log("Logout");
        localStorage.removeItem("token");
        window.location.href = "./";
    });
    const filterContainer = document.getElementById("filterContainer");
    this.loadFilterBtn();
    this.resumeEventBind();
    this.loadResume();
};

const filter = new Filter();
filter.loadResumeData();