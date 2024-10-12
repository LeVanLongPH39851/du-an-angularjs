app.controller(
  "editProductCtrl",
  function ($scope, $http, $routeParams, $location) {
    var urlSanPham = "http://localhost:3000/san-pham";
    var urlDanhMuc = "http://localhost:3000/danh-muc";
    var editId = $routeParams.id;
    //Lấy danh sách danh mục
    $http
      .get(urlDanhMuc)
      .then((res) => ($scope.dsDanhMuc = res.data))
      .catch((err) => alert("Error: ".err));
    $http
      .get(`${urlSanPham}/${editId}`)
      .then((res) => {
        $scope.sanpham = res.data;
        var alBum = res.data.album_anh_ct.join(",");
        $scope.inputValue = {
          id: res.data.id,
          anh_mo_ta: res.data.anh_mo_ta,
          gia: res.data.gia,
          tuong: res.data.tuong,
          trang_phuc: res.data.trang_phuc,
          rank: res.data.rank,
          ngoc_90: res.data.ngoc_90,
          mo_ta: res.data.mo_ta,
          danh_muc: res.data.danh_muc,
          album_anh_ct: alBum,
        };
      })
      .catch((err) => alert("Error: " + err));
    $scope.onClickCapNhatSanPham = function () {
      var updateItem = { ...$scope.inputValue };
      if (updateItem.id === "") {
        alert("Không được để trống id");
      } else if (updateItem.anh_mo_ta === "") {
        alert("Không được để trống ảnh");
      } else if (updateItem.album_anh_ct === "") {
        alert("Không được để trống album ảnh chi tiết");
      } else if (updateItem.gia === "") {
        alert("Không được để trống giá");
      } else if (updateItem.tuong === "") {
        alert("Không được để trống tướng");
      } else if (updateItem.trang_phuc === "") {
        alert("Không được để trống trang phục");
      } else if (updateItem.rank === "") {
        alert("Không được để trống rank");
      } else if (updateItem.ngoc_90 === "") {
        alert("Không được để trống ngọc");
      } else if (updateItem.mo_ta === "") {
        alert("Không được để trống mô tả");
      } else if (updateItem.danh_muc === "") {
        alert("Không được để trống danh mục");
      } else {
        updateItem.album_anh_ct = updateItem.album_anh_ct.split(",");
        $http
          .put(`${urlSanPham}/${editId}`, updateItem)
          .then((res) => {
            alert("Sửa thành công");
            $location.path("/admin/san-pham/danh-sach-san-pham");
          })
          .catch((err) => alert("Error: " + err));
      }
    };
  }
);
