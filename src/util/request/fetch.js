'use strict';

import qs from 'qs';
import G from '../global.js';
import * as APIMAP from '../apimap.js';

export default function (param) {
  if (process.env.NODE_ENV === 'development' && G.env && G.env === 'local') {
    try {
      const url = APIMAP.local[param.name].value;
      return fetch(url).then(response => response.json()).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      throw new Error(error, 'local url is undefined in apimap.js');
    }
  } else {
    try {
      console.log(process.env.NODE_ENV);
      const url = APIMAP.product[param.name].value;
      const queryString = qs.stringify(param.data);
      param.url = `${url}?${queryString}`;

      return fetch(param.url, param).then(response => response.json()).catch((err) => {
        console.log('fetch error >>>>>', err);
      });
    } catch (error) {
      throw new Error(error, 'product url is undefined in apimap.js');
    }
  }
}

