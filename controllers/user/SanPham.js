app.controller("sanPhamCtrl", function ($scope, $http, $location) {
  var urlSanPham = "http://localhost:3000/san-pham";
  var urlDanhMuc = "http://localhost:3000/danh-muc";
  //Lấy danh sách sản phẩm
  $http
    .get(urlSanPham)
    .then((res) => {
      $scope.dsSanPham = res.data;
    })
    .catch((err) => console.log(err));
  //Lấy danh sách danh mục
  $http
    .get(urlDanhMuc)
    .then((res) => {
      $scope.dsDanhMuc = res.data;
    })
    .catch((err) => console.log(err));
  //Xem Chi tiết Sản Phẩm
  $scope.onClickXemChiTietSanPham = function (id) {
    $location.path(`/${id}/trang-chi-tiet`);
  };
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
  $scope.onClickTatCaDanhMuc = function () {
    $http
      .get(urlSanPham)
      .then((res) => {
        $scope.dsSanPham = res.data;
      })
      .catch((err) => console.log(err));
  };
});
