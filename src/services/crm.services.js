import {ZOHO} from '../vendor/ZohoEmbeddedAppSdk';


export async function initializeWidget() {
    console.log("start initialization....")
    await ZOHO.embeddedApp.init();
}


export async function getCurrentUserInfos() {
    return await ZOHO.CRM.CONFIG.getCurrentUser();
}

// Leads : 2584
// Contacts: 4018
export async function getAllRecords(entityName, totalDataCount) {
    const batchSize = 200;
    const totalPages = Math.ceil(totalDataCount / batchSize);
    console.log(`Get all ${entityName} records, total pages : ${totalPages}`);

    const requests = [];

    for (let page = 1; page <= totalPages; page++) {
        const promiseQuery = async (entity, page) => {
            const config = {
                Entity: entity,
                sort_order: "asc",
                per_page: batchSize,
                page: page
            }
            return await ZOHO.CRM.API.getAllRecords(config);
        }

        requests.push(promiseQuery(entityName, page));
    }

    const responses = await Promise.all(requests);
    let allRecords = [];

    for (const response of responses) {
        const {data} = response;
        allRecords = [...allRecords, ...data];
    }
    return allRecords;
}