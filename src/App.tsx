import './App.css'
import {Task} from "./model/Task.tsx";
import _LocalStorage from "./util/LocalStorage.tsx";
import TaskRow from "./component/TaskRow.tsx";


function App() {
    const tasks : Task[] | null = _LocalStorage.loadTasks()

  return (
      <div className="main">
          <h1>Todo List</h1>
          {
              tasks === null &&
                  <div className="no-tasks">
                      <span>You do not currently have any tasks saved, click the button below to add a new task</span>
                  </div>
          }
          {
              tasks !== null &&
              tasks.map(task => (
                <TaskRow task={ task } key={ task.id } />
              ))
          }
      </div>
  )
}

export default App
