app.controller("addProductCtrl", function ($scope, $http, $location) {
  var urlSanPham = "http://localhost:3000/san-pham";
  var urlDanhMuc = "http://localhost:3000/danh-muc";
  //Lấy danh sách danh mục
  $http
    .get(urlDanhMuc)
    .then((res) => ($scope.dsDanhMuc = res.data))
    .catch((err) => alert("Error: ".err));
  //Thêm sản phẩm
  $scope.onClickAddSanPham = function () {
    var newItem = {
      ...$scope.inputValue,
    };
    if (newItem.id === undefined || newItem.id == "") {
      alert("Không được để trống id");
    } else if (newItem.anh_mo_ta === undefined || newItem.anh_mo_ta == "") {
      alert("Không được để trống ảnh");
    } else if ($scope.alBum === undefined || $scope.alBum.anh_ct === "") {
      alert("Không được để trống album ảnh chi tiết");
    } else if (newItem.gia === undefined || newItem.gia == "") {
      alert("Không được để trống giá");
    } else if (newItem.tuong === undefined || newItem.tuong == "") {
      alert("Không được để trống tướng");
    } else if (newItem.trang_phuc === undefined || newItem.trang_phuc == "") {
      alert("Không được để trống trang phục");
    } else if (newItem.rank === undefined || newItem.rank == "") {
      alert("Không được để trống rank");
    } else if (newItem.ngoc_90 === undefined || newItem.ngoc_90 == "") {
      alert("Không được để trống ngọc");
    } else if (newItem.mo_ta === undefined || newItem.mo_ta == "") {
      alert("Không được để trống mô tả");
    } else if (newItem.danh_muc === undefined || newItem.danh_muc == "") {
      alert("Không được để trống danh mục");
    } else {
      var alBumDetail = $scope.alBum.anh_ct.split(",");
      newItem.album_anh_ct = alBumDetail;
      $http
        .post(urlSanPham, newItem)
        .then((res) => {
          alert("Thêm thành công");
          $location.path("/admin/san-pham/danh-sach-san-pham");
        })
        .catch((err) => alert("Error:" + err));
    }
  };
});
