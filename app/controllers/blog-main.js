(function(angular, window, documen, TheBlog, _){
    
    TheBlog.controller('blogMain',
                ['$scope',
        function ($scope,  $routeParams,  blogCategories) {
            
            $scope.menuClosed = true;
            $scope.menuClick = menuClick;
            
            //On route change, updates the menu status
            $scope.$on('$routeChangeStart',
                function(e, currentRoute) {
                    $scope.menuClosed = true;
                }
            );
            
            function menuClick(){
                $scope.menuClosed = ($scope.menuClosed) ? false : true;
            }
                  
        }
        
    ]);
    
}(angular, window, document, TheBlog, _));