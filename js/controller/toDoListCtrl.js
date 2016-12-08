angular.module("toDoList", []).controller("toDoListCtrl", function ($scope) {

	var myScope = $scope;

	myScope.name = "To Do List";
	myScope.taskName = "Tarefa";
	myScope.percentCompletedTasks = 0;
	
	myScope.tasks = [
		{description:"Fazer o Lab"},
		{description:"Estudar"},
		{description:"Fazer exercícios"}
		];

	myScope.adicionarTarefa = function (task) {
		myScope.tasks.push(angular.copy(task));
		delete myScope.task;
	};
	myScope.removerTarefa = function (tasks) {
		myScope.tasks = tasks.filter(function (task) {
			if(!task.selectToRemove){
				return task;
			}
		});
	};
	myScope.taskToRemove = function (tasks) {
		return tasks.some(function (task) {
			return task.selectToRemove;
		});
	};

	myScope.calculateProgress = function() {
		
		var total = 0;
		
		for(var i=0; i < myScope.tasks.length; i++) {
				
			if(myScope.tasks[i].selectToComplete){
				total++;
			}
		}
		
		myScope.percentCompletedTasks = total / myScope.tasks.length * 100;
	};
});