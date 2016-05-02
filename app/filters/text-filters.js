(function(angular, window, document, TheBlog){
    
      TheBlog
        //Return a subset of words from an html text
        .filter('abstract', function() {
            return function(text) {
                
                var maxWords = 30,
                    regEx    = /(<([^>]+)>)/ig,
                    wordSet  = text.replace(regEx, " ").split(' '),
                    maxCount = (wordSet.length < maxWords) ? wordSet.length : maxWords,
                    abstract = "";
                
                for(var i=0; i<maxCount; i++){                    
                    var space = (i+1==maxCount) ? "" : " ";
                    abstract += wordSet[i] + space;
                }
                   
                return abstract + "...";
            }; 
        })
        
})(angular, window, document, TheBlog);