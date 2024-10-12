app.controller("detailProductCtrl", function ($scope, $http, $routeParams) {
  var urlSanPham = "http://localhost:3000/san-pham";
  var detailId = $routeParams.id;
  $http
    .get(`${urlSanPham}/${detailId}`)
    .then((res) => {
      $scope.detail = res.data;
      console.log($scope.detail);
    })
    .catch((err) => alert("Error: " + err));
});
