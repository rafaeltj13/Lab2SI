angular.module("toDoList", []).controller("toDoListCtrl", function ($scope) {

	var myScope = $scope;

	myScope.name = "To Do List";
	myScope.taskName = "Tarefa";
	myScope.completedTasks = 0;
	//myScope.allTasks = myScope.tasks.length;
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
});