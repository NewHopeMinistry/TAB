// Fix minified text
// :abcdefghijklmnopqrstuvwxyz
// :ABCDEFGHIJKLMNOPQRSTUVWXYZ
// [\u200B\u200C\u200D\u200E\u200F\uFEFF\u2028\u2029]

const fs = require('fs');
var versions = [
    {
        "ar": "AKJ",
        "id": 1,
        "rdl": 0,
        "sch": 1,
        "t": "American King James Version"
    },
    {
        "ar": "ASV",
        "id": 2,
        "rdl": 0,
        "sch": 1,
        "t": "American Standard Version"
    },
    {
        "ar": "AKV",
        "id": 3,
        "rdl": 0,
        "sch": 1,
        "t": "Authorized King James Version"
    },
    {
        "ar": "BSB",
        "id": 4,
        "rdl": 0,
        "sch": 1,
        "t": "Berean Standard Bible"
    },
    {
        "ar": "BBE",
        "id": 5,
        "rdl": 0,
        "sch": 1,
        "t": "Bible in Basic English"
    },
    {
        "ar": "BBB",
        "id": 6,
        "rdl": 0,
        "sch": 1,
        "t": "Bishop's Bible"
    },
    {
        "ar": "CBV",
        "id": 7,
        "rdl": 0,
        "sch": 1,
        "t": "Coverdale Bible"
    },
    {
        "ar": "DBY",
        "id": 8,
        "rdl": 0,
        "sch": 1,
        "t": "Darby English Bible"
    },
    {
        "ar": "DRB",
        "id": 9,
        "rdl": 0,
        "sch": 1,
        "t": "Douay-Rheims Bible"
    },
    {
        "ar": "ERV",
        "id": 10,
        "rdl": 0,
        "sch": 1,
        "t": "English Revised Version"
    },
    {
        "ar": "FBV",
        "id": 11,
        "rdl": 0,
        "sch": 1,
        "t": "Free Bible Version"
    },
    {
        "ar": "GNV",
        "id": 12,
        "rdl": 0,
        "sch": 1,
        "t": "Geneva Bible"
    },
    {
        "ar": "KJV",
        "id": 13,
        "rdl": 0,
        "sch": 1,
        "t": "King James Version"
    },
    {
        "ar": "LSV",
        "id": 14,
        "rdl": 0,
        "sch": 1,
        "t": "Literal Standard Version"
    },
    {
        "ar": "NWB",
        "id": 15,
        "rdl": 0,
        "sch": 1,
        "t": "Noah Webster's Bible"
    },
    {
        "ar": "SLT",
        "id": 16,
        "rdl": 0,
        "sch": 1,
        "t": "Smith's Literal Translation"
    },
    {
        "ar": "T4T",
        "id": 17,
        "rdl": 0,
        "sch": 1,
        "t": "Translation for Translators"
    },
    {
        "ar": "TWF",
        "id": 18,
        "rdl": 1,
        "sch": 1,
        "t": "Twenty-First Century Version"
    },
    {
        "ar": "ULB",
        "id": 19,
        "rdl": 0,
        "sch": 1,
        "t": "Unlocked Literal Bible"
    },
    {
        "ar": "WEB",
        "id": 20,
        "rdl": 0,
        "sch": 1,
        "t": "World English Bible"
    },
    {
        "ar": "YLT",
        "id": 21,
        "rdl": 0,
        "sch": 1,
        "t": "Young's Literal Translation"
    },
    // Non-English Versions begin at 2000
        {
            "ar": "ALB",
            "id": 2001,
            "rdl": 0,
            "sch": 1,
            "t": "Albanian Bible Version - Versioni Shqip i Biblës"
        },
        {
            "ar": "AVD",
            "id": 2002,
            "rdl": 0,
            "sch": 0,
            "t": "Arabic (العربية) Smith Van Dyke"
        },
        {
            "ar": "CUS",
            "id": 2003,
            "rdl": 0,
            "sch": 0,
            "t": "Chinese Union (Simplified)"
        },
        {
            "ar": "CUT",
            "id": 2004,
            "rdl": 0,
            "sch": 0,
            "t": "Chinese Union (Traditional)"
        },
        {
            "ar": "CZK",
            "id": 2005,
            "rdl": 0,
            "sch": 1,
            "t": "Czech Bible Kralicka"
        },
        {
            "ar": "DSV",
            "id": 2006,
            "rdl": 0,
            "sch": 1,
            "t": "Dutch Staten Vertaling"
        },
        {
            "ar": "FIN",
            "id": 2007,
            "rdl": 0,
            "sch": 1,
            "t": "Finnish Bible Version (1776)"
        },
        {
            "ar": "FLB",
            "id": 2008,
            "rdl": 0,
            "sch": 1,
            "t": "French La Bible de l'Épée (2005)"
        },
        {
            "ar": "FLS",
            "id": 2009,
            "rdl": 0,
            "sch": 1,
            "t": "French Louis Segond Version (1910)"
        },
        {
            "ar": "FMT",
            "id": 2010,
            "rdl": 0,
            "sch": 1,
            "t": "French Martin Version (1744)"
        },
        {
            "ar": "FOS",
            "id": 2011,
            "rdl": 0,
            "sch": 1,
            "t": "French Ostervald Version (1996)"
        },
        {
            "ar": "GEL",
            "id": 2012,
            "rdl": 0,
            "sch": 1,
            "t": "German Elberfelder Version (1871)"
        },
        {
            "ar": "GER",
            "id": 2013,
            "rdl": 0,
            "sch": 1,
            "t": "German Elberfelder Version (1905)"
        },
        {
            "ar": "GLB",
            "id": 2014,
            "rdl": 0,
            "sch": 1,
            "t": "German Luther Bible (1545)"
        },
        {
            "ar": "GLU",
            "id": 2015,
            "rdl": 0,
            "sch": 1,
            "t": "German Luther Bible (1912)"
        },
        {
            "ar": "GSH",
            "id": 2016,
            "rdl": 0,
            "sch": 1,
            "t": "German Schlachter Bibel (1951)"
        },
        {
            "ar": "HIR",
            "id": 2017,
            "rdl": 0,
            "sch": 0,
            "t": "Hindi Indian Revised Version (2017-2018)"
        },
        {
            "ar": "HKV",
            "id": 2018,
            "rdl": 0,
            "sch": 1,
            "t": "Hungarian Karoli Version"
        },
        {
            "ar": "ITB",
            "id": 2019,
            "rdl": 0,
            "sch": 1,
            "t": "Indonesian Terjemahan Baru (1994)"
        },
        {
            "ar": "ITL",
            "id": 2020,
            "rdl": 0,
            "sch": 1,
            "t": "Indonesian Terjemahan Lama"
        },
        {
            "ar": "ITV",
            "id": 2021,
            "rdl": 0,
            "sch": 1,
            "t": "Italian Diodati Version (1649)"
        },
        {
            "ar": "JBY",
            "id": 2022,
            "rdl": 0,
            "sch": 0,
            "t": "Japanese Bungo-yaku: Taisho-kaiyaku (NT) (1950), Meiji-yaku (OT) (1950/1953)"
        },
        {
            "ar": "JKY",
            "id": 2023,
            "rdl": 0,
            "sch": 0,
            "t": "Japanese Kougo-yaku (1954-1955)"
        },
        {
            "ar": "KBQ",
            "id": 2024,
            "rdl": 0,
            "sch": 1,
            "t": "Kamano-Kafe Bible"
        },
        {
            "ar": "KBV",
            "id": 2025,
            "rdl": 0,
            "sch": 0,
            "t": "Korean Bible Version"
        },
        {
            "ar": "MAO",
            "id": 2026,
            "rdl": 0,
            "sch": 1,
            "t": "Maori Bible Version"
        },
        {
            "ar": "OPT",
            "id": 2027,
            "rdl": 0,
            "sch": 0,
            "t": "Old Persian Translation (1895)"
        },
        {
            "ar": "PBN",
            "id": 2028,
            "rdl": 0,
            "sch": 1,
            "t": "Polish NOWEJ BIBLII GDANSKIEJ (2012)"
        },
        {
            "ar": "PBV",
            "id": 2029,
            "rdl": 0,
            "sch": 1,
            "t": "Polska Biblia Gdanska (1881)"
        },
        {
            "ar": "PTB",
            "id": 2030,
            "rdl": 0,
            "sch": 1,
            "t": "Portuguese Biblia Livre"
        },
        {
            "ar": "PTA",
            "id": 2031,
            "rdl": 0,
            "sch": 1,
            "t": "Portuguese Tradução de João Ferreira de Almeida Revista e Atualizada"
        },
        {
            "ar": "PTC",
            "id": 2032,
            "rdl": 0,
            "sch": 1,
            "t": "Portuguese Tradução de João Ferreira de Almeida Revista e Corrigida"
        },
        {
            "ar": "RCV",
            "id": 2033,
            "rdl": 0,
            "sch": 1,
            "t": "Romanian Cornilescu Version"
        },
        {
            "ar": "RSB",
            "id": 2034,
            "rdl": 0,
            "sch": 0,
            "t": "Russian Synodal Bible (1876)"
        },
        {
            "ar": "SRV",
            "id": 2035,
            "rdl": 0,
            "sch": 1,
            "t": "Spanish Reina Valera - Reina Valera española (1909)"
        },
        {
            "ar": "SRG",
            "id": 2036,
            "rdl": 0,
            "sch": 1,
            "t": "Spanish Reina Valera Gómez (2004)"
        },
        {
            "ar": "SRZ",
            "id": 2037,
            "rdl": 0,
            "sch": 1,
            "t": "Spanish Reina Valera Gómez (2010)"
        },
        {
            "ar": "SSE",
            "id": 2038,
            "rdl": 0,
            "sch": 1,
            "t": "Spanish Sagradas Escrituras (1569)"
        },
        {
            "ar": "TAB",
            "id": 2039,
            "rdl": 0,
            "sch": 1,
            "t": "Tagalog Ang Biblia (1905)"
        },
        {
            "ar": "TVB",
            "id": 2040,
            "rdl": 0,
            "sch": 1,
            "t": "Turkish Bible Version"
        },
        {
            "ar": "VCV",
            "id": 2041,
            "rdl": 0,
            "sch": 1,
            "t": "Vietnamese Cadman Version (1934)"
        },
    // End Non English Versions

    //  Strong's Versions begin at 3000
        {
            "ar": "ASVS",
            "id": 3001,
            "rdl": 0,
            "sch": 1,
            "t": "American Standard Version w/Strong's"
        },
        {
            "ar": "CUSS",
            "id": 3002,
            "rdl": 0,
            "sch": 0,
            "t": "Chinese Union (Simplified) w/Strong's - 中國聯合會（簡體）Zhōngguó liánhé huì (jiǎntǐ)"
        },
        {
            "ar": "CUTS",
            "id": 3003,
            "rdl": 0,
            "sch": 0,
            "t": "Chinese Union (Traditional) w/Strong's - 繁体中文聯合 Fántǐ zhōngwén liánhé"
        },
        {
            "ar": "KJVS",
            "id": 3004,
            "rdl": 0,
            "sch": 1,
            "t": "King James Version w/Strong's (1611/1769)"
        },
        {
            "ar": "SRVS",
            "id": 3005,
            "rdl": 0,
            "sch": 1,
            "t": "Spanish Reina Valera w/Strong's - Reina Valera española (1909)"
        }
    //  End of Strong's Versions
];
const idx = 17; // TWF = 17
const abr= versions[idx].ar;
const fileName = `data\\${abr}\\${abr}Verses.json`;
const data = fs.readFileSync(fileName, 'utf8');
const jsonData = JSON.parse(data);

for (const item of jsonData) {
    item.vt = item.vt.replace(":a", ': a');
    item.vt = item.vt.replace(":b", ': b');
    item.vt = item.vt.replace(":c", ': c');
    item.vt = item.vt.replace(":d", ': d');
    item.vt = item.vt.replace(":e", ': e');
    item.vt = item.vt.replace(":f", ': f');
    item.vt = item.vt.replace(":g", ': g');
    item.vt = item.vt.replace(":h", ': h');
    item.vt = item.vt.replace(":i", ': i');
    item.vt = item.vt.replace(":j", ': j');
    item.vt = item.vt.replace(":k", ': k');
    item.vt = item.vt.replace(":l", ': l');
    item.vt = item.vt.replace(":m", ': m');
    item.vt = item.vt.replace(":n", ': n');
    item.vt = item.vt.replace(":o", ': o');
    item.vt = item.vt.replace(":p", ': p');
    item.vt = item.vt.replace(":q", ': q');
    item.vt = item.vt.replace(":r", ': r');
    item.vt = item.vt.replace(":s", ': s');
    item.vt = item.vt.replace(":t", ': t');
    item.vt = item.vt.replace(":u", ': u');
    item.vt = item.vt.replace(":v", ': v');
    item.vt = item.vt.replace(":w", ': w');
    item.vt = item.vt.replace(":x", ': x');
    item.vt = item.vt.replace(":y", ': y');
    item.vt = item.vt.replace(":z", ': z');
    item.vt = item.vt.replace(":A", ': A');
    item.vt = item.vt.replace(":B", ': B');
    item.vt = item.vt.replace(":C", ': C');
    item.vt = item.vt.replace(":D", ': D');
    item.vt = item.vt.replace(":E", ': E');
    item.vt = item.vt.replace(":F", ': F');
    item.vt = item.vt.replace(":G", ': G');
    item.vt = item.vt.replace(":H", ': H');
    item.vt = item.vt.replace(":I", ': I');
    item.vt = item.vt.replace(":J", ': J');
    item.vt = item.vt.replace(":K", ': K');
    item.vt = item.vt.replace(":L", ': L');
    item.vt = item.vt.replace(":M", ': M');
    item.vt = item.vt.replace(":N", ': N');
    item.vt = item.vt.replace(":O", ': O');
    item.vt = item.vt.replace(":P", ': P');
    item.vt = item.vt.replace(":Q", ': Q');
    item.vt = item.vt.replace(":R", ': R');
    item.vt = item.vt.replace(":S", ': S');
    item.vt = item.vt.replace(":T", ': T');
    item.vt = item.vt.replace(":U", ': U');
    item.vt = item.vt.replace(":V", ': V');
    item.vt = item.vt.replace(":W", ': W');
    item.vt = item.vt.replace(":X", ': X');
    item.vt = item.vt.replace(":Y", ': Y');
    item.vt = item.vt.replace(":Z", ': Z');

    item.vt = item.vt.replace(",\"a", ",\" a");
    item.vt = item.vt.replace(",\"b", ",\" b");
    item.vt = item.vt.replace(",\"c", ",\" c");
    item.vt = item.vt.replace(",\"d", ",\" d");
    item.vt = item.vt.replace(",\"e", ",\" e");
    item.vt = item.vt.replace(",\"f", ",\" f");
    item.vt = item.vt.replace(",\"g", ",\" g");
    item.vt = item.vt.replace(",\"h", ",\" h");
    item.vt = item.vt.replace(",\"i", ",\" i");
    item.vt = item.vt.replace(",\"j", ",\" j");
    item.vt = item.vt.replace(",\"k", ",\" k");
    item.vt = item.vt.replace(",\"l", ",\" l");
    item.vt = item.vt.replace(",\"m", ",\" m");
    item.vt = item.vt.replace(",\"n", ",\" n");
    item.vt = item.vt.replace(",\"o", ",\" o");
    item.vt = item.vt.replace(",\"p", ",\" p");
    item.vt = item.vt.replace(",\"q", ",\" q");
    item.vt = item.vt.replace(",\"r", ",\" r");
    item.vt = item.vt.replace(",\"s", ",\" s");
    item.vt = item.vt.replace(",\"t", ",\" t");
    item.vt = item.vt.replace(",\"u", ",\" u");
    item.vt = item.vt.replace(",\"v", ",\" v");
    item.vt = item.vt.replace(",\"w", ",\" w");
    item.vt = item.vt.replace(",\"x", ",\" x");
    item.vt = item.vt.replace(",\"y", ",\" y");
    item.vt = item.vt.replace(",\"z", ",\" z");
    item.vt = item.vt.replace(",\"A", ",\" A");
    item.vt = item.vt.replace(",\"B", ",\" B");
    item.vt = item.vt.replace(",\"C", ",\" C");
    item.vt = item.vt.replace(",\"D", ",\" D");
    item.vt = item.vt.replace(",\"E", ",\" E");
    item.vt = item.vt.replace(",\"F", ",\" F");
    item.vt = item.vt.replace(",\"G", ",\" G");
    item.vt = item.vt.replace(",\"H", ",\" H");
    item.vt = item.vt.replace(",\"I", ",\" I");
    item.vt = item.vt.replace(",\"J", ",\" J");
    item.vt = item.vt.replace(",\"K", ",\" K");
    item.vt = item.vt.replace(",\"L", ",\" L");
    item.vt = item.vt.replace(",\"M", ",\" M");
    item.vt = item.vt.replace(",\"N", ",\" N");
    item.vt = item.vt.replace(",\"O", ",\" O");
    item.vt = item.vt.replace(",\"P", ",\" P");
    item.vt = item.vt.replace(",\"Q", ",\" Q");
    item.vt = item.vt.replace(",\"R", ",\" R");
    item.vt = item.vt.replace(",\"S", ",\" S");
    item.vt = item.vt.replace(",\"T", ",\" T");
    item.vt = item.vt.replace(",\"U", ",\" U");
    item.vt = item.vt.replace(",\"V", ",\" V");
    item.vt = item.vt.replace(",\"W", ",\" W");
    item.vt = item.vt.replace(",\"X", ",\" X");
    item.vt = item.vt.replace(",\"Y", ",\" Y");
    item.vt = item.vt.replace(",\"Z", ",\" Z");

    item.vt = item.vt.replace(".\"a", ".\" a");
    item.vt = item.vt.replace(".\"b", ".\" b");
    item.vt = item.vt.replace(".\"c", ".\" c");
    item.vt = item.vt.replace(".\"d", ".\" d");
    item.vt = item.vt.replace(".\"e", ".\" e");
    item.vt = item.vt.replace(".\"f", ".\" f");
    item.vt = item.vt.replace(".\"g", ".\" g");
    item.vt = item.vt.replace(".\"h", ".\" h");
    item.vt = item.vt.replace(".\"i", ".\" i");
    item.vt = item.vt.replace(".\"j", ".\" j");
    item.vt = item.vt.replace(".\"k", ".\" k");
    item.vt = item.vt.replace(".\"l", ".\" l");
    item.vt = item.vt.replace(".\"m", ".\" m");
    item.vt = item.vt.replace(".\"n", ".\" n");
    item.vt = item.vt.replace(".\"o", ".\" o");
    item.vt = item.vt.replace(".\"p", ".\" p");
    item.vt = item.vt.replace(".\"q", ".\" q");
    item.vt = item.vt.replace(".\"r", ".\" r");
    item.vt = item.vt.replace(".\"s", ".\" s");
    item.vt = item.vt.replace(".\"t", ".\" t");
    item.vt = item.vt.replace(".\"u", ".\" u");
    item.vt = item.vt.replace(".\"v", ".\" v");
    item.vt = item.vt.replace(".\"w", ".\" w");
    item.vt = item.vt.replace(".\"x", ".\" x");
    item.vt = item.vt.replace(".\"y", ".\" y");
    item.vt = item.vt.replace(".\"z", ".\" z");
    item.vt = item.vt.replace(".\"A", ".\" A");
    item.vt = item.vt.replace(".\"B", ".\" B");
    item.vt = item.vt.replace(".\"C", ".\" C");
    item.vt = item.vt.replace(".\"D", ".\" D");
    item.vt = item.vt.replace(".\"E", ".\" E");
    item.vt = item.vt.replace(".\"F", ".\" F");
    item.vt = item.vt.replace(".\"G", ".\" G");
    item.vt = item.vt.replace(".\"H", ".\" H");
    item.vt = item.vt.replace(".\"I", ".\" I");
    item.vt = item.vt.replace(".\"J", ".\" J");
    item.vt = item.vt.replace(".\"K", ".\" K");
    item.vt = item.vt.replace(".\"L", ".\" L");
    item.vt = item.vt.replace(".\"M", ".\" M");
    item.vt = item.vt.replace(".\"N", ".\" N");
    item.vt = item.vt.replace(".\"O", ".\" O");
    item.vt = item.vt.replace(".\"P", ".\" P");
    item.vt = item.vt.replace(".\"Q", ".\" Q");
    item.vt = item.vt.replace(".\"R", ".\" R");
    item.vt = item.vt.replace(".\"S", ".\" S");
    item.vt = item.vt.replace(".\"T", ".\" T");
    item.vt = item.vt.replace(".\"U", ".\" U");
    item.vt = item.vt.replace(".\"V", ".\" V");
    item.vt = item.vt.replace(".\"W", ".\" W");
    item.vt = item.vt.replace(".\"X", ".\" X");
    item.vt = item.vt.replace(".\"Y", ".\" Y");
    item.vt = item.vt.replace(".\"Z", ".\" Z");

    item.vt = item.vt.replace("?\"a", "?\" a");
    item.vt = item.vt.replace("?\"b", "?\" b");
    item.vt = item.vt.replace("?\"c", "?\" c");
    item.vt = item.vt.replace("?\"d", "?\" d");
    item.vt = item.vt.replace("?\"e", "?\" e");
    item.vt = item.vt.replace("?\"f", "?\" f");
    item.vt = item.vt.replace("?\"g", "?\" g");
    item.vt = item.vt.replace("?\"h", "?\" h");
    item.vt = item.vt.replace("?\"i", "?\" i");
    item.vt = item.vt.replace("?\"j", "?\" j");
    item.vt = item.vt.replace("?\"k", "?\" k");
    item.vt = item.vt.replace("?\"l", "?\" l");
    item.vt = item.vt.replace("?\"m", "?\" m");
    item.vt = item.vt.replace("?\"n", "?\" n");
    item.vt = item.vt.replace("?\"o", "?\" o");
    item.vt = item.vt.replace("?\"p", "?\" p");
    item.vt = item.vt.replace("?\"q", "?\" q");
    item.vt = item.vt.replace("?\"r", "?\" r");
    item.vt = item.vt.replace("?\"s", "?\" s");
    item.vt = item.vt.replace("?\"t", "?\" t");
    item.vt = item.vt.replace("?\"u", "?\" u");
    item.vt = item.vt.replace("?\"v", "?\" v");
    item.vt = item.vt.replace("?\"w", "?\" w");
    item.vt = item.vt.replace("?\"x", "?\" x");
    item.vt = item.vt.replace("?\"y", "?\" y");
    item.vt = item.vt.replace("?\"z", "?\" z");
    item.vt = item.vt.replace("?\"A", "?\" A");
    item.vt = item.vt.replace("?\"B", "?\" B");
    item.vt = item.vt.replace("?\"C", "?\" C");
    item.vt = item.vt.replace("?\"D", "?\" D");
    item.vt = item.vt.replace("?\"E", "?\" E");
    item.vt = item.vt.replace("?\"F", "?\" F");
    item.vt = item.vt.replace("?\"G", "?\" G");
    item.vt = item.vt.replace("?\"H", "?\" H");
    item.vt = item.vt.replace("?\"I", "?\" I");
    item.vt = item.vt.replace("?\"J", "?\" J");
    item.vt = item.vt.replace("?\"K", "?\" K");
    item.vt = item.vt.replace("?\"L", "?\" L");
    item.vt = item.vt.replace("?\"M", "?\" M");
    item.vt = item.vt.replace("?\"N", "?\" N");
    item.vt = item.vt.replace("?\"O", "?\" O");
    item.vt = item.vt.replace("?\"P", "?\" P");
    item.vt = item.vt.replace("?\"Q", "?\" Q");
    item.vt = item.vt.replace("?\"R", "?\" R");
    item.vt = item.vt.replace("?\"S", "?\" S");
    item.vt = item.vt.replace("?\"T", "?\" T");
    item.vt = item.vt.replace("?\"U", "?\" U");
    item.vt = item.vt.replace("?\"V", "?\" V");
    item.vt = item.vt.replace("?\"W", "?\" W");
    item.vt = item.vt.replace("?\"X", "?\" X");
    item.vt = item.vt.replace("?\"Y", "?\" Y");
    item.vt = item.vt.replace("?\"Z", "?\" Z");

    item.vt = item.vt.replace("!\"a", "!\" a");
    item.vt = item.vt.replace("!\"b", "!\" b");
    item.vt = item.vt.replace("!\"c", "!\" c");
    item.vt = item.vt.replace("!\"d", "!\" d");
    item.vt = item.vt.replace("!\"e", "!\" e");
    item.vt = item.vt.replace("!\"f", "!\" f");
    item.vt = item.vt.replace("!\"g", "!\" g");
    item.vt = item.vt.replace("!\"h", "!\" h");
    item.vt = item.vt.replace("!\"i", "!\" i");
    item.vt = item.vt.replace("!\"j", "!\" j");
    item.vt = item.vt.replace("!\"k", "!\" k");
    item.vt = item.vt.replace("!\"l", "!\" l");
    item.vt = item.vt.replace("!\"m", "!\" m");
    item.vt = item.vt.replace("!\"n", "!\" n");
    item.vt = item.vt.replace("!\"o", "!\" o");
    item.vt = item.vt.replace("!\"p", "!\" p");
    item.vt = item.vt.replace("!\"q", "!\" q");
    item.vt = item.vt.replace("!\"r", "!\" r");
    item.vt = item.vt.replace("!\"s", "!\" s");
    item.vt = item.vt.replace("!\"t", "!\" t");
    item.vt = item.vt.replace("!\"u", "!\" u");
    item.vt = item.vt.replace("!\"v", "!\" v");
    item.vt = item.vt.replace("!\"w", "!\" w");
    item.vt = item.vt.replace("!\"x", "!\" x");
    item.vt = item.vt.replace("!\"y", "!\" y");
    item.vt = item.vt.replace("!\"z", "!\" z");
    item.vt = item.vt.replace("!\"A", "!\" A");
    item.vt = item.vt.replace("!\"B", "!\" B");
    item.vt = item.vt.replace("!\"C", "!\" C");
    item.vt = item.vt.replace("!\"D", "!\" D");
    item.vt = item.vt.replace("!\"E", "!\" E");
    item.vt = item.vt.replace("!\"F", "!\" F");
    item.vt = item.vt.replace("!\"G", "!\" G");
    item.vt = item.vt.replace("!\"H", "!\" H");
    item.vt = item.vt.replace("!\"I", "!\" I");
    item.vt = item.vt.replace("!\"J", "!\" J");
    item.vt = item.vt.replace("!\"K", "!\" K");
    item.vt = item.vt.replace("!\"L", "!\" L");
    item.vt = item.vt.replace("!\"M", "!\" M");
    item.vt = item.vt.replace("!\"N", "!\" N");
    item.vt = item.vt.replace("!\"O", "!\" O");
    item.vt = item.vt.replace("!\"P", "!\" P");
    item.vt = item.vt.replace("!\"Q", "!\" Q");
    item.vt = item.vt.replace("!\"R", "!\" R");
    item.vt = item.vt.replace("!\"S", "!\" S");
    item.vt = item.vt.replace("!\"T", "!\" T");
    item.vt = item.vt.replace("!\"U", "!\" U");
    item.vt = item.vt.replace("!\"V", "!\" V");
    item.vt = item.vt.replace("!\"W", "!\" W");
    item.vt = item.vt.replace("!\"X", "!\" X");
    item.vt = item.vt.replace("!\"Y", "!\" Y");
    item.vt = item.vt.replace("!\"Z", "!\" Z");

    item.vt = item.vt.replace(",´\"a", ",´\" a");
    item.vt = item.vt.replace(",´\"b", ",´\" b");
    item.vt = item.vt.replace(",´\"c", ",´\" c");
    item.vt = item.vt.replace(",´\"d", ",´\" d");
    item.vt = item.vt.replace(",´\"e", ",´\" e");
    item.vt = item.vt.replace(",´\"f", ",´\" f");
    item.vt = item.vt.replace(",´\"g", ",´\" g");
    item.vt = item.vt.replace(",´\"h", ",´\" h");
    item.vt = item.vt.replace(",´\"i", ",´\" i");
    item.vt = item.vt.replace(",´\"j", ",´\" j");
    item.vt = item.vt.replace(",´\"k", ",´\" k");
    item.vt = item.vt.replace(",´\"l", ",´\" l");
    item.vt = item.vt.replace(",´\"m", ",´\" m");
    item.vt = item.vt.replace(",´\"n", ",´\" n");
    item.vt = item.vt.replace(",´\"o", ",´\" o");
    item.vt = item.vt.replace(",´\"p", ",´\" p");
    item.vt = item.vt.replace(",´\"q", ",´\" q");
    item.vt = item.vt.replace(",´\"r", ",´\" r");
    item.vt = item.vt.replace(",´\"s", ",´\" s");
    item.vt = item.vt.replace(",´\"t", ",´\" t");
    item.vt = item.vt.replace(",´\"u", ",´\" u");
    item.vt = item.vt.replace(",´\"v", ",´\" v");
    item.vt = item.vt.replace(",´\"w", ",´\" w");
    item.vt = item.vt.replace(",´\"x", ",´\" x");
    item.vt = item.vt.replace(",´\"y", ",´\" y");
    item.vt = item.vt.replace(",´\"z", ",´\" z");


    item.vt = item.vt.replace("´\"a", "´\" a");
    item.vt = item.vt.replace("´\"b", "´\" b");
    item.vt = item.vt.replace("´\"c", "´\" c");
    item.vt = item.vt.replace("´\"d", "´\" d");
    item.vt = item.vt.replace("´\"e", "´\" e");
    item.vt = item.vt.replace("´\"f", "´\" f");
    item.vt = item.vt.replace("´\"g", "´\" g");
    item.vt = item.vt.replace("´\"h", "´\" h");
    item.vt = item.vt.replace("´\"i", "´\" i");
    item.vt = item.vt.replace("´\"j", "´\" j");
    item.vt = item.vt.replace("´\"k", "´\" k");
    item.vt = item.vt.replace("´\"l", "´\" l");
    item.vt = item.vt.replace("´\"m", "´\" m");
    item.vt = item.vt.replace("´\"n", "´\" n");
    item.vt = item.vt.replace("´\"o", "´\" o");
    item.vt = item.vt.replace("´\"p", "´\" p");
    item.vt = item.vt.replace("´\"q", "´\" q");
    item.vt = item.vt.replace("´\"r", "´\" r");
    item.vt = item.vt.replace("´\"s", "´\" s");
    item.vt = item.vt.replace("´\"t", "´\" t");
    item.vt = item.vt.replace("´\"u", "´\" u");
    item.vt = item.vt.replace("´\"v", "´\" v");
    item.vt = item.vt.replace("´\"w", "´\" w");
    item.vt = item.vt.replace("´\"x", "´\" x");
    item.vt = item.vt.replace("´\"y", "´\" y");
    item.vt = item.vt.replace("´\"z", "´\" z");

    item.vt = item.vt.replace("´\"A", "´\" A");
    item.vt = item.vt.replace("´\"B", "´\" B");
    item.vt = item.vt.replace("´\"C", "´\" C");
    item.vt = item.vt.replace("´\"D", "´\" D");
    item.vt = item.vt.replace("´\"E", "´\" E");
    item.vt = item.vt.replace("´\"F", "´\" F");
    item.vt = item.vt.replace("´\"G", "´\" G");
    item.vt = item.vt.replace("´\"H", "´\" H");
    item.vt = item.vt.replace("´\"I", "´\" I");
    item.vt = item.vt.replace("´\"J", "´\" J");
    item.vt = item.vt.replace("´\"K", "´\" K");
    item.vt = item.vt.replace("´\"L", "´\" L");
    item.vt = item.vt.replace("´\"M", "´\" M");
    item.vt = item.vt.replace("´\"N", "´\" N");
    item.vt = item.vt.replace("´\"O", "´\" O");
    item.vt = item.vt.replace("´\"P", "´\" P");
    item.vt = item.vt.replace("´\"Q", "´\" Q");
    item.vt = item.vt.replace("´\"R", "´\" R");
    item.vt = item.vt.replace("´\"S", "´\" S");
    item.vt = item.vt.replace("´\"T", "´\" T");
    item.vt = item.vt.replace("´\"U", "´\" U");
    item.vt = item.vt.replace("´\"V", "´\" V");
    item.vt = item.vt.replace("´\"W", "´\" W");
    item.vt = item.vt.replace("´\"X", "´\" X");
    item.vt = item.vt.replace("´\"Y", "´\" Y");
    item.vt = item.vt.replace("´\"Z", "´\" Z");

    item.vt = item.vt.replace(":'", ": '");
    item.vt = item.vt.replace(':"', ': "');
    item.vt = item.vt.replace(":‘", ": ‘");
    item.vt = item.vt.replace(":“", ": “");
    item.vt = item.vt.replace("  ", " ");
    item.vt = item.vt.replace("\"\"", "\" \"");
};

try {
    fs.writeFileSync(fileName, JSON.stringify(jsonData));
    console.log(`${abr}: Data written to file!`)
} catch (error) {
    console.log(`Write failed: ${fileName}`, error);
};