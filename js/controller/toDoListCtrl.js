angular.module("toDoList")

.controller("toDoListCtrl", ['$scope', 'RestService', function ($scope, RestService) {

	var myScope = $scope;

	myScope.name = "To Do List";
	myScope.taskName = "Tarefa";
	myScope.percentCompletedTasks = 0;
	myScope.taskList = {};
	generateTaskList();

	/*myScope.taskList = [
		{
			description:"Fazer o Lab",
			tasks: [
					{
						taskDescription: "Front end",
						subTasks: ["HTML","CSS"]
					},
					{
						taskDescription:"Back end",
						subTasks: ["Spring"]
					}
			]
		},
		{
			description:"Estudar",
			tasks: [
					{
						taskDescription:"Estudar lógica",
						subTasks: ["Proposicional","Condicional"]
					},
					{
						taskDescription:"Estudar SI",
						subTasks: ["Angular","Spring"]
					}
			]
		}
	];*/

	function generateTaskList() {
		RestService.find('http://localhost:8080/listaTarefas', function(response) {
			myScope.taskList = response.data;
			console.log(myScope.taskList[0]);
		});
	}

	myScope.addTaskList = function (taskListName) {
		var newTaskList = {description: taskListName};
		console.log(newTaskList);
		/*myScope.taskList.push(newTaskList);
		delete myScope.newTaskList.description;*/
		RestService.add('http://localhost:8080/listaTarefas', newTaskList, function(response) {
			generateTaskList();
		});
	};

	myScope.addTask = function (task, list) {
		var newTask = {taskDescription: task, subTasks: []};
		list.tasks.push(newTask);
		//delete task.taskDescription;
	};

	myScope.addSubTask = function (subTask, task) {
		task.subTasks.push(subTask);
	};

	myScope.removeTaskList = function (taskListIndex){
		//myScope.taskList.splice(taskListIndex, 1);
		RestService.delete('http://localhost:8080/listaDeTarefas/' + taskListIndex);
	};

	myScope.removeTask = function (taskIndex, taskList){
		taskList.tasks.splice(taskIndex, 1);
	};

	myScope.showTasks = function (taskIndex){
		myScope.taskList[taskIndex].show = !(myScope.taskList[taskIndex].show);
	};

	myScope.completeTask = function (task){
		task.completed = true;
	};

	myScope.openTask = function (task){
		task.completed = false;
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
}]);