"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');
var cities = require('./data/cityMap.json');

/**
 * Launch the app as a child process to able to restart it
 */
module.exports = function () {
  function CityTimezones() {
    _classCallCheck(this, CityTimezones);
  }

  _createClass(CityTimezones, [{
    key: 'getCity',


    /**
     * Find the 1st city in zone of a timezone
     *
     * @param {String} timezone
     * @returns {String}
     */
    value: function getCity(timezone) {
      if (!timezone) return '';
      var place = timezone.split('/').pop().replace('_', ' ');
      var filteredCityTimezones = _.filter(cities, { timezone: timezone });
      var zone = _.find(filteredCityTimezones, function (cityTimezone) {
        return (cityTimezone.city === place || cityTimezone.country === place) && cityTimezone.timezone === timezone;
      });
      if (!zone) zone = filteredCityTimezones[0];
      return zone ? zone.city + ', ' + zone.country : timezone;
    }

    /**
     * Find timezone of a city
     *
     * @param {String} value
     * @returns {String}
     */

  }, {
    key: 'getTimezone',
    value: function getTimezone(value) {
      if (!value) return '';

      var _value$split = value.split(','),
          _value$split2 = _slicedToArray(_value$split, 2),
          city = _value$split2[0],
          country = _value$split2[1];

      var zone = void 0;
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

  }, {
    key: 'getData',
    value: function getData() {
      return cities;
    }

    /**
     * Find by city
     *
     * @param {String} city
     * @private
     */

  }, {
    key: '_findByCity',
    value: function _findByCity(city) {
      return _.find(cities, function (item) {
        return item.city.toLowerCase() === city;
      });
    }

    /**
     * Find by country
     *
     * @param {String} country
     * @private
     */

  }, {
    key: '_findByCountry',
    value: function _findByCountry(country) {
      return _.find(cities, function (item) {
        var city = item.timezone.split('/').pop().replace('_', ' ').toLowerCase();
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

  }, {
    key: '_findByCityAndCountry',
    value: function _findByCityAndCountry(city, country) {
      var zone = _.find(cities, function (item) {
        var itemCountry = item.country.toLowerCase();
        return item.city.toLowerCase() === city && itemCountry === country;
      });
      if (!zone) {
        zone = _.find(cities, function (item) {
          var itemCountry = item.country.toLowerCase();
          return item.city.toLowerCase() === itemCountry.startsWith(country);
        });
      }
      return zone;
    }
  }]);

  return CityTimezones;
}();
