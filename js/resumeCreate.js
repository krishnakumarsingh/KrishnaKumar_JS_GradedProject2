function Quiz(items) {
    this.data = items;
    this.index = 0;
};

Quiz.prototype.loadResume = function () {
    this.loadContainer();
};

Quiz.prototype.createList = function (ele) {
    let asideHTML = "";
    this.data.asideFeature.forEach(item => {
        let listHTML = "";
        item.list.forEach(item => listHTML += `<li>${item.link ? `<a href=${item.linkPath}>${item.text}</a>` : item.text}</li>`)
        asideHTML += `<div class="resume-main-aside-feature">
                <p>${item.heading}</p>
                <ul>
                    ${listHTML}
                </ul>
            </div>`;
    });
    ele.innerHTML = asideHTML;
};

Quiz.prototype.createresumeMainSection = function (ele) {
    let detailsHTML = "";
    this.data.details.forEach(item => {
        let listHTML = "";
        let listLi = "";
        item.list.forEach(i => listLi += `<li><label>${i.label ? i.label+':' : ''}</label> ${i.text}</li>`);
        
        item.list.forEach(i => {
            listHTML += `<div>
                ${i.label === "" ? "" : `<label>${i.label}:</label>`}
                <span>${i.text}</span>
            </div>`});
        detailsHTML += `<div class="resume-main-section-details">
            <h2>${item.headline}</h2>
            ${item.listStyle ? `<div><ul>${listLi}</ul></div>` : listHTML}
        </div>`;
    });
    ele.innerHTML = detailsHTML;
};

Quiz.prototype.loadList = function () {
    const aside = document.getElementById("aside");
    const resumeMainSection = document.getElementById("resumeMainSection");

    this.createList(aside);
    this.createresumeMainSection(resumeMainSection);
}

Quiz.prototype.loadContainer = function () {
    const resumeItem = document.getElementById("resumeItem");
    // if(this.data) {
        let html = `<div class="resume-item-header">
                <div class="resume-item-header-text">
                    <h2 id="name">${this.data.name}</h2>
                    <h3 id="headline">Applied For : ${this.data.job}</h3>
                </div>
                <div class="resume-item-header-img" id="img">
                    <img src="${this.data.img}" alt="Img" />
                </div>
            </div>
            <div class="resume-main">
                <aside class="resume-main-aside">
                    <div id="aside"></div>
                </aside>
                <section class="resume-main-section" id="resumeMainSection"></section>
            </div>`;
        resumeItem.innerHTML = html;
        this.loadList();
    // }
}
