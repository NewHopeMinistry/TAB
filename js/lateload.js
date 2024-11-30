
function closeBoxes() {
    document.getElementById('id-versions').style.display = 'none';
    document.getElementById('id-books').style.display = 'none';
    document.getElementById('id-chapters').style.display = 'none';
    document.getElementById('id-verses').style.display = 'none';
    document.getElementById('id-randomChapter').style.backgroundColor = 'ba0e0e';
    boxesOpen = false;
};

function openBoxes() {

    this.event.preventDefault();
    this.event.stopPropagation();
    this.event.stopImmediatePropagation();

    closeBoxes();
    let ID = this.event.target.id;
    let id = '';

    switch (ID) {
        case "id-MenuBtn1":
            id = 'id-versions';
            if  (boxOpen === 1) { boxOpen = 0; return; };
            boxOpen = 1;
            break;
        case "id-MenuBtn2":
            id = 'id-books';
            if  (boxOpen === 2) { boxOpen = 0; return; };
            boxOpen = 2;
            break;
        case "id-MenuBtn3":
            id = 'id-chapters';
            if  (boxOpen === 3) { boxOpen = 0; return; };
            boxOpen = 3;
            break;
        case "id-MenuBtn4":
            id = 'id-verses';
            if  (boxOpen === 4) { boxOpen = 0; return; };
            boxOpen = 4;
            break;
        default:
            boxOpen = 0;
            return;
    };

    if (boxesOpen) {
        closeBoxes();
    } else {
        boxesOpen = true;
        document.getElementById(id).style.display = 'block';
    };

};

function changeBook() {

    activeBookID = this.event.target.id;
    activeChapterID = 'id-chapter1';
    chapterCount = Number(document.getElementById(activeBookID).dataset.chapters);
    document.getElementById('id-MenuBtn3').textContent = '1:';
    getChapter();
    loadChapters();
    closeBoxes();
    document.getElementById('top').scrollIntoView({ block: 'start' });
    boxOpen = 0;
};

function changeChapter() {

    activeChapterID = this.event.target.id;
    chapterCount = Number(document.getElementById(activeBookID).dataset.chapters);
    getChapter();
    loadChapters();
    closeBoxes();
    document.getElementById('top').scrollIntoView({ block: 'start' });
    boxOpen = 0;
};

function findVerse() {

    let id = this.event.target.id;
    let vn = document.getElementById(id).textContent
    selectedVerseID = `id-versNumber${vn}`;
    document.getElementById('id-MenuBtn4').textContent = vn;
    const spa = document.getElementById(selectedVerseID);
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(spa);
    selection.removeAllRanges();
    selection.addRange(range);
    spa.scrollIntoView({ block: 'center' });
    closeBoxes();
    boxOpen = 0;
};

function lastChapter() {

    let i = 0;
    let books = [];
    let bid = Number(document.getElementById(activeBookID).dataset.bid);

    if (bid < 40) {
        i = oldBooks.findIndex(rec => rec.id === bid);
        books = oldBooks;
    } else {
        i = newBooks.findIndex(rec => rec.id === bid);
        books = newBooks;
    };

    let chapter = Number(document.getElementById(activeChapterID).textContent) - 1;
    if (chapter < 1) { bid--; chapter = books[i -1].c; chapterCount = books[i -1].c; };
    activeBookID = `id-book${bid}`;
    activeChapterID = `id-chapter${chapter}`;
    loadChapters();
    getChapter();
    document.getElementById('top').scrollIntoView({ block: 'start' });
};

function nextChapter() {

    let i = 0;
    let books = [];
    let bid = Number(document.getElementById(activeBookID).dataset.bid);
    if (bid < 40) {
        i = oldBooks.findIndex(rec => rec.id === bid);
        books = oldBooks;
    } else {
        i = newBooks.findIndex(rec => rec.id === bid);
        books = newBooks;
    };
    let chapters = books[i].c;
    let chapter = Number(document.getElementById(activeChapterID).textContent) + 1;
    if (chapter > chapters) { bid++; chapter = 1; };
    activeBookID = `id-book${bid}`;
    activeChapterID = `id-chapter${chapter}`;
    if (bid < 40) {
        i = oldBooks.findIndex(rec => rec.id === bid);
        books = oldBooks;
    } else {
        i = newBooks.findIndex(rec => rec.id === bid);
        books = newBooks;
    };
    chapterCount = books[i].c;
    getChapter();
    loadChapters();
    document.getElementById('top').scrollIntoView({ block: 'start' });
};

function sortBooks() {

    if (bookSort) {
        oldBooks.sort((a, b) => a.id - b.id);
        newBooks.sort((a, b) => a.id - b.id);
        bookSort = false;
    } else {
        oldBooks.sort((a, b) => a.t.localeCompare(b.t));
        newBooks.sort((a, b) => a.t.localeCompare(b.t));
        bookSort = true;
    };
    LoadBooks();
};

function lightTheme() {
    document.documentElement.style.setProperty('--bodyBackground', '#f3f3f3');
    document.documentElement.style.setProperty('--bannerBackground', '#022a69');
    document.documentElement.style.setProperty('--mainBackground', 'white');
    document.documentElement.style.setProperty('--blackText', 'black');
    document.documentElement.style.setProperty('--whiteText', 'white');
    document.documentElement.style.setProperty('--verseNumber', '#0505da');
    document.documentElement.style.setProperty('--navyEmphasis', 'navy');
    document.documentElement.style.setProperty('--searchResults', '#ba0e0e');
};

function darkTheme() {
    document.documentElement.style.setProperty('--bodyBackground', '#3d3636');
    document.documentElement.style.setProperty('--bannerBackground', '#1a0303');
    document.documentElement.style.setProperty('--mainBackground', '#473e3e');
    document.documentElement.style.setProperty('--blackText', '#dcdde4');
    document.documentElement.style.setProperty('--whiteText', '#dcdde4');
    document.documentElement.style.setProperty('--verseNumber', '#fa4d4d');
    document.documentElement.style.setProperty('--navyEmphasis', '#709cdf');
    document.documentElement.style.setProperty('--searchResults', '#fa4d4d');
};

function changeTheme() {

    const svg = document.getElementById('id-svg');
    const svg1 = document.getElementById('id-svgRotate');

    if (rotateTheme) {
        svg.style.visibility = 'visible';
        svg1.style.visibility = 'hidden';
        darkTheme();
        rotateTheme = false;
        localStorage.setItem("setTheme", '1');
    } else {
        svg.style.visibility = 'hidden';
        svg1.style.visibility = 'visible';
        lightTheme();
        rotateTheme = true;
        localStorage.setItem("setTheme", '0');
    };

};

function changeFontSize(direction) {

    if (direction === '+') {
        if (activeFontSizeCount > 3) { return; };
        activeFontSize = activeFontSize * 1.15;
        activeFontSizeCount++;
    } else if (direction === '-') {
        if (activeFontSizeCount < 1) { return; };
        activeFontSize = activeFontSize / 1.15;
        activeFontSizeCount--;
    } else if (direction === 'd') {
        activeFontSize = defaultFontSize;
        activeFontSizeCount = 0;
    };
    setFontSize();

    localStorage.setItem("activeFontSizeCount", activeFontSizeCount);
    localStorage.setItem("activeFontSize", activeFontSize);

    const bottom = document.getElementById("id-bottom");
    bottom.scrollIntoView({ behavior: "instant", block: "end" });
};

function openSearch() {

    closeBoxes();
    if (searchOpen) {
        document.getElementById('id-searchContainer').style.display = 'none';
        document.getElementById('id-pageContainer').style.display = 'block';
        document.getElementById('id-menu').style.display = 'block';
        searchOpen = false;
        return;



        document.getElementById('id-mainPage').style.display = 'block';
        document.getElementById('id-settings').style.display = 'block';
        document.getElementById('id-randomChapter').style.display = 'block';
        searchOpen = false;
    } else {
        document.getElementById('id-pageContainer').style.display = 'none';
        document.getElementById('id-searchContainer').style.display = 'block';
        document.getElementById('id-menu').style.display = 'none';
        searchOpen = true;
        return;



        document.getElementById('id-mainPage').style.display = 'none';
        document.getElementById('id-settings').style.display = 'none';
        document.getElementById('id-randomChapter').style.display = 'none';
        searchOpen = true;
    };
};

function createIndex() {

    searchIndex = elasticlunr(function () {
        this.addField('vid');
        this.addField('vt');
        this.addField('bid');
        this.addField('cn');
        this.addField('vn');
        this.setRef('vid');
    });
    verses.forEach(verse => {
        let doc = {
            "vid": verse.vid,
            "vt": verse.vt,
            "bid": verse.bid,
            "cn": verse.cn,
            "vn": verse.vn
        };
        searchIndex.addDoc(doc);
    });

};

function setSearchChapter(result) {

    let i;
    let books;
    let bid = result.bid;
    let cn = result.cn;
    let vn = result.vn;

    if (bid < 40) {
        i = oldBooks.findIndex(rec => rec.id === bid );
        books = oldBooks;
    } else {
        i = newBooks.findIndex(rec => rec.id === bid );
        books = newBooks;
    };
    return `${books[i].t} ${cn}:${vn}`;
};

function getFinalResults() {

    let doc;
    let i = 0;
    let str = '';
    let str1 = '';
    let startResults = [];
    let finalResults = [];

    searchResults.forEach(function(result) {

        doc = searchIndex.documentStore.getDoc(result.ref);
        str = doc.vt;
        str = str.toUpperCase();
        str1 = searchData.toUpperCase();
        if (str.includes(str1)) { finalResults.push(doc);
        } else { startResults.push(doc); }
    });
    startResults.forEach(function(result) {

        finalResults.push(startResults[i]);
        i++;
    });
    return finalResults;
};

function getSearchVerses() {

    let a;
    let p;
    let hr;
    let vt;
    let br;
    let i = searchResultIndex + 30;

    let aSearch = document.getElementById('id-searchResults');

    let result = getFinalResults();

    if (result.length - searchResultIndex < 30) {
        i = result.length;
    };
    while (searchResultIndex < i && i <= result.length) {
        p = document.createElement('p');
        p.classList.add('cs-searchVerse');
        a = document.createElement('a');
        a.addEventListener("click", () => {
            getSearchChapter();
            this.event.preventDefault();
            this.event.stopPropagation();
            this.event.stopImmediatePropagation();
        });
        a.id = `id-searchVerse${result[searchResultIndex].vid}`;
        a.textContent = setSearchChapter(result[searchResultIndex]);
        a.dataset.bid = result[searchResultIndex].bid;
        a.dataset.cn = result[searchResultIndex].cn;
        a.dataset.vn = result[searchResultIndex].vn;
        a.classList.add('cs-searchChapter');
        p.appendChild(a);
        br = document.createElement('br');
        p.appendChild(br);
        vt = document.createTextNode(result[searchResultIndex].vt);
        p.appendChild(vt);
        aSearch.appendChild(p);
        searchResultIndex++;
    };
    hr = document.createElement('hr');
    aSearch.appendChild(hr);
    br = document.createElement('br');
    aSearch.appendChild(br);

    let z = result.length - searchResultIndex;
    if (z === 0) {
        p = document.createElement('p');
        p.textContent = `There are no more results.`;
    } else {
        a = document.createElement('a');
        a.addEventListener("click", () => {
            getMoreResults();
            this.event.preventDefault();
            this.event.stopPropagation();
            this.event.stopImmediatePropagation();
        });

        a.textContent = 'More Results';
        a.classList.add('cs-searchResults');
        aSearch.appendChild(a);
        br = document.createElement('br');
        aSearch.appendChild(br);
        br = document.createElement('br');
        aSearch.appendChild(br);
        p = document.createElement('p');
        p.textContent = `There are ${z} more results.`;
    };

    aSearch.appendChild(p);
    br = document.createElement('br');
    aSearch.appendChild(br);
    br = document.createElement('br');
    aSearch.appendChild(br);
};

function lunrSearch() {

    searchData = document.getElementById('id-searchBox').textContent;
    if (searchData === '') { return; };
    document.getElementById("id-loader").style.display = 'block';
    setTimeout(function() {

        searchResultIndex = 0;
        if (!searchIndex) { createIndex(); };
        searchResults = searchIndex.search(searchData, {});
        removeElements('id-searchResults');
        getSearchVerses();
        document.getElementById("id-loader").style.display = 'none';
    }, 30);
};

function getMoreResults() {

    document.getElementById("id-loader").style.display = 'block';
    setTimeout(function() {
        getSearchVerses();
        document.getElementById("id-loader").style.display = 'none';
    }, 30);

};

function getSearchChapter() {

    let id = this.event.target.id;
    let bid = document.getElementById(id).dataset.bid;
    let cn = document.getElementById(id).dataset.cn;
    let vn = document.getElementById(id).dataset.vn;
    document.getElementById('id-MenuBtn4').textContent = vn;

    activeBookID = `id-book${bid}`;
    activeChapterID = `id-chapter${cn}`;
    getChapter();
    openSearch();
    selectedVerseID = `id-versNumber${vn}`;
    const spa = document.getElementById(selectedVerseID);
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(spa);
    selection.removeAllRanges();
    selection.addRange(range);
    spa.scrollIntoView({ block: 'center' });
};

function readRandomChapter() {

    let min = 30640;
    let i = Math.floor(Math.random() * (0 - min + 1)) + min;
    let bid = verses[i].bid;
    let cn = verses[i].cn;

    activeBookID = `id-book${bid}`;
    activeChapterID = `id-chapter${cn}`;
    getChapter();
    document.getElementById('top').scrollIntoView({ block: 'start' });
    closeBoxes();
};
