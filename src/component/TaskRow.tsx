import {Task} from "../model/Task.tsx";

type TaskRowProps = {
    task: Task
}
export default function TaskRow({ task } : TaskRowProps) {
    return (
        <div className="task">
            <span className="text">{ task.text }</span>
        </div>
    )
}