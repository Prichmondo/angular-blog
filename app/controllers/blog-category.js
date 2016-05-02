(function(angular, window, documen, TheBlog, _){
    
    TheBlog.controller('BlogCategory',
                ['$scope','$routeParams','blogCategories',
        function ($scope,  $routeParams,  blogCategories) {
            
            $scope.categoryId = $routeParams.categoryId;
            $scope.currentCategory = {};
            
            function getSelectedCategory(categories){
                $scope.currentCategory = _.find(categories, function(category){ 
                    return (category.id == $scope.categoryId) ? category : null;
                });
            }
            
            function init(){
                blogCategories.then(function(result){
                    getSelectedCategory(result.data);
                })
            }
            
            init();
                  
        }
        
    ]);
    
}(angular, window, document, TheBlog, _));