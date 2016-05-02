(function(angular, window, document, TheBlog){
    TheBlog   
        .config(
                    ['$routeProvider', '$httpProvider', '$locationProvider',
            function( $routeProvider,   $httpProvider,   $locationProvider) {
                
            $routeProvider
                .when('/', {
                    templateUrl : '../app/views/blog-home.html'
                })
                .when('/category/:categoryId', {
                    templateUrl : '../app/views/blog-category.html'
                })
                .when('/category/:categoryId/post/:postId', {
                    templateUrl : '../app/views/blog-post.html'
                })
                .otherwise({
                    redirectTo  : '/'
                });
                    
            }
        ]);

        
})(angular, window, document, TheBlog);