(function(angular, window, documen, TheBlog, _){
    
    TheBlog.controller('BlogPost',
            
                ['$scope', '$routeParams', 'blogPosts',
        function ($scope,   $routeParams,   blogPosts) {
              
              $scope.post = {};
              
              function init(){
                  
                  var postId = $routeParams.postId;
                  
                  blogPosts.then(function(response){
                      $scope.post = _.find(response.data, function(post){
                          return (post.id == postId) ? post : null
                      });
                  });
              }
              
              init();
              
        }
        
    ]);
    
}(angular, window, document, TheBlog, _));