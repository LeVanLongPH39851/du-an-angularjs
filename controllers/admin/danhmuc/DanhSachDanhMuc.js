app.controller("listCategoryCtrl", function ($scope, $http, $location) {
  var urlDanhMuc = "http://localhost:3000/danh-muc";
  //Lấy danh sách danh mục
  $http
    .get(urlDanhMuc)
    .then((res) => ($scope.dsDanhMuc = res.data))
    .catch((err) => console.log(err));
  //Form add danh mục
  $scope.onClickFormAddDanhMuc = function () {
    $location.path("/admin/danh-muc/tao-moi-danh-muc");
  };
  $scope.onClickFormEditDanhMuc = function (id) {
    $location.path(`/admin/danh-muc/${id}/sua-danh-muc`);
  };
  $scope.onClickXemDanhMuc = function (ten) {
    $location.path(`/admin/danh-muc/${ten}/xem-danh-muc`);
  };
  $scope.onClickXoaDanhMuc = function (id) {
    if (confirm("Bạn có chắc chắn xóa danh mục " + id + " không?")) {
      $http
        .delete(`${urlDanhMuc}/${id}`)
        .then((res) => {
          alert("Xóa thành công");
        })
        .catch((err) => console.log(err));
    }
  };
});
