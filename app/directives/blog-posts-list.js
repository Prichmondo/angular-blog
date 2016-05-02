(function(angular, window, document, TheBlog, _){
    TheBlog
    .directive('blogPostsList', function(){
        return {
            restrict: 'A',
            controllerAs: 'posts',
            templateUrl: 'app/views/blog-posts-list.html',            
            controller: 
                    ['$scope', '$routeParams', '$q', 'blogPosts', 'blogCategories', 
            function($scope,    $routeParams,   $q,   blogPosts,   blogCategories){
                
                var currentCategoryId = (angular.isUndefined($routeParams.categoryId)) ? 0 : $routeParams.categoryId;
                
                var posts = [];
                var categories = [];
                
                $scope.loading = true;
                $scope.posts = [];
                $scope.openPost = openPost;
                
                //Filters the posts acording to the selected section 
                function getFilteredPosts(){
                    
                    var filteredPosts = [];
            
                    for (var i = 0; i < posts.length; i++) {
                        
                        var post = posts[i];
                        var postCategory = _.find(categories, function(category){
                            return (category.id==post.category_id) ? category : null;
                        });
                        
                        //If the category exists and is active
                        if(angular.isDefined(postCategory) && postCategory.is_active){
                            
                            if(currentCategoryId!=0){
                                //Category Post
                                if(post.is_active == true && post.category_id == currentCategoryId)
                                    filteredPosts.push(post);
                                    
                            } else {
                                //Fetured Post
                                if(post.is_active == true && post.is_featured == true)
                                    filteredPosts.push(post);
                                    
                            }
                        }
                    }
                    
                    return filteredPosts;
                }
                
                function openPost(post){
                    location.href = "/#/category/"+ post.category_id + "/post/" + post.id;
                }
                
                function init(){
                    
                    $q.all({
                        posts      : blogPosts,
                        categories : blogCategories
                    }).then(
                        function(results){
                            posts = results.posts.data;
                            categories = results.categories.data;
                            $scope.posts = getFilteredPosts();
                            $scope.loading = false;                            
                        },
                        function(){
                            $scope.error = "Service not available, try again later.";
                            $scope.loading = false;
                        }
                    );
                    
                }
                
                init();

            }]
        };
    });
    
})(angular, window, document, TheBlog, _);