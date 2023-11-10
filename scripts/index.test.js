//Collection of tests to be performed
import { equal, test } from './test-helpers.js'
/*
test('Submitting a new task adds it to the list', async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      const inputField = document.querySelector('.addTaskField');
      const addTaskButton = document.querySelector('.addTaskButton');
      const taskList = document.querySelector('#listToDo');

      inputField.value = 'Task Create Test';
      addTaskButton.click();
   
      const addedTask = taskList.lastElementChild;
      const taskText = addedTask.querySelector('.taskText').value;

      equal(taskText.trim(), 'Task Create Test');

      inputField.value = '';
      resolve(); // Resolve the promise after the test completes
     
    }, 100);
  });
});
*/
/*
test('Adding a task using Enter', async () => {
  await new Promise((resolve) => {
    setTimeout(() => {

      console.group('Adding a task using Enter');

      const inputField = document.querySelector('.addTaskField')
      const taskList = document.querySelector('#listToDo')

      inputField.value = 'Task Create with Enter Test'
      // Simulate pressing the Enter key
      const enterKeyEvent = new KeyboardEvent('keypress', { key: 'Enter' })
      inputField.dispatchEvent(enterKeyEvent)

      const addedTask = taskList.lastElementChild
      const taskText = addedTask.querySelector('.taskText').value

      equal(taskText.trim(), 'Task Create with Enter Test')

      inputField.value = ''

      resolve() // Resolve the promise after the test completes
      console.groupEnd('Adding a task using Enter')
    }, 100)
  })
})
*/
/*
test('Creating a new group adds it to the group list', async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.group('Creating a new group adds it to the group list')

      // Corrected the selector to use ID instead of class
      const createGroupButton = document.querySelector('#createGroupButton')
      const groupList = document.querySelector('.groupsContainer')
      
      createGroupButton.click()
      const addedGroup = groupList.lastElementChild // Get the last group element added
      // Set the group name
      const groupTitleInput = addedGroup.querySelector('.groupTitle')
      groupTitleInput.value = 'Test Group'

      //Check
      const testGroup = groupList.lastElementChild
      const testgroupTitleInput = testGroup.querySelector('.groupTitle')
      const groupName = testgroupTitleInput.value
      equal(groupName.trim(), 'Test Group')
      resolve() // Resolve the promise after the test completes
      console.groupEnd('Creating a new group adds it to the group list')
    }, 100);
  });
});
*/
/*
test('Sending a task to completed moves it to the completed section', async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.group('Sending a task to completed moves it to the completed section')

      // Step 1: Create a new task
      const inputField = document.querySelector('.addTaskField')
      const addTaskButton = document.querySelector('.addTaskButton')
      inputField.value = 'Task for Completion Test'
      addTaskButton.click()

      setTimeout(() => {
        // Step 2: Find and click the 'send to complete' button for the new task
        const taskList = document.querySelector('#listToDo')
        const newTask = taskList.lastElementChild
        const moveToCompletedButton = newTask.querySelector('.moveToCompleted')
        moveToCompletedButton.click()

        setTimeout(() => {
          // Step 3: Check if the task is now in the completed section
          const completedList = document.querySelector('#completedList')
          const completedTask = completedList.lastElementChild

          // Adjust this line based on the actual structure of the completed task
          const completedTaskText = completedTask ? completedTask.textContent.trim() : null

          equal(completedTaskText.trim(), 'Task for Completion Test')

          inputField.value = '' // Clean up

          resolve()

          console.groupEnd('Sending a task to completed moves it to the completed section')
        }, 100)
      }, 100)
    }, 100)
  })
}) */


test('Dragging a task from one group to another moves it correctly', async () => {
  await new Promise((resolve) => {
    setTimeout(async () => {
      console.group('Dragging a task from one group to another');

      // Step 1: Identify the first two groups
      const groups = document.querySelectorAll('.tasksContainer');
      const firstGroup = groups[0];
      const secondGroup = groups[1];

      // Step 2: Add a task to the first group
      const inputFieldFirstGroup = firstGroup.querySelector('.addTaskField');
      const addTaskButtonFirstGroup = firstGroup.querySelector('.addTaskButton');
      inputFieldFirstGroup.value = 'Task to Move';
      addTaskButtonFirstGroup.click();

      setTimeout(() => {
        // Step 3: Simulate drag-and-drop
        const taskItem = firstGroup.querySelector('.taskItem');

        // Check if the taskItem is found
        if (!taskItem) {
          console.error('Task item not found in the first group.');
          return;
        }

        // Set the task item ID
        const taskId = 'task-to-move';
        taskItem.id = taskId;

        // Simulate dragstart event on the taskItem
        const dragStartEvent = new DragEvent('dragstart', {
          dataTransfer: new DataTransfer(),
        });
        dragStartEvent.dataTransfer.setData('text/plain', taskId);
        taskItem.dispatchEvent(dragStartEvent);

        // Simulate dragover event on the second group
        const dragOverEvent = new Event('dragover', { bubbles: true });
        secondGroup.dispatchEvent(dragOverEvent);

        // Simulate drop event on the second group
        const dropEvent = new DragEvent('drop', {
          dataTransfer: dragStartEvent.dataTransfer,
        });
        secondGroup.dispatchEvent(dropEvent);

        setTimeout(() => {
          // Step 4: Verify that the task is in the second group
          const movedTask = secondGroup.querySelector(`#${taskId}`);

          // Check if the movedTask is found
          if (!movedTask) {
            console.error('Task item not found in the second group after drop.');
            return;
          }

          const movedTaskText = movedTask.querySelector('.taskText').value.trim();
          equal(movedTaskText, 'Task to Move');

          resolve(); // Resolve the promise after the test completes

          console.groupEnd('Dragging a task from one group to another');
        }, 100);
      }, 1000); // Made it extra long to see the task moving
    }, 200);
  });
});