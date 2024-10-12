app.controller("trangChuCtrl", function ($scope, $http, $q, $location) {
  var urlDanhMuc = "http://localhost:3000/danh-muc";
  var urlSanPham = "http://localhost:3000/san-pham";
  var urlChiTietDonHang = "http://localhost:3000/chi-tiet-don-hang";
  //Lấy danh sách danh mục
  $http
    .get(urlDanhMuc)
    .then((res) => {
      $scope.dsDanhMuc = res.data;
    })
    .catch((err) => console.log(err));
  //Lấy danh sách sản phẩm mới nhất
  $http
    .get(urlSanPham)
    .then((res) => {
      $scope.dsSanPham = res.data;
    })
    .catch((err) => alert("Erorr: " + err.message));
  //Lấy số lượng sản phẩm trong danh mục
  var request1 = $http.get(urlDanhMuc);
  var request2 = $http.get(urlSanPham);
  $q.all([request1, request2])
    .then((res) => {
      $scope.countTaiKhoan = [];
      for (var i in res[0].data) {
        var count = 0;
        for (var j in res[1].data) {
          if (res[1].data[j].danh_muc == res[0].data[i].ten_danh_muc) {
            count += 1;
          }
        }
        $scope.countTaiKhoan.push(count);
      }
      var currentIndex = 0;
      $scope.soLuongTaiKhoan = function getNextElement() {
        var element = $scope.countTaiKhoan[currentIndex];
        currentIndex = (currentIndex + 1) % $scope.countTaiKhoan.length;
        return element;
      };
    })
    .catch((err) => console.log(err));
  //Xem Chi tiết Sản Phẩm
  $scope.onClickXemChiTietSanPham = function (id) {
    $location.path(`/${id}/trang-chi-tiet`);
  };
  $scope.onClickXemDanhMuc = function (ten) {
    $location.path(`/${ten}/xem-danh-muc-trang-chu`);
  };
});
