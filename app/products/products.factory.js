app.factory("productsFactory",function($http){
	var factory= {};
	factory.readProducts = function(){
		return $http({
			method : 'GET',
			url : 'http://localhost/codeofaninja_api/product/read.php'
		});
	};

	//Create Product Factory
	factory.createProducts = function($scope){
		return $http({
			method : "POST",
			data : {
				'name' : $scope.name,
				'description' : $scope.description,
				'price' : $scope.price,
				'category_id' : 1
			},
			url : 'http://localhost/codeofaninja_api/product/create.php'
		});
	};

	//Read Single record
	factory.readSingleProduct = function(id){
		console.log("id :" + id);
		return $http({
			method : 'GET',
			url : 'http://localhost/codeofaninja_api/product/readSinglerecord.php?id='+id
		});
	};
	
	//Update  Product
	factory.updateProduct = function($scope){

		return $http({
			method: "POST",
			data : {
				'id':$scope.id,
				'name' : $scope.name,
				'description' : $scope.description,
				'price' : $scope.price,
				'category_id' : 1
			},
			url: 'http://localhost/codeofaninja_api/product/updateRecord.php'
		});
	}

	//delete products
	factory.deleteProductFactory = function(id){
		console.log("deleteProductFactory id: " + id);
		return $http({
			method : 'POST',
			data : {
				'id':id,
			},
			url : 'http://localhost/codeofaninja_api/product/deleteRecord.php'
		});
	}
	return factory;
});