'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${+(
                data.population / 1000000
              ).toFixed(1)}mil people</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
            </div>
        </article>
     `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AJAX call
// more old way to call:
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
   //  console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
   //  console.log(data);

    const html = `
      <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${+(
              data.population / 1000000
            ).toFixed(1)}mil people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
      </article>
   `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal')
getCountryData('czech')
getCountryData('germany')
*/

/*
const getCountryAndNeighbor = function (country) {

   // AJAX call 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //  console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    //  console.log(data);

    // render zountry 1
    renderCountry(data)

    // get neighbor country
   const neighbor = data.borders?.[0]

   // AJAX call 2
  const request2 = new XMLHttpRequest();
  request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
  request2.send();

  request2.addEventListener('load', function(){
   // console.log(this.responseText);
   const data2 = JSON.parse(this.responseText)
   // console.log(data2);
   renderCountry(data2, 'neighbour')
  })
  });
};

getCountryAndNeighbor('usa')
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Promise
// another way to call by fetch (for escape callback hell - nested callback function)
/*
const request = fetch(`https://restcountries.com/v2/name/portugal`);
console.log(request);

const getCountryData = function (country) {
  // country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      // console.log(response);
      return response.json(); // will also return a promise so we have to again call then()
    })
    .then(function (data) {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];

      // country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
    })
    .then(function (response) {
      response.json();
    })
    .then(function (data) {
      renderCountry(data, 'neighbour');
    });
};
*/

// getCountryData('portugal');

// Handling rejected promises
/*
const getJSON = function (url, errorMsg = 'Something went wrong!') {
  fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} ${response.status}`);
    }

    return response.json();
  });
};
*/
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`);
//       }

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour')) // then() when promise is fulifilled
//     .catch(err => {
//       // catch() when promise is rejected
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       // finally() always no matter of promise
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

/*
const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) {
         throw new Error('No neighbor found!')
      };

      // Country 2
      return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(data => renderCountry(data, 'neighbour')) // then() when promise is fulifilled
    .catch(err => {
      // catch() when promise is rejected
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      // finally() always no matter of promise
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challange #1
/*
// https://geocode.xyz/${lat},${lng}?geoit=json&auth=your_api_key
// https://geocode.xyz/${lat},${lng}?geoit=json

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Cannot load! Likely due to fast reload the page.');
      }
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      // console.log(data);
      getCountryData(data.country);
      renderCountry(data.country)
    })
    .catch(err => console.error(`Something went wrong, ${err}`));
};

// whereAmI();
btn.addEventListener('click', function () {
   whereAmI(52.508, 13.381);
 });
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Creating promises
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotetry draw is happaning');

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You win');
    } else {
      reject(new Error('You lost'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2).then(() => {
  console.log('2sec');
  return wait(1)
}).then(() => console.log('1sec'))
*/
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    //  navigator.geolocation.getCurrentPosition(
    //    position => resolve(position),
    //    err => rejected(err)
    //  );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Cannot load! Likely due to fast reload the page.');
      }
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      // console.log(data);
      getCountryData(data.country);
      renderCountry(data.country);
    })
    .catch(err => console.error(`Something went wrong, ${err}`));
};

// whereAmI();
btn.addEventListener('click', whereAmI);
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challange #2
/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      document.querySelector('.images').append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// createImage();
let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Consuming promises with Async/Await
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function (country) {
   // geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  // reverse geocoding
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const dataGeo = await resGeo.json();

  // country data
  const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);
  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};

whereAmI();
console.log('first');
*/

/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => console.log(res))

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    //  console.log(dataGeo);

    // Country data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting location data');

    const data = await res.json();
    //  console.log(data);
    renderCountry(data.state, 'neighbour');

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong ${err.message}`);
  }
};

console.log('1 get location');
// const city = whereAmI()
// console.log(city);
whereAmI().then(city => console.log(city));
console.log('3 finished getting location');

// btn.addEventListener('click', whereAmI);

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})();
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Running Promises in Parallel

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
/*
const get3Countries = async function (c1, c2, c3) {
  try {
    const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    console.log(data);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'czech');
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Other Promise Combinators: race, allSettled and any
// Promise.race() only one array of fastest loaded promise
/*
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);

  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long'));
    }, sec * 1000);
  });
};

Promise.race([getJSON(`https://restcountries.com/v2/name/czech`), timeout(0.1)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));
*/

// Promise.allSettled() - will return all promise no matter if they are rejected or fulfilled
/*
Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another success'),
]).then(res => console.log(res));

// vs
Promise.all([ // -all() will reject when just one promise is rejected
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/

// Promise.any() - will return first fulfilled promise and ignor reject one
/*
Promise.any([
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challange #3
/*
// from challange #2
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      document.querySelector('.images').append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// createImage();
let currentImg;
/*
/*
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
*/

/*
const loadNPause = async function (url1, url2) {
  const img = await createImage(url1);
  currentImg = img;
  console.log('Image 1 loaded');
  await wait(2);
  const img2 = await createImage(url2)
  currentImg.style.display = 'none'
  console.log('Image 2 loaded');
  await wait(2);
  currentImg.style.display = 'none'
};

loadNPause('img/img-1.jpg', 'img/img-2.jpg');
*/
/*
const loadNPause = async function () {
  try {
    // img1
    const img1 = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img1.style.display = 'none';

    // img2
    const img2 = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img2.style.display = 'none';
  } catch {
    console.error(err);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);

    const imgsEl = await Promise.all(imgs)
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'))

  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'])
*/

