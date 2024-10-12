app.controller("listProductCtrl", function ($scope, $http, $location) {
  var urlSanPham = "http://localhost:3000/san-pham";
  var urlDanhMuc = "http://localhost:3000/danh-muc";
  //Lấy danh sách sản phẩm
  $http
    .get(urlSanPham)
    .then((res) => {
      $scope.dsSanPham = res.data;
    })
    .catch((err) => alert("Erorr: " + err.message));
  //Lấy danh sách danh mục
  $http
    .get(urlDanhMuc)
    .then((res) => ($scope.dsDanhMuc = res.data))
    .catch((err) => alert("Error: ".err));
  //Tạo hàm theo bắt sự kiện filter theo tên danh mục
  $scope.onClickDanhMuc = function (_tenDm) {
    $http
      .get(urlSanPham, {
        params: { danh_muc: _tenDm },
      })
      .then((res) => {
        $scope.dsSanPham = res.data;
      })
      .catch((err) => alert("Error: " + err.message));
  };
  //Tất cả sản phẩm
  $scope.onClickAllSanPham = function () {
    $http
      .get(urlSanPham)
      .then((res) => {
        $scope.dsSanPham = res.data;
      })
      .catch((err) => alert("Erorr: " + err.message));
  };
  //Xóa sản phẩm
  $scope.onClickXoaSanPham = function (_ID) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm " + _ID + " không?")) {
      $http.delete(`${urlSanPham}/${_ID}`).then((res) => {
        $scope.dsSanPham = res.data;
      });
    }
  };
  //Form Thêm Sản Phẩm
  $scope.onClickFormAddSanPham = function () {
    $location.path("/admin/san-pham/tao-moi-san-pham");
  };
  //Form Sửa Sản Phẩm
  $scope.onClickFormEditSanPham = function (id) {
    $location.path(`/admin/san-pham/${id}/sua-san-pham`);
  };
  $scope.onClickXemSanPham = function (id) {
    $location.path(`/admin/san-pham/${id}/xem-san-pham`);
  };
  // Xem sản phẩm
  // $scope.onClickXemSanPham = function (_ID) {
  //   $location.path(`/san-pham/${_ID}/xem-san-pham`);
  // };
  // var currentPath = $location.path();
  // if (currentPath === "/san-pham/:id/xem-san-pham") {
  //   var idsp = $routeParams.id;

  //   $http
  //     .get(`${urlSanPham}/${idsp}`)
  //     .then((res) => ($scope.spChiTiet = res.data));
  // }
  // $http
  //   .get(`${urlSanPham}/1`)
  //   .then((res) => ($scope.spChiTiet = res.data));
});
