"use strict";
const _ = require('lodash');
const cities = require('./data/cityMap.json');

/**
 * Launch the app as a child process to able to restart it
 */
module.exports = class CityTimezones {

  /**
   * Find the 1st city in zone of a timezone
   *
   * @param {String} timezone
   * @returns {String}
   */
  getCity(timezone) {
    if (!timezone) return '';
    const place = timezone.split('/').pop().replace('_', ' ');
    const filteredCityTimezones = _.filter(cities, { timezone });
    let zone = _.find(filteredCityTimezones, cityTimezone => {
      return (cityTimezone.city === place || cityTimezone.country === place) && cityTimezone.timezone === timezone;
    });
    if (!zone) zone = filteredCityTimezones[0];
    return zone ? `${zone.city}, ${zone.country}` : timezone;
  }

  /**
   * Find timezone of a city
   *
   * @param {String} value
   * @returns {String}
   */
  getTimezone(value) {
    if (!value) return '';
    let [city, country] = value.split(',');
    let zone;
    city = city.trim().toLowerCase();

    if (country) {
      country = country.trim().toLowerCase();
      zone = this._findByCityAndCountry(city, country);
    } else {
      zone = this._findByCity(city) || this._findByCountry(city);
    }
    return zone ? zone.timezone : '';
  }

  /**
   * Get the list of cities which have a timezone
   * @returns {Array}
   */
  getData() {
    return cities;
  }

  /**
   * Find by city
   *
   * @param {String} city
   * @private
   */
  _findByCity(city) {
    return _.find(cities, item => item.city.toLowerCase() === city);
  }

  /**
   * Find by country
   *
   * @param {String} country
   * @private
   */
  _findByCountry(country) {
    return _.find(cities, item => {
      const city = item.timezone.split('/').pop().replace('_', ' ').toLowerCase();
      return item.city.toLowerCase() === city && item.country.toLowerCase() === country;
    });
  }

  /**
   * Find a city with country
   *
   * @param {String} city
   * @param {String} country
   * @private
   */
  _findByCityAndCountry(city, country) {
    return _.find(cities, item => {
      const itemCountry = item.country.toLowerCase();
      return item.city.toLowerCase() === city && itemCountry === country || itemCountry.startsWith(country);
    });
  }
};
