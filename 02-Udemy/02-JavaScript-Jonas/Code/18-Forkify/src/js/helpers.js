import { TIMEOUT_SECONDS } from './config';
import { async } from 'regenerator-runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJSON = async url => {
//   try {
//     // Fetching API url:
//     const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
//     const data = await response.json();

//     // To make our own Error message:
//     if (!response.ok) throw new Error(`${data.message} ${response.status}`);

//     // Returning data as a Promise:
//     return data;
//   } catch (err) {
//     // Throwing error to Controller file Error Catch:
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   // Fetching API url:
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const response = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
//     const data = await response.json();

//     // To make our own Error message:
//     if (!response.ok) throw new Error(`${data.message} (${response.status})`);

//     // Returning data as a Promise:
//     return data;
//   } catch (err) {
//     // Throwing error to Controller file Error Catch:
//     throw err;
//   }
// };
