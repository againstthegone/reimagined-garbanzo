import papa from 'papaparse';
import { TAG } from './webcomponent/Chart';

const chart = document.createElement(TAG);
document.body.append(chart);

papa.parse(
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
    {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            console.log('LENGTH', results.data.length);
            console.error('ERRORS', results.errors);
            results.data.forEach((d) => {
                const div = document.createElement('div');
                div.innerText = JSON.stringify(d);
                document.body.append(div);
            })
        },
        error: (error) => {
            console.error(error);
        }
    }
);