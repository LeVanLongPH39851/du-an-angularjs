app.controller("addCategoryCtrl", function ($scope, $http, $location) {
  var urlDanhMuc = "http://localhost:3000/danh-muc";
  $scope.onClickAddDanhMuc = function () {
    var newItem = {
      ...$scope.inputValue,
    };
    if (newItem.id === undefined) {
      alert("Không được để trống id");
    } else if (newItem.ten_danh_muc === undefined) {
      alert("Không được để trống tên danh mục");
    } else if (newItem.anh_mo_ta === undefined) {
      alert("Không được để trống ảnh danh mục");
    } else {
      $http
        .post(urlDanhMuc, newItem)
        .then((res) => {
          alert("Thêm thành công");
          $location.path("/admin/danh-muc/danh-sach-danh-muc");
        })
        .catch((err) => console.log(err));
    }
  };
});
