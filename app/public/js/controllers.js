angular.module('listControllers', [])
  .controller('displayCtrl', function ($http) {
    var scope = this;

    scope.data = [];
    scope.name = '';
    scope.serial = '';

    scope.clearModal = function () {
      scope.name = '';
      scope.serial = '';
      scope.editId = undefined;
    }

    scope.initList = function () {
      $http.get('/api/list').then(function (res) {
        scope.data = res.data;
      })
    }

    scope.initList();

    scope.saveHelicopter = function () {
      if (scope.helicopterForm.$valid) {
        if (scope.editId) {
          let editedHeli = { _id: scope.editId, name: scope.name, serial: scope.serial };
          $http.put('/list', { data: editedHeli }).then(function () {
            scope.initList();
            $('#modal').modal('hide');
          }).catch(function (err) {
            console.log(err);
          });
        }
        else {
          let newHelicopter = { name: scope.name, serial: scope.serial };
          $http.post('/list', { data: newHelicopter }).then(function () {
            scope.initList();
            $('#modal').modal('hide');
          }).catch(function (err) {
            console.log(err);
          });
        }
      }
    }

    scope.editHelicopter = function (heli) {
      scope.editId = heli._id;
      scope.name = heli.name;
      scope.serial = heli.serial;
    }

    scope.deleteHelicopter = function () {
      if (scope.deleteId) {
        $http.delete('/list/' + scope.deleteId).then(function () {
          scope.initList();
          scope.deleteId = undefined;
        }).catch(function (err) {
          console.log(err);
        });
      }
    }

    $('.nav-link').removeClass('active');
    $('#list').addClass('active');
  })
  .controller('reservationCtrl', function ($http) {
    var scope = this;

    

    scope.initReservations = function () {
      $http.get('/api/reservations').then(function (res) {
        scope.data = res.data;
      })
    }

    scope.initAvailableHelicopters = function () {
      $http.get('/api/availableHelicopters').then(function (res) {
        scope.availableHelicopters = res.data;
      })
    }

    scope.initReservations();
    scope.initAvailableHelicopters();

    scope.cancelReservation = function () {
      if (scope.cancelId) {
        $http.put('/cancelReservation', {data: {_id: scope.cancelId}}).then(function () {
          scope.initReservations();
          scope.initAvailableHelicopters();
          scope.cancelId = undefined;
        }).catch(function (err) {
          console.log(err);
        });
      }
    }

    scope.createReservation = function () {
      if (scope.reservationFrom.$valid) {
        $http.put('/createReservation', {data: {_id: scope.reserveHelicopter._id}}).then(function () {
          scope.initReservations();
          scope.initAvailableHelicopters();
          scope.reserveHelicopter = undefined;
        }).catch(function (err) {
          console.log(err);
        });
      }
    }

    $('.nav-link').removeClass('active');
    $('#reservations').addClass('active');
  });