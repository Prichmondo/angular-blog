(function(angular, window, document, TheBlog, _){
    
    TheBlog
    .directive('categoriesNav', function(){
        return {
            restrict: 'A',
            controllerAs: 'navigation',
            templateUrl: 'app/views/categories-nav.html',
            controller:            
                   ['$scope', '$routeParams', '$route', 'blogCategories',
            function($scope,   $routeParams,   $route,   blogCategories){
                
                //On page load, reload Route service in order to invoke '$routeChangeStart' event
                $route.reload();
                
                var allCategories = [];
                var currentCategory = {};
                
                $scope.currentCategoryId = 0;
                $scope.categories = [];
                $scope.categoryClick = categoryClick;
                
                //On route change, updates the menu status
                $scope.$on('$routeChangeStart',
                    function(e, currentRoute) {
                        var categoryId = currentRoute.params.categoryId;
                        $scope.currentCategoryId = angular.isUndefined(categoryId) ? 0 : categoryId; 
                    }
                );
                
                //Recursive Method, Gets the categories hierarchically nested
                function getCategories(parent, id){
                    
                    for(var i=0; i < allCategories.length; i++ ){
                        
                        var category = allCategories[i];
                        
                        if(category.is_active == true && category.parent_category_id == id){
                            
                            if(category.id == $scope.currentCategoryId)
                                currentCategory = category;
                                
                            category.children = [];
                            category.expanded = false;                            
                            getCategories(category.children, category.id);                                
                            parent.push(category);
                            
                        }
                    }                    
                }
                
                function categoryClick(category){
                    if(category.children.length>0)                        
                        category.expanded = (category.expanded) ? false : true;                        
                    else 
                        location.href = "/#/category/"+ category.id;
                    
                    return false;
                }
                
                function init(){
                    
                    blogCategories
                        .success(function(response){
                            allCategories = response;
                            getCategories($scope.categories, null);
                            
                            if($scope.currentCategoryId!=0 && currentCategory.parent_category_id != null){
                               var parentCategory = _.find($scope.categories, function(category){
                                  return  (category.id == currentCategory.parent_category_id)
                               });
                               if(parentCategory){
                                   parentCategory.expanded = true;
                               }    
                            }
                            
                        });
                }
                
                init();
                

            }]            
        };
    });
    
})(angular, window, document, TheBlog, _);