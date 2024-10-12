app.controller(
  "listDonHangCtrl",
  function ($scope, $http, $location, $routeParams, $rootScope) {
    var urlDonHang = "http://localhost:3000/don-hang";
    $http
      .get(urlDonHang)
      .then((res) => {
        $scope.dsDonHang = res.data;
      })
      .catch((err) => console.log(err));
    $scope.onClickSuaDonHang = function (id) {
      $location.path(`/admin/don-hang/${id}/sua-don-hang`);
    };
    $scope.onClickXemChiTietDonHangAdmin = function (id) {
      $location.path(`/admin/don-hang/${id}/xem-don-hang`);
    };
  }
);
