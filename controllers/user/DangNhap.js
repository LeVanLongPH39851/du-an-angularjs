app.controller("dangNhapCtrl", function ($scope, $http, $location, $rootScope) {
  var urlTaiKhoan = "http://localhost:3000/tai-khoan";
  var urlGioHang = "http://localhost:3000/gio-hang";
  //Lấy sản phẩm chi tiết
  $scope.onClickDangNhap = function () {
    var newItem = {
      ...$scope.inputValue,
    };
    $http
      .get(urlTaiKhoan)
      .then((res) => {
        var check = true;

        if (
          newItem.ten_tai_khoan !== undefined &&
          newItem.mat_khau !== undefined
        ) {
          for (var i in res.data) {
            if (
              newItem.ten_tai_khoan === res.data[i].ten_tai_khoan &&
              newItem.mat_khau === res.data[i].mat_khau
            ) {
              var check = false;
            }
          }
        }
        if (
          newItem.ten_tai_khoan === undefined ||
          newItem.ten_tai_khoan === ""
        ) {
          alert("Không được để trống tên tài khoản");
        } else if (newItem.mat_khau === undefined || newItem.mat_khau === "") {
          alert("Không được để trống mật khẩu");
        } else if (newItem.mat_khau.length < 8) {
          alert("Mật khẩu phải có tối thiều 8 ký tự");
        } else if (!/[a-z]/.test(newItem.mat_khau)) {
          alert("Mật khẩu phải có ít nhất 1 chữ thường");
        } else if (!/[A-Z]/.test(newItem.mat_khau)) {
          alert("Mật khẩu phải có ít nhất 1 chữ hoa");
        } else if (!/[0-9]/.test(newItem.mat_khau)) {
          alert("Mật khẩu phải có ít nhất 1 số");
        } else if (!/[!@#$%^&]/.test(newItem.mat_khau)) {
          alert("Mật khẩu phải có ít nhất 1 ký tự đặc biệt");
        } else if (check) {
          alert("Tên tài khoản hoặc mật khẩu không chính xác");
        } else {
          $http
            .get(urlTaiKhoan, {
              params: {
                ten_tai_khoan: newItem.ten_tai_khoan,
              },
            })
            .then((res) => {
              alert("Đăng nhập thành công");
              $location.path("/trang-chu");
              $rootScope.login = "success";
              $rootScope.user = res.data[0];

              $http
                .get(urlGioHang, {
                  params: { ten_tai_khoan: $rootScope.user.ten_tai_khoan },
                })
                .then((res) => {
                  $rootScope.countCart = res.data.length;
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
});
