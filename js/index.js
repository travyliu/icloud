var reminder = angular.module('reminder',[]);
reminder.filter('search',function(){
	return function(e,key){
		var xx=function(items){
			for(var i=0;i<items.length;i++){
				if(items[i].title.indexOf(key)!=-1){
					return true;
				}
			}
			return false;
		}
		var r=[];
		for(var i=0;i<e.length;i++){
			if(e[i].name.indexOf(key)!=-1 || xx(e[i].items)){
				r.push(e[i]);
			}
		}
		return r;
	}
})
reminder.controller('rdCtrl', ['$scope', function($scope){
	//console.log(1)
	var d=localStorage.data;
	$scope.shijianliebiao=[];

	$scope.colors=['color1','color2','color3','color4','color5','color6','color7'];
	$scope.cindex = 0;
    $scope.countDone=function(){
    	var lis=$scope.shijianliebiao[$scope.cindex].items;
    	var r=0;
    	for(var i=0;i<lis.length;i++){
    		if(lis[i].isDone){
    			r+=1;
    		}
    	}
    	return r;
    };
	$scope.setItem = function(index) {
		$scope.cindex = index;
		$scope.key=null;  
	};

	$scope.addItem=function(){
		var data={
			name:'新列表'+($scope.shijianliebiao.length+1),
			color:$scope.colors[$scope.shijianliebiao.length%7],
			items:[]
		}
		$scope.shijianliebiao.push(data);
	};
      console.log($scope.shijianliebiao);
	 $scope.shijianliebiao=d?JSON.parse(d):[];
    $scope.clear=function(){
    	localStorage.clear();
    	location.reload();
    }
    $scope.deleteitem=function(){
    	var r=[];
    	for (var i = 0; i < $scope.shijianliebiao.length; i++) {
    		if(i!=$scope.cindex){
    			r.push($scope.shijianliebiao[i]);
    		}	
    	}
    	$scope.shijianliebiao=r;
    	$scope.cindex=0;
    	localStorage.data=JSON.stringify($scope.shijianliebiao);
    }
	$scope.addtodo=function(){
		var cu=$scope.shijianliebiao[$scope.cindex];
		var data={title:'新条目'+(cu.items,length+1),isDone:false};
		cu.items.push(data);
		localStorage.data=JSON.stringify($scope.shijianliebiao);
	}
	$scope.deletetodo=function(index){
		var r=[];
		var cu=$scope.shijianliebiao[$scope.cindex];
		for (var i = 0; i < cu.items.length; i++) {
			if(i!=index){
				r.push(cu.items[i]);
			}
		}
		$scope.shijianliebiao[$scope.cindex].items=r;
		localStorage.data=JSON.stringify($scope.shijianliebiao);
	}
	$scope.save=function(){
		localStorage.data=JSON.stringify($scope.shijianliebiao);
	}
}])