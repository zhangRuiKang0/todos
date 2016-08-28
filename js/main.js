var todo=angular.module('todo',['ngAnimate']);
todo.controller('mainCtrl',['$scope','$timeout',function ($scope,$timeout) {
    /*$scope.title='welcome music';
    $scope.huanbiaoti=function () {
      $scope.title='welcome todo';
    };
    $scope.musics=[
        {name:'a',zuozhe:'zhangruikang'},
        {name:'b',zuozhe:'zhangwenhui'},
        {name:'c',zuozhe:'zhangzhixing'},
        {name:'d',zuozhe:'wenxin'},
        {name:'e',zuozhe:'zhangsan'}
    ];
    $scope.delete=function (id) {
        $scope.musics.splice(id,1);
    };*/
    $scope.title='Todos';
    /*setInterval(function () {
        $timeout(function () {
            var date=new Date();
            var h=date.getHours();
            var m=date.getMinutes();
            var s=date.getSeconds();
            h=(h<10)?('0'+h):h;
            m=(m<10)?('0'+m):m;
            s=(s<10)?('0'+s):s;
            $scope.title=h+':'+m+':'+s;
        },0);
    },500);*/
    $scope.name='';
    //从本地储存中取数据
    if(localStorage.__x){
        $scope.todos=JSON.parse(localStorage.__x);
    }else{
        $scope.todos=[]; 
    };
        $scope.save=function () {
            localStorage.__x=JSON.stringify($scope.todos);
        };
    //清除函数
    $scope.clear=function () {
        var arr=[];
        for(var i=0;i<$scope.todos.length;i++){
            if(!$scope.todos[i].isDone){
                arr.push($scope.todos[i]);
            }
        }
        $scope.todos=arr;
       // $scope.count=$scope.todos.length;
    };
    //setcount
    /*$scope.setcount=function (type) {
        if(type==='quanbu'){
            $scope.count=$scope.todos.length;
        }else if(type==='wancheng'){
            var num=0;
            for(var i=0;i<$scope.todos.length;i++){
                if($scope.todos[i].isDone){
                    num++;
                }
            }
           $scope.count=num;
        }else if(type==='wancheng'){
            var num=0;
            for(var i=0;i<$scope.todos.length;i++){
                if(!$scope.todos[i].isDone){
                    num++;
                }
            }
            $scope.count=num;
        }

    };*/

    //添加
    $scope.add=function (e) {
        if(e.keyCode==13){
            if($scope.todos.length==0){
                var id=1;
            }else{
                var max=-Infinity;
                for(var i=0;i<$scope.todos.length;i++){
                    var value=$scope.todos[i];
                    if(value.id>max){
                        max=value.id;
                    };
                };
                var id=max+1;
            }
            $scope.todos.push({id:id,name:$scope.name,isDone:false});
            $scope.name='';
            //$scope.count=$scope.todos.length;
        };
    };
   // $scope.count=$scope.todos.length;
    //console.table($scope.todos);
    //删除
    $scope.delete=function (id) {
        var index;
        for(var i=0;i<$scope.todos.length;i++){
            if($scope.todos[i].id===id){
                index=i;
            };
        };
        $scope.todos.splice(index,1);
       // $scope.count=$scope.todos.length;
    };
    $scope.focus=function (e) {
        $timeout(function () {
            $(e.currentTarget).find('input').trigger('focus');
        },0);
    };
   /* $scope.addClass=function (e) {
        angular.element(e.srcElement).addClass('bianji')
    };*/
}]);