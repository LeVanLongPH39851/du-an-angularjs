app.controller(
  "donHangCtrl",
  function ($scope, $http, $location, $routeParams, $rootScope) {
    var urlDonHang = "http://localhost:3000/don-hang";
    $http
      .get(urlDonHang, {
        params: {
          ten_tai_khoan: $rootScope.user.ten_tai_khoan,
        },
      })
      .then((res) => {
        $scope.dsDonHang = res.data;
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    $scope.onClickXemChiTietDonHang = function (id) {
      $location.path(`/${id}/xem-chi-tiet-don-hang`);
    };
  }
);
