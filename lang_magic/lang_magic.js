const fs = require('fs');
const path = require('path');

function copyFile(source, target) {
    fs.copyFileSync(source, target);
    console.log(`File "${source}" copied to "${target}"`);
}

function updateLanguagesJSON(array) {
    const filePath = path.join("./RP/texts/", "languages.json");
    const jsonString = JSON.stringify(array, null, 2);
    fs.writeFileSync(filePath, jsonString);
}

function createFilesFromArray(array, langFilePath) {
    array.forEach(value => {
        const fileName = value + ".lang";
        const filePath = path.join("./RP/texts/", fileName);
        if (!fs.existsSync(filePath)) {
            copyFile(langFilePath, filePath);
        }
    });
}

const langs = [
    "en_GB",
    "de_DE",
    "es_ES",
    "es_MX",
    "fr_FR",
    "fr_CA",
    "it_IT",
    "ja_JP",
    "ko_KR",
    "pt_BR",
    "pt_PT",
    "ru_RU",
    "zh_CN",
    "zh_TW",
    "nl_NL",
    "bg_BG",
    "cs_CZ",
    "da_DK",
    "el_GR",
    "fi_FI",
    "hu_HU",
    "id_ID",
    "nb_NO",
    "pl_PL",
    "sk_SK",
    "sv_SE",
    "tr_TR",
    "uk_UA"
];

const enUsLangFilePath = path.join("./RP/texts/", "en_US.lang");

createFilesFromArray(langs, enUsLangFilePath);
langs.push("en_US");
updateLanguagesJSON(langs);