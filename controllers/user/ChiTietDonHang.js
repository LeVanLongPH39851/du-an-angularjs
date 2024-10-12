app.controller(
  "chitietdonHangCtrl",
  function ($scope, $http, $location, $routeParams, $rootScope, $q) {
    var iddh = $routeParams.id;
    var urlSanPham = "http://localhost:3000/san-pham";
    var urlChiTietDonHang = "http://localhost:3000/chi-tiet-don-hang";
    var request1 = $http.get(urlSanPham);
    var request2 = $http.get(urlChiTietDonHang, {
      params: {
        idDH: iddh,
      },
    });
    $q.all([request1, request2])
      .then((res) => {
        $scope.dsChiTietDonHang = [];
        for (var i in res[0].data) {
          for (var j in res[1].data) {
            if (res[0].data[i].id == res[1].data[j].idSP) {
              $scope.chiTietDonHang = res[0].data[i];
              $scope.dsChiTietDonHang.push($scope.chiTietDonHang);
            }
          }
        }
        $scope.tongGia = 0;
        for (var i in $scope.dsChiTietDonHang) {
          $scope.tongGia += $scope.dsChiTietDonHang[i].gia / 2;
        }
      })
      .catch((err) => console.log(err));
  }
);
