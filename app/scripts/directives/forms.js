'use strict';
dotHrApp.directive("directivemenu", function(commonResource, cacheResource, $rootScope, $compile) {
    return {
        scope: true,
        link: function(scope, element, attrs) {
            attrs.$observe('directivemenu', function(value) {
				//console.log('directivemenu --> value:',value );
                element.removeAttr('directivemenu');
                element.html(value );
                $compile(element.contents())(scope);
            });
        }
    }; 
});
