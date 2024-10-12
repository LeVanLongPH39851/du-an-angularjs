app.controller(
  "trangChiTietCtrl",
  function ($scope, $http, $location, $routeParams, $rootScope) {
    var urlSanPham = "http://localhost:3000/san-pham";
    var urlGioHang = "http://localhost:3000/gio-hang";
    var idsp = $routeParams.id;
    //Lấy sản phẩm chi tiết
    $http
      .get(`${urlSanPham}/${idsp}`)
      .then((res) => {
        $scope.spChiTiet = res.data;
        $scope.albumAnhChiTiet = res.data.album_anh_ct;
        //Lấy sản phẩm cùng loại
        $http
          .get(urlSanPham, {
            params: {
              danh_muc: $scope.spChiTiet.danh_muc,
            },
          })
          .then((res) => ($scope.spCungLoai = res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    //Xem Chi tiết Sản Phẩm
    $scope.onClickXemChiTietSanPham = function (id) {
      $location.path(`/${id}/trang-chi-tiet`);
    };
    $scope.onClickAddToCart = function (id) {
      if ($rootScope.user) {
        var newCart = {
          ten_tai_khoan: $rootScope.user.ten_tai_khoan,
          idSP: id,
        };
        $http
          .get(urlGioHang, {
            params: {
              ten_tai_khoan: $rootScope.user.ten_tai_khoan,
            },
          })
          .then((res) => {
            checkGioHang = true;
            for (var i in res.data) {
              if (res.data[i].idSP === newCart.idSP) {
                checkGioHang = false;
              }
            }
            if (!checkGioHang) {
              alert("Sản phẩm này đã có trong giỏ hàng");
            } else {
              $http
                .post(urlGioHang, newCart)
                .then((res) => {
                  if (
                    confirm(
                      "Thêm vào giỏ hàng thành công, Bấm OK để xem giỏ hàng"
                    )
                  ) {
                    $location.path("/gio-hang");
                  }
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      } else {
        alert("Bạn phải đăng nhập để thêm vào giỏ hàng");
      }
    };
  }
);
