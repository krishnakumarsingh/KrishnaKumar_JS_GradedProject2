class ResumeCreate {
    constructor(items) {
        this.data = items;
        this.index = 0;
    }
};

ResumeCreate.prototype.loadResume = function () {
    this.loadContainer();
};

ResumeCreate.prototype.createSkillsList = function (ele, list) {
    let listHTML = "";
    list.forEach(item => listHTML += `<li>${item}</li>`)
    let asideSkillsHTML = `<div class="resume-main-aside-feature">
        <p>${this.data["skills"].name}</p>
        <ul>
            ${listHTML}
        </ul>
    </div>`;
    ele.innerHTML = asideSkillsHTML;
};

ResumeCreate.prototype.createList = function (ele, list) {
    let asideHTML = "";
    list.forEach(item => {
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

ResumeCreate.prototype.createresumeMainSection = function (ele, arr) {
    let detailsHTML = "";
    let arrUl = ["Internship", "education", "achievements"];
    arr.forEach(item => {
        let listHTML = "";
        const listObj = (list) => {
            let listHTML = "";
            Object.keys(list).forEach(i => listHTML += `${list[i]}, `);
            return listHTML;
        };
        if (item !== "projects") {
            Object.keys(this.data[item]).forEach(list => {
                let currentList = `<div>
                        ${item !== "achievements" ? `<label>${list}:</label>` : ""}
                        <span>${typeof this.data[item][list] === "object" ? listObj(this.data[item][list]) : this.data[item][list]}</span>
                    </div>`
                listHTML += arrUl.indexOf(item) !== -1 ? `<li>${currentList}</li>` : currentList;
            });

            detailsHTML += `<div class="resume-main-section-details">
                    <h2 class="capitalize">${item === "work" ? "Work Experience in previous company" : item}</h2>
                    ${arrUl.indexOf(item) !== -1 ? `<ul>${listHTML}</ul>` : listHTML}
            </div>`;
        } else {
            let listHTML = `<div>
                        ${`<label>${this.data[item]["name"]}:</label>`}
                        <span>${this.data[item]["description"]}</span>
                    </div>`
            detailsHTML += `<div class="resume-main-section-details">
                    <h2 class="capitalize">${item}</h2>
                    ${listHTML}
            </div>`;
        }
    });
    ele.innerHTML = detailsHTML;
};

ResumeCreate.prototype.loadList = function () {
    const aside = document.getElementById("aside");
    const skills = document.getElementById("skills");
    const interests = document.getElementById("interests");
    const resumeMainSection = document.getElementById("resumeMainSection");

    let asideFeature = [
        {
            "heading": "Personal Information",
            "list": [{
                "text": this.data["basics"].phone,
                "link": false
            }, {
                "text": this.data["basics"].email,
                "link": false
            }, {
                "text": this.data["basics"]?.["profiles"].network,
                "linkPath": this.data["basics"]["profiles"].url,
                "link": true
            }]
        }
    ];
    let createArrayMainSection = ["work", "projects", "education", "Internship", "achievements"];
    this.createList(aside, asideFeature);
    this.createSkillsList(skills, this.data["skills"]["keywords"]);
    this.createSkillsList(interests, this.data["interests"]["hobbies"]);
    this.createresumeMainSection(resumeMainSection, createArrayMainSection);
}

ResumeCreate.prototype.loadContainer = function () {
    const resumeItem = document.getElementById("resumeItem");
    let html = "";
    if (this.data) {
        html = `<div class="resume-item-header">
                <div class="resume-item-header-text">
                    <h2 id="name">${this.data["basics"].name}</h2>
                    <h3 id="headline">Applied For : ${this.data["basics"].AppliedFor}</h3>
                </div>
                <div class="resume-item-header-img" id="img">
                    <img src="${this.data["basics"].image}" alt="Img" />
                </div>
            </div>
            <div class="resume-main">
                <aside class="resume-main-aside">
                    <div id="aside"></div>
                    <div id="skills"></div>
                    <div id="interests"></div>
                </aside>
                <section class="resume-main-section" id="resumeMainSection"></section>
            </div>`;
        resumeItem.innerHTML = html;
        this.loadList();
    } else {
        html = `<div class="no-result-found">
                <img src="./assets/img/sad-face.png" />
                <h2>No such results found</h2>
            </div>`
        resumeItem.innerHTML = html;
    }
}
