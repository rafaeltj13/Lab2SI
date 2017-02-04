angular.module("toDoList")

.controller("toDoListCtrl", function ($scope) {

	var myScope = $scope;

	myScope.name = "To Do List";
	myScope.taskName = "Tarefa";
	myScope.percentCompletedTasks = 0;

	myScope.taskList = [
		{
			description:"Fazer o Lab",
			tasks: [
					{
						taskDescription: "Front end",
						subTasks: [
							{subTaskDescription:"Html"},
							{subTaskDescription:"CSS"}
							]
					},
					{
						taskDescription:"Back end",
						subTasks: [
							{subTaskDescription:"Spring"}
						]
					}
			]
		},
		{
			description:"Estudar",
			tasks: [
					{
						taskDescription:"Estudar lógica",
						subTasks: [
							{subTaskDescription:"Proposicional"},
							{subTaskDescription:"Condicional"}
						]
					},
					{
						taskDescription:"Estudar SI",
						subTasks: [
							{subTaskDescription:"Angular"},
							{subTaskDescription:"Spring"}
						]
					}
			]
		}
	];

	myScope.addTaskList = function (taskListName) {
		var newTaskList = {description: taskListName, tasks: []};
		myScope.taskList.push(newTaskList);
		delete myScope.newTaskList.description;
	};

	myScope.addTask = function (task, list) {
		var newTask = {taskDescription: task, subTasks: []};
		list.tasks.push(newTask);
		//delete task.taskDescription;
	};

	myScope.addSubTask = function (subTask, task) {
		var newSubTask = {subTaskDescription:subTask};
		task.subTasks.push(newSubTask);
	};

	myScope.removeTaskList = function (taskListIndex){
		myScope.taskList.splice(taskListIndex, 1);
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
});