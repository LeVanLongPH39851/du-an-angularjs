app.controller(
  "editDonHangCtrl",
  function ($scope, $http, $routeParams, $location) {
    var urlDonHang = "http://localhost:3000/don-hang";
    var editId = $routeParams.id;

    $http
      .get(`${urlDonHang}/${editId}`)
      .then((res) => {
        $scope.donhang = res.data;
        $scope.inputValue = {
          id: res.data.id,
          ten_tai_khoan: res.data.ten_tai_khoan,
          so_dien_thoai: res.data.so_dien_thoai,
          email: res.data.email,
          dia_chi: res.data.dia_chi,
          tong_gia: res.data.tong_gia,
          trang_thai: res.data.trang_thai,
        };
      })
      .catch((err) => alert("Error: " + err));
    $scope.onClickUpdateDonHang = function () {
      var updateItem = { ...$scope.inputValue };
      $http
        .put(`${urlDonHang}/${editId}`, updateItem)
        .then((res) => {
          alert("Sửa thành công");
          $location.path("/admin/don-hang/danh-sach-don-hang");
        })
        .catch((err) => alert("Error: " + err));
    };
  }
);
