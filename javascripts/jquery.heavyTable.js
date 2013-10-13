(function($) {
  $.fn.heavyTable = function(params) {

    params = $.extend( {
        xPosition: 1,
        yPosition: 1
    }, params);

    this.each(function() {
      var 
        $hTable = $(this).find('tbody'),
        i = 0,
        xPosition = params.xPosition,
        yPosition = params.yPosition,
        yMax = $hTable.find('tr').length ,
        xMax  = $hTable.parent().find('th').length,
        edition = '<input type="text" />',
        currentCell = 
         $hTable
            .find('tr:nth-child('+(yPosition)+')')
            .find('td:nth-child('+(xPosition)+')');

      //console.log(xMax + '*' + yMax);
      select();

      function clearCell () {    
        content = $('.selected input').val();
        $('.selected').html(content);
        $('.selected').toggleClass('selected');
      }

      function select () {
        if ( yPosition > yMax ) yPosition = yMax;
        if ( xPosition > xMax ) xPosition = xMax;
        if ( yPosition < 1 ) yPosition = 1;
        if ( xPosition < 1 ) xPosition = 1;
        currentCell = 
         $hTable
            .find('tr:nth-child('+(yPosition)+')')
            .find('td:nth-child('+(xPosition)+')');
        content = currentCell.html();
        currentCell
          .toggleClass('selected')
      }
      function edit () {
        currentCell
          .html(edition)
          .find('input')
          .val(content)
          .focus(); 
      }

      $hTable.find('td').dblclick( function () {
        clearCell();
        select();
        edit();
      });

      $hTable.find('td').click( function () {
        clearCell();
        xPosition = (
          $hTable.find('td').index(this) % (xMax) +1
          );
        yPosition = ( 
          $hTable.find('tr').index($(this).parent())+1
          );
        select();
      });

      $(document).keydown(function(e){

        if (e.keyCode == 13) {
          clearCell();
          select();
          edit();
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
          select();
          return false;
        }
      });
    });
  };
})(jQuery);