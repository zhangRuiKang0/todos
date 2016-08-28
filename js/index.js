$(function () {
    $.setL=function (key,value) {
        localStorage[key]=JSON.stringify(value);
    };
    $.getL=function (key) {
        return JSON.parse(localStorage[key]);
    };
    //定好整个数据的存储方式
    var database=[];
    //var database=[
    //{id:1,name:'maiche',isDone:0},
    //{id:2,name:'maifang',isDone:1},
    //{id:3,name:'maixifu',isDone:0}
    //]
    
    //先看有没有存下的 如果有 都出来创建元素到页面上
    var render=function () {
        $('.todos').empty();
        for(var i=0;i<database.length;i++){
            var V=database[i];
            $('<li class="todo '+(V.isDone?'finish':'')+'" data-id="'+V.id+'"> <div class="check"></div> <p>'+V.name+'</p> <input type="text" value="'+V.name+'"> <div class="delete"></div> </li>')
                .appendTo('.todos');
        }
    };
    if(localStorage['data']){
        database=$.getL('data');
        render();
    };

    
    //新增
    var hinput=$('.header input');
    hinput.on('keyup',function (e) {
        if(e.keyCode==13){
            var v=$(this).val().trim();
            if(v==''){
                return;
            };
            if(database.length===0){
               var id=1;
            }else{
               var id=database[database.length-1].id+1;
            }
            database.push(
                {id:id,name:v,isDone:0}
            );
            $.setL('data',database);
            render();
            $(this).val('').focus();
        }
    });
       console.table(database);
    //完成
    $('.todos').on('click','.todo .check',function () {
        var li=$(this).closest('li');
        li.toggleClass('finish');
        var id=parseInt(li.attr('data-id'));
        if(li.hasClass('finish')){
            var x=1;
        }else{
            var x=0;
        };
        for(var i=0;i<database.length;i++){
            if(database[i].id==id){
                database[i].isDone=x;
            };
        };
        $.setL('data',database);
    });
    //编辑
    $('.todos').on('dblclick','.todo',function () {
        $(this).addClass('bianji');
        $(this).find('input').val($(this).find('input').val()).focus();
    });

    $('.todos').on('blur','.todo input',function () {
        var li=$(this).closest('li');
        var id=parseInt(li.attr('data-id'));
        li.removeClass('bianji');
        li.find('p').text($(this).val());
        for(var i=0;i<database.length;i++){
            if(database[i].id==id){
                database[i].name=$(this).val();
            };
        };
        $.setL('data',database);
    });
    //删除
    $('.todos').on('click','.todo .delete',function () {
        var li=$(this).closest('li');
        var id=Number(li.attr('data-id'));
        li.remove();
        var newarr=[];
        for(var i=0;i<database.length;i++){
            if(database[i].id!==id){
                newarr.push(database[i]);
            };
        };
        database=newarr;
        $.setL('data',database);
    });
    //光标定位到input已有元素的后面
    // $('.header input').get(0).focus();
    $('.header input').val($('.header input').val()).focus();



})