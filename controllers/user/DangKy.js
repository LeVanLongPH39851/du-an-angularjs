app.controller("dangKyCtrl", function ($scope, $http, $location) {
  var urlTaiKhoan = "http://localhost:3000/tai-khoan";
  $scope.onClickDangKy = function () {
    var newItem = {
      ...$scope.inputValue,
      vai_tro: "user",
    };
    var newConfirm = {
      ...$scope.confirm,
    };
    $http
      .get(urlTaiKhoan)
      .then((res) => {
        var check = false;
        if (newItem.ten_tai_khoan !== undefined) {
          for (var i in res.data) {
            if (newItem.ten_tai_khoan === res.data[i].ten_tai_khoan) {
              var check = true;
            }
          }
        }
        if (
          newItem.ten_tai_khoan === undefined ||
          newItem.ten_tai_khoan === ""
        ) {
          alert("Không được để trống tên tài khoản");
        } else if (check) {
          alert("Tên tài khoản này đã có người sử dụng");
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
        } else if (newConfirm.xac_nhan_mat_khau === undefined) {
          alert("Không được để trống xác nhận mật khẩu");
        } else if ($scope.confirm.xac_nhan_mat_khau !== newItem.mat_khau) {
          alert("Xác nhận mật khẩu không chính xác");
        } else {
          $http
            .post(urlTaiKhoan, newItem)
            .then((res) => {
              if (confirm("Bạn đã đăng ký thành công, Bấn OK để đăng nhập")) {
                $location.path("/dang-nhap");
              }
            })
            .catch((err) => alert("Error:" + err));
        }
      })
      .catch((err) => console.log(err));
  };
});
