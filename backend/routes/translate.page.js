import axios from "axios";
import { Languages } from "../schema models/translate.schema.js";

const encodedParams = new URLSearchParams();

const getMethod = {
    method: 'GET',
    url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/support-languages',
    headers: {
        'X-RapidAPI-Key': '7eba196472msh1a8cbac1dab6549p185a13jsn815871368fa2',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
    }
};

const postMethod = {
    method: 'POST',
    url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '7eba196472msh1a8cbac1dab6549p185a13jsn815871368fa2',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
    },
    data: encodedParams,
};

async function getLanguages() {
    try {
        const result = await (await axios.request(getMethod)).data;
        for (let i = 0; i < result.length; i++) {
            const lang = new Languages({
                code: result[i].code,
                language: result[i].language
            })

            const found = await Languages.findOne({ language: lang.language });
            if (!found) {
                await lang.save().then(console.log("Data saved!"));
            }
        }
    } catch (err) {
        console.log(err);
    }

    const found = await Languages.find();
    console.log(`${found.length} languages.`);
}

export { getLanguages, encodedParams, getMethod, postMethod };