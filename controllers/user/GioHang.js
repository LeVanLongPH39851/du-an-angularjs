app.controller(
  "gioHangCtrl",
  function ($scope, $http, $location, $routeParams, $rootScope, $q) {
    var urlSanPham = "http://localhost:3000/san-pham";
    var urlGioHang = "http://localhost:3000/gio-hang";
    var request1 = $http.get(urlGioHang, {
      params: { ten_tai_khoan: $rootScope.user.ten_tai_khoan },
    });
    var request2 = $http.get(urlSanPham);
    $q.all([request1, request2])
      .then((res) => {
        $scope.dsGioHang = [];
        for (var i in res[0].data) {
          for (var j in res[1].data) {
            if (res[0].data[i].idSP == res[1].data[j].id) {
              $scope.gioHang = res[1].data[j];
              $scope.dsGioHang.push($scope.gioHang);
            }
          }
        }
        $scope.tongGia = 0;
        for (var i in $scope.dsGioHang) {
          $scope.tongGia += $scope.dsGioHang[i].gia / 2;
        }
      })
      .catch((err) => console.log(err));
    $scope.onClickThanhToan = function () {
      $location.path("/thanh-toan");
    };
  }
);
