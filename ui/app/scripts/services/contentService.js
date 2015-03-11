'use strict';

angular.module('wikeoApp')
  .service('contentService', ['$q', function ($q) {

    this.getProducts = function () {
       return $q.when([]);
    }

  }]);
