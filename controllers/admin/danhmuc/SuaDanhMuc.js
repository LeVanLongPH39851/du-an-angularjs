app.controller(
  "editCategoryCtrl",
  function ($scope, $http, $location, $routeParams) {
    var urlDanhMuc = "http://localhost:3000/danh-muc";
    var id = $routeParams.id;
    $http
      .get(`${urlDanhMuc}/${id}`)
      .then((res) => {
        $scope.inputValue = {
          id: res.data.id,
          ten_danh_muc: res.data.ten_danh_muc,
          anh_mo_ta: res.data.anh_mo_ta,
        };
      })
      .catch((err) => console.log(err));
    $scope.onClickCapNhatDanhMuc = function () {
      var updateItem = {
        ...$scope.inputValue,
      };
      if (updateItem.id === "") {
        alert("Không được để trống id");
      } else if (updateItem.ten_danh_muc === "") {
        alert("Không được để trống tên danh mục");
      } else if (updateItem.anh_mo_ta === "") {
        alert("Không được để trống ảnh danh mục");
      } else {
        $http
          .put(`${urlDanhMuc}/${id}`, updateItem)
          .then((res) => {
            alert("Cập nhật thành công");
            $location.path("/admin/danh-muc/danh-sach-danh-muc");
          })
          .catch((err) => console.log(err));
      }
    };
  }
);
