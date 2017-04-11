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
			$scope.showToast(response.data.message); //tell the use new product is created
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
	$scope.showToast = function(message){
		$mdToast.show(
			$mdToast.simple()
			.textContent(message)
			.hideDelay(3000)
			.position("top right")
			);
	}

	//read single product record

	$scope.readSingleRecord = function(id){
		//debugger;
		productsFactory.readSingleProduct(id).then(function successCallback(response){
			$scope.id = response.data.id;
			//debugger;
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
	
	//Retrieve data to update form

	$scope.showProductUpdateForm = function(id){
		productsFactory.readSingleProduct(id).then(function successCallback(response){			
			$scope.id = response.data.id;
			$scope.name = response.data.name;
			$scope.description = response.data.description;
			$scope.price = response.data.price;
console.log(response);
			$mdDialog.show({
				controller:DialogController,
				templateUrl : './app/products/update_products.template.html',
				parent: angular.element(document.body),
				targetEvent : event,
				clickOutsideToClose: true,
				scope: $scope,
				preserveScope: true,
				fullscreen: true
			}).then(
				function(){},
				function(){
					$scope.clearProductForm();
				}
			);
		},function errorCallback(response){
			$scope.showToast("Unable to retrieve data.");
		});
	}

	//Update Form
	$scope.updateProduct = function(){		
		productsFactory.updateProduct($scope).then(function successCallback(response){			
			$scope.showToast(response.data.message);
			$scope.readProducts();
			$scope.cancel();
			$scope.clearProductForm();
		},function errorCallback(response){
			$scope.showToast("Unable to update record");
		});
	}
	$scope.deleteProductController = function(event,id){
		$scope.id = id;
		var confirm = $mdDialog.confirm()
			.title('Are you sure to delete ?')
			.textContent('Product will be deleted')
			.targetEvent(event)
			.ok('Yes')
			.cancel('No');
		$mdDialog.show(confirm).then(
			//If yes delete product
			function(){
				$scope.deleteProduct();
			},
			//If not hide dialog box
			function(){

			});
	}
	$scope.deleteProduct = function(){
		productsFactory.deleteProductFactory($scope.id).then(function successCallback(response){
			$scope.showToast(response.data.message);
			$scope.readProducts();
		},function errorCallback(){
			$scope.showToast("Unable to Delete Product");
		});
	}
});