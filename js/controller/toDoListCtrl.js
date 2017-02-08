angular.module("toDoList")

.controller("toDoListCtrl", ['$scope', 'RestService', function ($scope, RestService) {

	var myScope = $scope;

	myScope.percentCompletedTasks = 0;
	myScope.taskList = {};
	generateTaskList();

	myScope.test = function(){
		myScope.percentCompletedTasks++;
	};

	myScope.checkTask = function (task){
	    if(task.completed){
	        return 'taskCompleted';
	    }else{
	        return 'taskOpen';
	    }
	};

	myScope.checkList = function (list){
        var validation = true;
        for(var i=0; i < list.tasks.length; i++) {
            if(!list.tasks[i].completed){
        	    validation = false;
      	    }
        }

        if(validation){
            return 'taskCompleted';
        }else{
            return 'taskOpen';
        }
    };

	function generateTaskList() {
		RestService.find('http://localhost:8080/listaTarefas', function(response) {
			myScope.taskList = response.data;
		});
	}

	myScope.addTaskList = function (taskListName) {
		var newTaskList = {description: taskListName, tasks: []};
		console.log(newTaskList);
		delete myScope.newTaskList.description;
		RestService.add('http://localhost:8080/listaTarefas', newTaskList, function(response) {
			generateTaskList();
		});
	};

	myScope.addTask = function (task, index, taskPriority) {
		var newTask = {
						taskDescription: task,
						subTasks: [],
						priority: taskPriority,
						completed: false,
						idTaskList: index
					};
		RestService.add('http://localhost:8080/tarefa', newTask, function(response) {
			generateTaskList();
		});
		delete task.taskDescription;
	};

	myScope.addSubTask = function (subTask, taskIndex, list) {
		var cont = 0;
		while (cont < myScope.taskList.length) {
			if(myScope.taskList[cont] === list){
				break;
			}
			cont++;
		}

		var subTask = {
						subTaskDescription: subTask,
						idTask: taskIndex,
						idTaskList: cont
					};
		RestService.add('http://localhost:8080/subTarefa', subTask, function(response) {
			generateTaskList();
		});
	};

	myScope.removeTaskList = function (taskListIndex){
		myScope.taskList.splice(taskListIndex, 1);
	};

	myScope.removeTask = function (taskIndex, taskList){
		taskList.tasks.splice(taskIndex, 1);
	};

	myScope.removeAll = function(){
		myScope.taskList = [];
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
		var completedTasks = 0;

		for(var i=0; i < myScope.taskList.length; i++) {
			for (var j = 0; j < myScope.taskList[i].tasks.length; j++) {
				
				if(myScope.taskList[i].tasks[j].completed){
					completedTasks++;
				}
				total++;
			}
		}
		myScope.percentCompletedTasks = completedTasks / total * 100;
	};
}]);