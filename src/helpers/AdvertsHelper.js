export default class AdvertsHelper {
  constructor(adverts) {
    this.adverts = adverts;
    this.advertsDisplayed = [];
  }

  getAdvert(type) {
    const advertsAll = Object.assign({}, this.adverts);
    const advertsAvailable = Object
      .keys(advertsAll)
      .filter(id => !this.advertsDisplayed.includes(id))
      .reduce((advert, id) => {
        if (advertsAll[id].advertType.toLowerCase() === type) {
          advert[id] = advertsAll[id];
        }
        return advert;
      }, {});

    if(!Object.keys(advertsAvailable).length) {
      return false;
    }

    const randomKey = Object.keys(advertsAvailable)[Math.floor(Math.random()*Object.keys(advertsAvailable).length)];
    this.advertsDisplayed.push(randomKey);

    return randomKey;
  };


}

