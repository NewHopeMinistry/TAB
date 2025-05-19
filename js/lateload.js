
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

    const params = new URLSearchParams(window.location.search);
    let vh = params.get('vh');
    let holdSelectedVerseID;
    if (vh) { holdSelectedVerseID = `id-verse${vh}`; };
    closeBoxes();
    removeQueryParam('vh');
    selectedVerseID = ``;
    let ID = this.event.target.id;
    let id = '';

    switch (ID) {
        case "id-MenuBtn1":
            id = 'id-versions';
            if  (boxOpen === 1) { boxOpen = 0; return; };
            if (vh) {
                setQuerystring('vh', vh);
                selectedVerseID = holdSelectedVerseID;
            };
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
    verseHighlight(id);
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
    document.documentElement.style.setProperty('--lighterMaroonEmphasis', '#ba0e0e');
    document.documentElement.style.setProperty('--navyEmphasis', 'navy');
    document.documentElement.style.setProperty('--searchResults', '#ba0e0e');
    document.documentElement.style.setProperty('--gradientLight', '#0064d9');
    document.documentElement.style.setProperty('--gradientDark', '#11428c');
};

function darkTheme() {
    document.documentElement.style.setProperty('--bodyBackground', '#3d3636');
    document.documentElement.style.setProperty('--bannerBackground', '#1a0303');
    document.documentElement.style.setProperty('--mainBackground', '#473e3e');
    document.documentElement.style.setProperty('--blackText', '#dcdde4');
    document.documentElement.style.setProperty('--whiteText', '#dcdde4');
    document.documentElement.style.setProperty('--lighterMaroonEmphasis', '#f3d3d3');

    document.documentElement.style.setProperty('--verseNumber', '#709cdf');
    document.documentElement.style.setProperty('--navyEmphasis', '#709cdf');
    document.documentElement.style.setProperty('--searchResults', '#fa4d4d');
    document.documentElement.style.setProperty('--gradientLight', '#5d656e');
    document.documentElement.style.setProperty('--gradientDark', '#010914');
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

    const bottom = document.getElementById("id-endFontScroll");
    bottom.scrollIntoView({ behavior: "instant", block: "end" });
};

function updateQueryParams(removeParams, addParams) {
    var url = new URL(window.location.href);
    // Remove specified query parameters
    removeParams.forEach(param => url.searchParams.delete(param));
    // Add new query parameters
    Object.keys(addParams).forEach(key => url.searchParams.set(key, addParams[key]));
    // Update the URL without reloading the page
    window.history.replaceState({}, '', url);
};
/*
async function unregisterServiceWorkers() {

    if ('serviceWorker' in navigator) {
            try {
                const registrations = await navigator.serviceWorker.getRegistrations();
                if (registrations.length > 0) {
                    const keys = await caches.keys();
                    await Promise.all(keys.map(async (key) => { await caches.delete(key); }));
                    for (const registration of registrations) {
                        const unregistered = await registration.unregister();
                        console.log('Service worker unregistered:', unregistered);
                    };
                };
                alert('Changes to your data storage will take effect after you restart the browser with an active internet connection!');
            } catch (error) {
                console.error('Error during unregistering:', error);
            };
    };
};*/

function resetDefaults() {

    const svg = document.getElementById('id-svg');
    const svg1 = document.getElementById('id-svgRotate');
    svg.style.visibility = 'hidden';
    svg1.style.visibility = 'visible';
    lightTheme();
    rotateTheme = true;
    changeFontSize('d');
    localStorage.removeItem('setTheme');
    localStorage.removeItem('savedLocal');
    localStorage.removeItem('activeFontSizeCount');
    localStorage.removeItem('activeFontSize');
    localStorage.removeItem('activeBookID');
    localStorage.removeItem('activeChapterID');
    localStorage.removeItem('activeVersionID');
    localStorage.removeItem('redLetter');
    document.getElementById('id-redLetter').textContent = 'Red Letter';
    redLetterDefault = 0;
    localStorage.removeItem('paragraphLayout');
    document.getElementById('id-paragraphLayout').textContent = 'Paragraph Layout';
    paragraphLayoutDefault = 0;
    removeQueryParam('vh');
    activeVersionID = defaultVersionID;
    activeBookID = defaultBookID;
    activeChapterID = defaultChapterID;
    changeVersion();
    document.getElementById('top').scrollIntoView({ block: 'start' });
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

function redLetter() {

    if (redLetterDefault) {
        document.getElementById('id-redLetter').textContent = 'Red Letter';
        redLetterDefault = 0;
    } else {
        document.getElementById('id-redLetter').textContent = 'Black Letter';
        redLetterDefault = 1;
    };
    getChapter();
    localStorage.setItem("redLetter", redLetterDefault);
};

function paragraphLayout() {

    if (paragraphLayoutDefault) {
        document.getElementById('id-paragraphLayout').textContent = 'Paragraph Layout';
        paragraphLayoutDefault = 0;
    } else {
        document.getElementById('id-paragraphLayout').textContent = 'Line Layout';
        paragraphLayoutDefault = 1;
    };
    getChapter();
    localStorage.setItem("paragraphLayout", paragraphLayoutDefault);
};