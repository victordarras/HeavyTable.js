(function($) {
  $.fn.heavyTable = function(params) {

    params = $.extend( {
      startPosition: {
        x: 1,
        y: 1
      }
    }, params);

    this.each(function() {
      var 
        $hTable = $(this).find('tbody'),
        i = 0,
        x = params.startPosition.x,
        y = params.startPosition.y,
        max = {
          y: $hTable.find('tr').length,
          x: $hTable.parent().find('th').length
        };
        
      //console.log(xMax + '*' + yMax);
      
      function clearCell () {    
        content = $hTable.find('.selected input').val();
        $hTable.find('.selected').html(content);
        $hTable.find('.selected').toggleClass('selected');
      }

      function selectCell () {
        if ( y > max.y ) y = max.y;
        if ( x > max.x ) x = max.x;
        if ( y < 1 ) y = 1;
        if ( x < 1 ) x = 1;
        currentCell = 
         $hTable
            .find('tr:nth-child('+(y)+')')
            .find('td:nth-child('+(x)+')');
        content = currentCell.html();
        currentCell
          .toggleClass('selected')
        return currentCell;
      }
      
      function edit (currentElement, input, opts) {
        $(input, opts})
          .appendTo(currentCell)
          .val(content)
          .focus(); 
      }

      $hTable.find('td').dblclick( function () {
        clearCell();
        edit(selectCell());
      });

      $hTable.find('td').click( function () {
        clearCell();
        x = ($hTable.find('td').index(this) % (max.x) + 1);
        y = ($hTable.find('tr').index($(this).parent()) + 1);
        selectCell();
      });

      $(document).keydown(function(e){
        if (e.keyCode == 13) {
          clearCell();
          edit(selectCell());
        } else if (e.keyCode >= 37 && e.keyCode <= 40  ) {

          clearCell();
          switch (e.keyCode) {
            case 37: xPosition--;
            break;
            case 38: yPosition--;
            break;
            case 39: xPosition++;
            break;
            case 40: yPosition++;
            break;
          }
          selectCell();
          return false;
        }
      }); 
    });
  };
})(jQuery);
