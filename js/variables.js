var TWFopen = true;
var TWFmsg = `The Twenty-First Century version of the Bible is being actively edited. You may not want to use it as your definitive source for God's word just yet. If you click on the About Twenty-First Century Version link below, you will find a table that lists the editing status of each chapter. But there are 67 other versions of the Bible availble in The Ark Bible.`;

var allLoaded = false;
var boxesOpen = false;
var boxOpen = 0;
var bookSort = false;
var chapterCount = 0;
var paragraphLayoutDefault = 0;
var redLetterDefault = 0;
var rotateTheme = true;
var serviceMovieBoxOpen = false;
var serviceMovieBox = '';
var setTheme = '0';
var verses = [];
var verseCount = 0;

var defaultBookID = `id-book1`;
var defaultChapterID = `id-chapter1`;
var defaultFontSize = 1.06;
var defaultVersionID = `id-version21`; // Version Defaults: KJV = 15, TWF = 21

var activeFontSizeCount = 0;
var activeFontSize = defaultFontSize;
var activeBookID = '';
var activeChapterID = '';
var activeVersionID = '';

var savedLocal = false;
var searchOpen = false;
var searchIndex = null;
var searchResults;
var searchData;
var searchResultIndex = 0;
var selectedVerseID = '';

var oldBooks = [
    {
        "c": 50,
        "id": 1,
        "t": "Genesis"
    },
    {
        "c": 40,
        "id": 2,
        "t": "Exodus"
    },
    {
        "c": 27,
        "id": 3,
        "t": "Leviticus"
    },
    {
        "c": 36,
        "id": 4,
        "t": "Numbers"
    },
    {
        "c": 34,
        "id": 5,
        "t": "Deuteronomy"
    },
    {
        "c": 24,
        "id": 6,
        "t": "Joshua"
    },
    {
        "c": 21,
        "id": 7,
        "t": "Judges"
    },
    {
        "c": 4,
        "id": 8,
        "t": "Ruth"
    },
    {
        "c": 31,
        "id": 9,
        "t": "1 Samuel"
    },
    {
        "c": 24,
        "id": 10,
        "t": "2 Samuel"
    },
    {
        "c": 22,
        "id": 11,
        "t": "1 Kings"
    },
    {
        "c": 25,
        "id": 12,
        "t": "2 Kings"
    },
    {
        "c": 29,
        "id": 13,
        "t": "1 Chronicles"
    },
    {
        "c": 36,
        "id": 14,
        "t": "2 Chronicles"
    },
    {
        "c": 10,
        "id": 15,
        "t": "Ezra"
    },
    {
        "c": 13,
        "id": 16,
        "t": "Nehemiah"
    },
    {
        "c": 10,
        "id": 17,
        "t": "Esther"
    },
    {
        "c": 42,
        "id": 18,
        "t": "Job"
    },
    {
        "c": 150,
        "id": 19,
        "t": "Psalms"
    },
    {
        "c": 31,
        "id": 20,
        "t": "Proverbs"
    },
    {
        "c": 12,
        "id": 21,
        "t": "Ecclesiastes"
    },
    {
        "c": 8,
        "id": 22,
        "t": "Song of Solomon"
    },
    {
        "c": 66,
        "id": 23,
        "t": "Isaiah"
    },
    {
        "c": 52,
        "id": 24,
        "t": "Jeremiah"
    },
    {
        "c": 5,
        "id": 25,
        "t": "Lamentations"
    },
    {
        "c": 48,
        "id": 26,
        "t": "Ezekiel"
    },
    {
        "c": 12,
        "id": 27,
        "t": "Daniel"
    },
    {
        "c": 14,
        "id": 28,
        "t": "Hosea"
    },
    {
        "c": 3,
        "id": 29,
        "t": "Joel"
    },
    {
        "c": 9,
        "id": 30,
        "t": "Amos"
    },
    {
        "c": 1,
        "id": 31,
        "t": "Obadiah"
    },
    {
        "c": 4,
        "id": 32,
        "t": "Jonah"
    },
    {
        "c": 7,
        "id": 33,
        "t": "Micah"
    },
    {
        "c": 3,
        "id": 34,
        "t": "Nahum"
    },
    {
        "c": 3,
        "id": 35,
        "t": "Habakkuk"
    },
    {
        "c": 3,
        "id": 36,
        "t": "Zephaniah"
    },
    {
        "c": 2,
        "id": 37,
        "t": "Haggai"
    },
    {
        "c": 14,
        "id": 38,
        "t": "Zechariah"
    },
    {
        "c": 4,
        "id": 39,
        "t": "Malachi"
    }
];

var newBooks = [
    {
        "c": 28,
        "id": 40,
        "t": "Matthew"
    },
    {
        "c": 16,
        "id": 41,
        "t": "Mark"
    },
    {
        "c": 24,
        "id": 42,
        "t": "Luke"
    },
    {
        "c": 21,
        "id": 43,
        "t": "John"
    },
    {
        "c": 28,
        "id": 44,
        "t": "Acts"
    },
    {
        "c": 16,
        "id": 45,
        "t": "Romans"
    },
    {
        "c": 16,
        "id": 46,
        "t": "1 Corinthians"
    },
    {
        "c": 13,
        "id": 47,
        "t": "2 Corinthians"
    },
    {
        "c": 6,
        "id": 48,
        "t": "Galatians"
    },
    {
        "c": 6,
        "id": 49,
        "t": "Ephesians"
    },
    {
        "c": 4,
        "id": 50,
        "t": "Philippians"
    },
    {
        "c": 4,
        "id": 51,
        "t": "Colossians"
    },
    {
        "c": 5,
        "id": 52,
        "t": "1 Thessalonians"
    },
    {
        "c": 3,
        "id": 53,
        "t": "2 Thessalonians"
    },
    {
        "c": 6,
        "id": 54,
        "t": "1 Timothy"
    },
    {
        "c": 4,
        "id": 55,
        "t": "2 Timothy"
    },
    {
        "c": 3,
        "id": 56,
        "t": "Titus"
    },
    {
        "c": 1,
        "id": 57,
        "t": "Philemon"
    },
    {
        "c": 13,
        "id": 58,
        "t": "Hebrews"
    },
    {
        "c": 5,
        "id": 59,
        "t": "James"
    },
    {
        "c": 5,
        "id": 60,
        "t": "1 Peter"
    },
    {
        "c": 3,
        "id": 61,
        "t": "2 Peter"
    },
    {
        "c": 5,
        "id": 62,
        "t": "1 John"
    },
    {
        "c": 1,
        "id": 63,
        "t": "2 John"
    },
    {
        "c": 1,
        "id": 64,
        "t": "3 John"
    },
    {
        "c": 1,
        "id": 65,
        "t": "Jude"
    },
    {
        "c": 22,
        "id": 66,
        "t": "Revelation"
    }
];

// Placeholder for TWF Version
var TWF = {
    "ar": "TWF",
    "id": 21,
    "t": "Twenty-First Century Version"
};
var versions = [
    {
        "ar": "AKJ",
        "id": 1,
        "t": "American King James Version"
    },
    {
        "ar": "ASV",
        "id": 2,
        "t": "American Standard Version"
    },
    {
        "ar": "AKV",
        "id": 3,
        "t": "Authorized King James Version"
    },
    {
        "ar": "BSB",
        "id": 4,
        "t": "Berean Standard Bible"
    },
    {
        "ar": "BBE",
        "id": 5,
        "t": "Bible in Basic English"
    },
    {
        "ar": "BBB",
        "id": 6,
        "t": "Bishop's Bible"
    },
    {
        "ar": "CBV",
        "id": 7,
        "t": "Coverdale Bible"
    },
    {
        "ar": "DBY",
        "id": 8,
        "t": "Darby English Bible"
    },
    {
        "ar": "DRB",
        "id": 10,
        "t": "Douay-Rheims Bible"
    },
    {
        "ar": "FBV",
        "id": 12,
        "t": "Free Bible Version"
    },
    {
        "ar": "GNV",
        "id": 13,
        "t": "Geneva Bible"
    },
    {
        "ar": "KJV",
        "id": 15,
        "t": "King James Version"
    },
    {
        "ar": "NWB",
        "id": 18,
        "t": "Noah Webster's Bible"
    },
    {
        "ar": "SLT",
        "id": 19,
        "t": "Smith's Literal Translation"
    },
    {
        "ar": "T4T",
        "id": 20,
        "t": "Translation for Translators"
    },
    {  // Placeholder for TWF Version
        "ar": "TWF",
        "id": 21,
        "t": "Twenty-First Century Version"
    },
    {
        "ar": "WEB",
        "id": 25,
        "t": "World English Bible"
    },
    {
        "ar": "YLT",
        "id": 26,
        "t": "Young's Literal Translation"
    },
    // Non-English Versions begin at 2000
    {
        "ar": "ALB",
        "id": 2002,
        "t": "Albanian (Shqip) Bible"
    },
    {
        "ar": "AVD",
        "id": 2003,
        "t": "Arabic (العربية) Smith Van Dyke"
    },
    {
        "ar": "CUS",
        "id": 2006,
        "t": "Chinese Union (Simplified)"
    },
    {
        "ar": "CUT",
        "id": 2007,
        "t": "Chinese Union (Traditional)"
    },
    {
        "ar": "CZK",
        "id": 2008,
        "t": "Czech Bible Kralicka"
    },
    {
        "ar": "DSV",
        "id": 2009,
        "t": "Dutch Staten Vertaling"
    },
    {
        "ar": "FIN",
        "id": 2010,
        "t": "Finnish Bible Version (1776)"
    },
    {
        "ar": "FLB",
        "id": 2011,
        "t": "French La Bible de l'Épée (2005)"
    },
    {
        "ar": "FLS",
        "id": 2012,
        "t": "French Louis Segond Version (1910)"
    },
    {
        "ar": "FMT",
        "id": 2013,
        "t": "French Martin Version (1744)"
    },
    {
        "ar": "FOS",
        "id": 2014,
        "t": "French Ostervald Version (1996)"
    },
    {
        "ar": "GEL",
        "id": 2015,
        "t": "German Elberfelder Version (1871)"
    },
    {
        "ar": "GER",
        "id": 2016,
        "t": "German Elberfelder Version (1905)"
    },
    {
        "ar": "GLB",
        "id": 2017,
        "t": "German Luther Bible (1545)"
    },
    {
        "ar": "GLU",
        "id": 2018,
        "t": "German Luther Bible (1912)"
    },
    {
        "ar": "GSH",
        "id": 2019,
        "t": "German Schlachter Bibel (1951)"
    },
    {
        "ar": "HIR",
        "id": 2023,
        "t": "Hindi Indian Revised Version (2017/2018)"
    },
    {
        "ar": "HKV",
        "id": 2024,
        "t": "Hungarian Karoli Version"
    },
    {
        "ar": "ITB",
        "id": 2025,
        "t": "Indonesian Terjemahan Baru (1994)"
    },
    {
        "ar": "ITL",
        "id": 2026,
        "t": "Indonesian Terjemahan Lama"
    },
    {
        "ar": "ITV",
        "id": 2027,
        "t": "Italian Diodati Version (1649)"
    },
    {
        "ar": "JBY",
        "id": 2028,
        "t": "Japanese Bungo-yaku: Taisho-kaiyaku (NT) (1950), Meiji-yaku (OT) (1950/1953)"
    },
    {
        "ar": "JKY",
        "id": 2029,
        "t": "Japanese Kougo-yaku (1954/1955)"
    },
    {
        "ar": "KBQ",
        "id": 2030,
        "t": "Kamano-Kafe Bible"
    },
    {
        "ar": "KBV",
        "id": 2031,
        "t": "Korean Bible Version"
    },
    {
        "ar": "MAO",
        "id": 2032,
        "t": "Maori Bible Version"
    },
    {
        "ar": "OPT",
        "id": 2033,
        "t": "Old Persian Translation (1895)"
    },
    {
        "ar": "PBN",
        "id": 2034,
        "t": "Polish NOWEJ BIBLII GDANSKIEJ (2012)"
    },
    {
        "ar": "PBV",
        "id": 2036,
        "t": "Polska Biblia Gdanska (1881)"
    },
    {
        "ar": "PTB",
        "id": 2037,
        "t": "Portuguese Biblia Livre"
    },
    {
        "ar": "PTA",
        "id": 2038,
        "t": "Portuguese Tradução de João Ferreira de Almeida Revista e Atualizada"
    },
    {
        "ar": "PTC",
        "id": 2039,
        "t": "Portuguese Tradução de João Ferreira de Almeida Revista e Corrigida"
    },
    {
        "ar": "RCV",
        "id": 2040,
        "t": "Romanian Cornilescu Version"
    },
    {
        "ar": "RSB",
        "id": 2042,
        "t": "Russian Synodal Bible (1876)"
    },
    {
        "ar": "SRV",
        "id": 2043,
        "t": "Spanish Reina Valera (1909)"
    },
    {
        "ar": "SRG",
        "id": 2044,
        "t": "Spanish Reina Valera Gómez (2004)"
    },
    {
        "ar": "SRZ",
        "id": 2045,
        "t": "Spanish Reina Valera Gómez (2010)"
    },
    {
        "ar": "SSE",
        "id": 2047,
        "t": "Spanish Sagradas Escrituras (1569)"
    },
    {
        "ar": "TAB",
        "id": 2049,
        "t": "Tagalog Ang Biblia (1905)"
    },
    {
        "ar": "TVB",
        "id": 2051,
        "t": "Turkish Bible Version"
    },
    {
        "ar": "VCV",
        "id": 2052,
        "t": "Vietnamese Cadman Version (1934)"
    },
    // End Non English Versions

    //  Strong's Versions begin at 3000
        {
                "ar": "ASVS",
                "id": 3001,
                "t": "American Standard Version w/Strong's"
            },
            {
                "ar": "CUSS",
                "id": 3002,
                "t": "Chinese Union (Simplified) w/Strong's - 中國聯合會（簡體）Zhōngguó liánhé huì (jiǎntǐ)"
            },
            {
                "ar": "CUTS",
                "id": 3003,
                "t": "Chinese Union (Traditional) w/Strong's - 繁体中文聯合 Fántǐ zhōngwén liánhé"
            },
            {
                "ar": "KJVS",
                "id": 3004,
                "t": "King James Version w/Strong's (1611/1769)"
            },
            {
                "ar": "SRVS",
                "id": 3005,
                "t": "Spanish Reina Valera w/Strong's - Reina Valera española (1909)"
            }
    //  End of Strong's Versions
];