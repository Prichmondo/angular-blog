(function(angular, window, document, TheBlog){
    
    TheBlog
        .factory('blogCategories', ['$http',
            function($http){
                return $http({url:'../moks/categories.json'});
            }
        ])
        .factory('blogPosts', ['$http',
            function($http){
                return $http({url:'../moks/posts.json'});
            }
        ]);
        
})(angular, window, document, TheBlog);