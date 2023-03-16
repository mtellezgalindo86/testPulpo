import {Injectable} from '@nestjs/common';
import axios from 'axios';
import * as NodeCache from 'node-cache';

/*
Esta interfaz define la estructura de los datos de ayuda humanitaria.
Los datos se almacenan en un objeto que tiene un año como clave
y un objeto que contiene el título de la ayuda humanitaria como clave
y el valor de la ayuda como valor.
* */
interface AidData {
    [year: number]: {
        [title: string]: number;
    };

}

@Injectable()
export class HumanitarianAidService {
    private readonly apiUrl = 'https://api.iatistandard.org/datastore/transaction/select';
    private readonly apiKey = '5d7747a59aa94dc18027845f822331af';
    private readonly cache: NodeCache;

    constructor() {
        this.cache = new NodeCache();
    }

    async getAidData(countryCode: string, years: string): Promise<AidData> {


        const result: AidData = {};
        const cacheKey = `${countryCode}-${years}`;
        const cachedData = this.cache.get<AidData>(cacheKey);

        if (cachedData) {
            return cachedData;
        }

        // Obtener fecha de 5 años atrás a partir del año pasado por parámetro
        const currentYear = new Date().getFullYear();
        let startYear = currentYear - 5;

        const startDate = new Date(`${startYear}-01-01T00:00:00Z`).toISOString();

        const query = `(recipient_country_code:(${countryCode}) AND default_aid_type_code:(A01) ) AND transaction_transaction_date_iso_date:[${startDate} TO *] OR transaction_transaction_date_iso_date:[${years}-01-01T00:00:00Z TO ${years}-12-31T00:00:00Z]`;
        const params = {
            q: query,
            fl: 'transaction_value,reporting_org_narrative,title_narrative,transaction_transaction_date_iso_date',
            sort: 'transaction_value desc',
            fq: '',
            rows: '300',
        };

        const response = await axios.get(this.apiUrl, {
            headers: {'Ocp-Apim-Subscription-Key': this.apiKey},
            params,
        });

        const {docs} = response.data.response;
        for (const doc of docs) {
            const year = new Date(doc.transaction_transaction_date_iso_date[0]).getFullYear();
            if (year > Number.parseInt(years)) {
                continue;
            }
            const totalAid = doc.transaction_value[0];
            const title = doc.title_narrative[0];
            const value = parseFloat(totalAid.toFixed(2));

            if (!result[year]) {
                result[year] = {};
            }

            if (!result[year][title]) {
                result[year][title] = 0;
            }

            result[year][title] += value;
        }
        // Transformar valores exponenciales en números decimales
        for (const year in result) {
            for (const title in result[year]) {
                const value = result[year][title];
                if (typeof value === 'number' && !Number.isFinite(value)) {
                    result[year][title] = parseFloat(value.toFixed(2));
                }
            }
        }
        this.cache.set(cacheKey, result);

        return result;
    }
}
