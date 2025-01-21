window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    var url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url);
    event.prompt();
});

window.addEventListener("load", async () => {

    let rec = false;
    rec = getDefaults();
    if (rec){ loadVersions(); };
    if (rec) { LoadBooks(); };
    if (rec) { loadChapters(); };
    if (rec) { changeVersion(); };
    if (rec) { document.getElementById("id-loader").style.display = 'none'; };
    if (rec) {
        if (setTheme === '1') {
            darkTheme();
            rotateTheme = false;
        };
    };
});

async function getDefaults() {

    //  The default activeVersionID is 'id-version21', which is the Twenty-First Century Version.
    //  The default activeBookID is 'id-book1', which is Genesis.
    //  The default activeChapterID is 'id-chapter1', which is the first chapter from the book of the activeBookID.
    //  The default setTheme is '0', which is the light theme.
    //  The default activeFontSize is 1.06

    const params = new URLSearchParams(window.location.search);

    let ltr = localStorage.getItem('redLetter');
    if (ltr) { redLetterDefault = ltr; };

    let vh = params.get('vh');
    if (vh) { selectedVerseID = `id-verse${vh}`; };

    let verid = params.get('verid');
    if (verid) { activeVersionID = `id-version${verid}`; };
    if (activeVersionID === '') { activeVersionID = localStorage.getItem("activeVersionID"); };
    if (!activeVersionID) { activeVersionID = defaultVersionID };

    let bid = params.get('bid');
    if (bid) { activeBookID = `id-book${bid}`; };
    if (activeBookID === '') { activeBookID = localStorage.getItem("activeBookID"); };
    if (!activeBookID) { activeBookID = defaultBookID; };
    let cn = params.get('cn');
    if (cn) { activeChapterID = `id-chapter${cn}`; };
    if (activeChapterID === '') { activeChapterID = localStorage.getItem("activeChapterID"); };
    if (!activeChapterID) { activeChapterID = defaultChapterID; };

    setTheme = localStorage.getItem("setTheme");
    activeFontSize = localStorage.getItem("activeFontSize");
    if (!activeFontSize) { activeFontSize = 1.06; } else { activeFontSize = Number(activeFontSize); };
    activeFontSizeCount = localStorage.getItem("activeFontSizeCount");
    if (!activeFontSizeCount) { activeFontSizeCount = 0; } else { activeFontSizeCount = Number(activeFontSizeCount); };

    Promise.resolve(true);
};

async function setFontSize() {
    const allP = document.querySelectorAll('p');
    for (const ps of allP) {
        ps.style.fontSize = `${activeFontSize}rem`;
    };
};

async function loadVersions() {

    let i = 0;
    let menuVersions = document.getElementById("id-versions");
    let menuVersion = document.getElementById("id-MenuBtn1");
    let pageHeadline =  document.getElementById("id-headline");

    let div = document.createElement("div");
    div.id = 'id-versionHeader';
    div.classList.add("cs-versionHeader");
    div.textContent = 'Versions';
    menuVersions.appendChild(div);
    for (const version of versions) {
        div = document.createElement("div");
        div.addEventListener("click", () => {
            changeVersion();
            this.event.preventDefault();
            this.event.stopPropagation();
            this.event.stopImmediatePropagation();
        });
        div.id = `id-version${version.id}`;
        if (activeVersionID === div.id) {
            menuVersion.textContent = version.ar;
            pageHeadline.textContent = version.t;
        };
        div.dataset.index = i;
        div.textContent = version.t;
        div.classList.add("cs-version");
        menuVersions.appendChild(div);
        i++;
    };
    div = document.createElement("div");
    div.classList.add("cs-lastLine");
    div.textContent = '...';
    menuVersions.appendChild(div);
    Promise.resolve(true);
};

async function LoadBooks() {

    let i = 0;
    let ii = 0;
    let div;
    let div1
    let menuBooks = document.getElementById('id-books');

    removeElements('id-books');
    div = document.createElement('div');
    div.classList.add('cs-bookHeader');
    div.textContent = 'Books';

    let spa = document.createElement("span");
    spa.addEventListener("click", () => {
        sortBooks();
        this.event.preventDefault();
        this.event.stopPropagation();
        this.event.stopImmediatePropagation();
    });
    spa.classList.add('cs-sortHeader');
    spa.textContent = 'SORT';
    if (bookSort) { spa.title = 'Sort Biblically';
    } else { spa.title = 'Sort Alphabetically'; };
    div.appendChild(spa);
    menuBooks.appendChild(div);

    while (i < 39) {
        div = document.createElement('div');
        div.classList.add('cs-bookLine');
        div1 = document.createElement('div');
        div1.addEventListener("click", () => {
            changeBook();
            this.event.preventDefault();
            this.event.stopPropagation();
            this.event.stopImmediatePropagation();
        });
        div1.id = `id-book${oldBooks[i].id}`;
        div1.classList.add('cs-book');
        div1.classList.add('cs-bookRight');
        div1.dataset.bid = oldBooks[i].id;
        div1.dataset.chapters = oldBooks[i].c;
        div1.textContent = oldBooks[i].t;
        if (activeBookID === div1.id) { chapterCount = Number(div1.dataset.chapters) };
        div.appendChild(div1);

        if (ii < 27) {
            div1 = document.createElement('div');
            div1.addEventListener("click", () => {
                changeBook();
                this.event.preventDefault();
                this.event.stopPropagation();
                this.event.stopImmediatePropagation();
            });
            div1.id = `id-book${newBooks[ii].id}`;
            div1.classList.add('cs-book');
            div1.dataset.bid = newBooks[ii].id;
            div1.dataset.chapters = newBooks[ii].c;
            div1.textContent = newBooks[ii].t;
        } else {
            div1 = document.createElement('div');
            div1.classList.add('cs-endBook');
        };
        if (activeBookID === div1.id) { chapterCount = Number(div1.dataset.chapters) };
        div.appendChild(div1);
        menuBooks.appendChild(div);
        i++;
        ii++;
    };
    div = document.createElement('div');
    div.classList.add('cs-lastLine');
    div.insertAdjacentHTML('beforeend', `...`);
    menuBooks.appendChild(div);
    Promise.resolve(true);
};

async function loadChapters() {

    let menuChapters = document.getElementById('id-chapters');
    let div = document.createElement('div');
    let div1;
    let x = 0;

    removeElements('id-chapters');
    div.classList.add('cs-chapterHeader');
    div.textContent = 'Chapters';
    menuChapters.appendChild(div);
    chapterCount++;

    for (let i = 1; i < chapterCount; i++) {

        div = document.createElement('div');
        div.classList.add('cs-chapterLine');
        while (x < 5 && i < chapterCount) {
            div1 = document.createElement('div');
            div1.addEventListener("click", () => {
                changeChapter();
                this.event.preventDefault();
                this.event.stopPropagation();
                this.event.stopImmediatePropagation();
            });
            div1.id = `id-chapter${i}`;
            div1.classList.add('cs-chapter');
            div1.textContent = i;
            div.appendChild(div1);
            i++
            x++;
        };
        i = i - 1;
        x = 0;
        menuChapters.appendChild(div);
    };
    div = document.createElement('div');
    div.classList.add('cs-lastLine');
    div.textContent = '...';
    menuChapters.appendChild(div);
    Promise.resolve(true);
};

async function loadVerses() {

    let menuVerses = document.getElementById('id-verses');
    let div = document.createElement('div');
    let div1;
    let x = 0;

    removeElements('id-verses');
    div.classList.add('cs-verseHeader');
    div.textContent = 'Verses';
    menuVerses.appendChild(div);
    verseCount++;

    for (let i = 1; i < verseCount; i++) {

        div = document.createElement('div');
        div.classList.add('cs-verseLine');
        while (x < 5 && i < verseCount) {
            div1 = document.createElement('div');
            div1.addEventListener("click", () => {
                findVerse();
                this.event.preventDefault();
                this.event.stopPropagation();
                this.event.stopImmediatePropagation();
            });
            div1.id = `id-verse${i}`;
            div1.classList.add('cs-verse');
            div1.textContent = i;
            div.appendChild(div1);
            i++
            x++;
        };
        i = i - 1;
        x = 0;
        menuVerses.appendChild(div);
    };
    div = document.createElement('div');
    div.classList.add('cs-lastLine');
    div.textContent = '...';
    menuVerses.appendChild(div);
    Promise.resolve(true);
};

function JesusQuote(aVerse, vNum) {

    if (redLetterDefault) {
        aVerse = aVerse.replace('`', '<span class="cs-emphasis">');
        aVerse = aVerse.replace('´', '</span>');
    } else {
        aVerse = aVerse.replace('`', '');
        aVerse = aVerse.replace('´', '');
    };

    return `<span class="cs-verseNumber">${vNum}</span>${aVerse}`;
};

async function changeVersion() {

    let id = this.event.target.id;
    if (!id || id === 'id-resetDefaults') { id = activeVersionID };
    let aVersion = document.getElementById(id);
    let idx = Number(aVersion.dataset.index);

    try {
        const res = await fetch(`data/${versions[idx].ar}/${versions[idx].ar}Verses.json`);
        verses = await res.json();
        let holdSelectedVerseID = selectedVerseID;
        getChapter();
        selectedVerseID = holdSelectedVerseID;
        activeVersionID = aVersion.id;
        document.getElementById('id-MenuBtn1').textContent = versions[idx].ar;
        document.getElementById('id-headline').textContent = versions[idx].t;
        activeVersionAbreviation = versions[idx].ar;
        id = Number(activeVersionID.slice("id-version".length));
        setQuerystring('verid', id);
        searchIndex = null;
    } catch (error) {
        alert('Error Accessing Internet!')
        //alert('The file for this Bible version has not been retrieved from the server yet. To access this file you must connect to the internet. Once it has been fetched from the internet, it will then be available offline for future use.');
    };
    closeBoxes();
    if (selectedVerseID) {
        if (isNumeric(selectedVerseID)) { selectedVerseID = `id-verse${selectedVerseID}`};
        verseHighlight(selectedVerseID);
    };
    if (versions[idx].ar === 'TWF') {
        document.getElementById('id-redLetter').style.display = 'block';
        document.getElementById('id-paragraphLayout').style.display = 'block';
    } else {
        document.getElementById('id-redLetter').style.display = 'none';
        document.getElementById('id-paragraphLayout').style.display = 'none';
    };
    removeElements('id-searchResults');
    document.getElementById('id-searchBox').textContent = '';
    searchIndex = null;
    boxOpen = 0;
};

function isNumeric(value) { return !isNaN(value) && !isNaN(parseFloat(value)); }

async function getChapter() {

    let activeBook = Number(activeBookID.slice("id-book".length));
    let activeChapter = Number(activeChapterID.slice("id-chapter".length));
    let i = verses.findIndex(rec => rec.bid === activeBook && rec.cn === activeChapter);

    removeElements('id-page');
    let h2 = document.createElement('h2');
    let page = document.getElementById('id-page');
    document.getElementById('id-MenuBtn2').textContent = document.getElementById(activeBookID).textContent;
    h2.textContent = `${document.getElementById(activeBookID).textContent} ${activeChapter}`;
    document.getElementById('id-bottomTitleLine').textContent = h2.textContent;
    page.appendChild(h2);

    let p;
    let pn;
    let sp;
    let spa;
    let vt;
    let vNum;

    verseCount = 0;
    while (i < verses.length && verses[i].cn === activeChapter) {
        p = document.createElement('p');
        p.id = `p${verses[i].vid}`;
        pn = verses[i].pn;
        if (pn > 0 && paragraphLayoutDefault) {
            while (verses[i].pn === pn) {
                sp = document.createElement('span');
                sp.id = `id-versNumber${verses[i].vn}`;
                if (verses[i].vn === 1) { vNum = `${verses[i].vn} `;
                } else { vNum = ` ${verses[i].vn} `; };
                let aVerse = verses[i].vt;

                if (verses[i].jq === 1) { sp.innerHTML = JesusQuote(aVerse, vNum);
                } else {
                    spa = document.createElement('span');
                    spa.classList.add("cs-verseNumber");
                    spa.textContent = vNum;
                    vt = document.createTextNode(aVerse);
                    sp.appendChild(spa);
                    sp.appendChild(vt);
                };
                p.appendChild(sp);
                i++;
                verseCount++;
            };
        } else {
            sp = document.createElement('span');
            sp.id = `id-versNumber${verses[i].vn}`;
            vNum = `${verses[i].vn} `;
            let aVerse = verses[i].vt;
            if (verses[i].jq === 1) { sp.innerHTML = JesusQuote(aVerse, vNum);
            } else {
                spa = document.createElement('span');
                spa.classList.add("cs-verseNumber");
                spa.textContent = vNum;
                vt = document.createTextNode(aVerse);
                sp.appendChild(spa);
                sp.appendChild(vt);
            };
            p.classList.add("cs-singleVerse");
            p.appendChild(sp);
            i++;
            verseCount++;
        };
        page.appendChild(p);
    };
    loadVerses();
    if (activeBook === 1 && activeChapter === 1) { document.getElementById('id-bottomLastLine').style.visibility = 'hidden'; } else { document.getElementById('id-bottomLastLine').style.visibility = 'visible'; };

    if (activeBook === 66 && activeChapter === 22) { document.getElementById('id-bottomNextLine').style.visibility = 'hidden'; } else { document.getElementById('id-bottomNextLine').style.visibility = 'visible'; };
    setFontSize();
    document.getElementById('id-MenuBtn3').textContent = `${document.getElementById(activeChapterID).textContent}:`;
    setQuerystring('bid', activeBook);
    setQuerystring('cn', activeChapter);
    document.getElementById('id-MenuBtn4').textContent = '1';
    removeQueryParam('vh');
    selectedVerseID = ``;
};

function removeElements(id) {

    let target = document.getElementById(id);
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    };
};

function setQuerystring(key, value) {

    let url = new URL(window.location);
    let params = new URLSearchParams(url.search);

    url.searchParams.set(key, value);
    if (params.has(key)) {
        window.history.replaceState({}, '', url);
    } else {
        window.history.pushState({}, '', url);
    };
};

function removeQueryParam(param) {
    var url = new URL(window.location.href);
    url.searchParams.delete(param);
    window.history.replaceState({}, '', url);
};

function verseHighlight(id) {

    let vh = document.getElementById(id).textContent;
    document.getElementById('id-MenuBtn4').textContent = vh;
    let selectedVerseNumberID = `id-versNumber${vh}`;
    const spa = document.getElementById(selectedVerseNumberID);
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(spa);
    selection.removeAllRanges();
    selection.addRange(range);
    spa.scrollIntoView({ block: 'center' });
    closeBoxes();
    boxOpen = 0;
    setQuerystring('vh', vh);
};
