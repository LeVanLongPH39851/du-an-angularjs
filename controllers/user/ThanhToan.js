app.controller(
  "thanhToanCtrl",
  function ($scope, $http, $location, $routeParams, $rootScope, $q) {
    var urlSanPham = "http://localhost:3000/san-pham";
    var urlGioHang = "http://localhost:3000/gio-hang";
    var urlDonHang = "http://localhost:3000/don-hang";
    var urlChiTietDonHang = "http://localhost:3000/chi-tiet-don-hang";
    var request1 = $http.get(urlGioHang, {
      params: { ten_tai_khoan: $rootScope.user.ten_tai_khoan },
    });
    var request2 = $http.get(urlSanPham);
    $q.all([request1, request2])
      .then((res) => {
        $scope.dsThanhToan = [];
        for (var i in res[0].data) {
          for (var j in res[1].data) {
            if (res[0].data[i].idSP == res[1].data[j].id) {
              $scope.gioHang = res[1].data[j];
              $scope.dsThanhToan.push($scope.gioHang);
            }
          }
        }
        $scope.tongGia = 0;
        for (var i in $scope.dsThanhToan) {
          $scope.tongGia += $scope.dsThanhToan[i].gia / 2;
        }
      })
      .catch((err) => console.log(err));
    $scope.onClickMua = function () {
      var newDonHang = {
        id: "DH" + (Math.floor(Math.random() * 100) + 1),
        ten_tai_khoan: $rootScope.user.ten_tai_khoan,
        ...$scope.inputValue,
        tong_gia: $scope.tongGia,
        trang_thai: "Đang chờ xác nhận",
      };
      if (newDonHang.dia_chi === undefined || newDonHang.dia_chi === "") {
        alert("Không được để trống số địa chỉ");
      } else if (
        newDonHang.so_dien_thoai === undefined ||
        newDonHang.so_dien_thoai === ""
      ) {
        alert("Không được để trống số điện thoại");
      } else if (newDonHang.email === undefined || newDonHang.email === "") {
        alert("Không được để trống email");
      } else {
        $http
          .post(urlDonHang, newDonHang)
          .then((res) => {
            for (var i in $scope.dsThanhToan) {
              var newChiTietDonHang = {
                idDH: newDonHang.id,
                idSP: $scope.dsThanhToan[i].id,
              };

              $http
                .post(urlChiTietDonHang, newChiTietDonHang)
                .then((res) => {})
                .catch((err) => console.log(err));
            }
            $http
              .get(urlGioHang, {
                params: {
                  ten_tai_khoan: $rootScope.user.ten_tai_khoan,
                },
              })
              .then((res) => {
                for (var i in res.data) {
                  $http
                    .delete(`${urlGioHang}/${res.data[i].id}`)
                    .then((res) => {})
                    .catch((err) => console.log(err));
                }
                alert(
                  "Mua thành công, theo dõi đơn hàng để nhận được thông tin Nick"
                );
                $location.path("/don-hang");
              })
              .catch(console.log(err));
          })
          .catch((err) => console.log(err));
      }
    };
  }
);
