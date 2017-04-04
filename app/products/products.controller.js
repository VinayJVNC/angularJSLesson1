app.controller('productsController',function($scope,$mdDialog,$mdToast,productsFactory){
	$scope.readProducts = function(){
		productsFactory.readProducts().then(function successCallback(response){
			$scope.productList = response.data.records;
			console.log(response.data.records)
		},function errorCallback(response){
			$scope.showToast("Unable to read records");
		});
	}

	//Create Products Action
	$scope.createProductForm = function(event){
		$mdDialog.show({
			controller: DialogController,
			templateUrl: './app/products/create_product.template.html',
			parent: angular.element(document.body),
			targetEvent: event,
			clickOutsideToClose: true,
			scope: $scope,
			preserveScope: true,
			fullscreen: true
		});
	}

	//DialogController
	function DialogController($scope, $mdDialog){
		$scope.cancel = function(){
			$mdDialog.cancel();
		};
	}

	//Create New Product
	$scope.createProducts = function(){
		productsFactory.createProducts($scope).then(function successCallBack(response){
			$scope.showToast(response.data); //tell the use new product is created
			$scope.readProducts(); //refresh product list
			$scope.clearProductForm(); //Clear the form values 			
		},function errorCallback(response){
			$scope.showToast("Unable to create products");
		});
	}

	$scope.clearProductForm = function(){
		$scope.id = "";
		$scope.name = "";
		$scope.description = "";
		$scope.price = "";
	}
	$scope.showToast = function(){
		$mdToast.show(
			$mdToast.simple()
			.textContent(message)
			.hideDelay(3000)
			.position("top right")
			);
	}

	//read single product record

	$scope.readSingleRecord = function(id){
		debugger;
		productsFactory.readSingleProduct(id).then(function successCallback(response){
			$scope.id = response.data.id;
			debugger;
			$scope.name = response.data.name;
			$scope.description = response.data.description;
			$scope.price = response.data.price;

			$mdDialog.show({
				controller : DialogController,
				templateUrl : './app/products/readSingledata.template.html',
				parent : angular.element(document.body),
				targetEvent : event,
				clickOutsideToClose : true,
				scope : $scope,
				preserveScope : true,
				fullscreen : true
			}).then(
				function(){},

				function(){
					$scope.clearProductForm();
				}
			);

		},function errorCallback(response){
			$scope.showToast("Unable to retrieve record.");
		});
	}

	//Update Product form
});