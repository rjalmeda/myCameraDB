app.directive('draggable', function(){
    return{
        restrict: 'A',
        link: function(scope, element, attrs){
            element.draggable({
                revert: false,
                start: function(event,ui){
                    console.log(scope);
                    console.log(element);
                    console.log(attrs);
                    console.log(event);
                    console.log(ui);
                },
                stop: function(event, ui){
                    
                }
            })
        }
    }
});

app.directive('droppable', function($compile){
    return{
        restrict: 'A',
        link: function(scope, element, attrs){
            element.droppable({
                accept: ".gearboxItem",
                hoberClass: "drop-hover",
                drop: function(event, ui){
                    console.log(this);
                }
            })
        }
    }
});

app.directive('dblclickflip', function(){
    return{
        restrict: 'A',
        link: function(scope, element, attrs){
            element.on('dblclick', function(event){
                if(!element.hasClass('flipped')){
                    element.addClass('flipped');
                } else {
                    element.removeClass('flipped');
                }
                
            })
        }
    }
})