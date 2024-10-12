app.controller("detailCategoryCtrl", function ($scope, $http, $routeParams) {
  var ten = $routeParams.ten;
  var urlSanPham = "http://localhost:3000/san-pham";
  $http
    .get(urlSanPham, { params: { danh_muc: ten } })
    .then((res) => ($scope.dsSanPham = res.data))
    .catch((err) => console.log(err));
});
