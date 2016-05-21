/**
* .select2Buttons - Convert standard html select into button like elements
* Licensed under the MIT
**/

jQuery.fn.select2Buttons = function(options) {

    return this.each(function(){

        var $ = jQuery;
        var select = $(this);
        var multipleSelect = select.attr("multiple");

        var size = "";
        $(this).attr("data-size") && (size = " btn-" + $(this).attr("data-size"));

        var style = "btn-secondary";
        $(this).attr("data-style") && (style = " btn-" + $(this).attr("data-style"));

        select.hide();

        var btnGroupHtml = $('<div class="btn-group"></div>');
        var selectIndex = 0;
        
        var addOptGroup = function(optGroup){

            if (optGroup.attr('label')){
                btnGroupHtml.append('<p><strong>' + optGroup.attr('label') + '</strong></p>');
            }
            
            optGroup.children('option').each(function(){

                var buttonHtml = $('<a class="btn ' + style + size + '" href="#" data-select-index="' + selectIndex + '">' + $(this).html() + '</a>');

                if ($(this).attr('disabled') || select.attr('disabled')){
                    buttonHtml.addClass('disabled');
                }

                if((!options || !options.noDefault) && $(this).attr('selected')){
                    buttonHtml.addClass('active');
                }

                btnGroupHtml.append(buttonHtml);
                
                selectIndex++;
            });
        }

        var optGroups = select.children('optgroup');

        if (optGroups.length == 0) {
            addOptGroup(select);
        }else{
            optGroups.each(function(){
                addOptGroup($(this));
            });
        }

        select.after(btnGroupHtml);

        btnGroupHtml.find('a').click(function(e){

            e.preventDefault();
            var clickedOption = $(select.find('option')[$(this).attr('data-select-index')]);
            var clickedIndex = parseInt($(this).attr('data-select-index'));
            
            if(multipleSelect){
                if(clickedOption.attr('selected')){
                    $(this).removeClass('active');
                    clickedOption.removeAttr('selected');
                }else{
                    $(this).addClass('active');
                    clickedOption.attr('selected', 'selected');
                }
                var selections = [];
                select.children('option').each(function(){
                    if($(this).attr('selected')){
                        selections.push($(this).val());
                    }
                });
                select.val(selections);
            }else{
                btnGroupHtml.find('a').removeClass('active');
                $(this).addClass('active');
                select.children('option').each(function(index){
                    if (index != clickedIndex){
                        $(this).removeAttr('selected');
                    }
                });
                clickedOption.attr('selected', 'selected');
                select.val(clickedOption.val());
            }

            select.trigger('change');
        });
    });
};
