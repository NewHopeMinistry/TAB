// Fix minified text
// :abcdefghijklmnopqrstuvwxyz
// :ABCDEFGHIJKLMNOPQRSTUVWXYZ
const fs = require('fs');
var versions = [
    {
        "idx": 0,
        "ar": "AKJ",
        "id": 1,
        "t": "American King James Version"
    },
    {
        "idx": 1,
        "ar": "AKV",
        "id": 3,
        "t": "Authorized King James Version"
    },
    {
        "idx": 2,
        "ar": "ASV",
        "id": 2,
        "t": "American Standard Version"
    },
    {
        "idx": 3,
        "ar": "BBB",
        "id": 6,
        "t": "Bishop's Bible"
    },
    {
        "idx": 4,
        "ar": "BBE",
        "id": 5,
        "t": "Bible in Basic English"
    },
    {
        "idx": 5,
        "ar": "BSB",
        "id": 4,
        "t": "Berean Standard Bible"
    },
    {
        "idx": 6,
        "ar": "CBV",
        "id": 7,
        "t": "Coverdale Bible"
    },
    {
        "idx": 7,
        "ar": "DBY",
        "id": 8,
        "t": "Darby English Bible"
    },
    {
        "idx": 8,
        "ar": "DRB",
        "id": 10,
        "t": "Douay-Rheims Bible"
    },
    {
        "idx": 9,
        "ar": "FBV",
        "id": 12,
        "t": "Free Bible Version"
    },
    {
        "idx": 10,
        "ar": "GNV",
        "id": 13,
        "t": "Geneva Bible"
    },
    {
        "idx": 11,
        "ar": "KJV",
        "id": 15,
        "t": "King James Version"
    },
    {
        "idx": 12,
        "ar": "NWB",
        "id": 18,
        "t": "Noah Webster's Bible"
    },
    {
        "idx": 13,
        "ar": "SLT",
        "id": 19,
        "t": "Smith's Literal Translation"
    },
    {
        "idx": 14,
        "ar": "T4T",
        "id": 20,
        "t": "Translation for Translators"
    },
    {
        "idx": 15,
        "ar": "TWF",
        "id": 21,
        "t": "Twenty-First Century Version"
    },
    {
        "idx": 16,
        "ar": "WEB",
        "id": 25,
        "t": "World English Bible"
    },
    {
        "idx": 17,
        "ar": "YLT",
        "id": 26,
        "t": "Young's Literal Translation"
    }
];
const idx = 15; // TWF = 15
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