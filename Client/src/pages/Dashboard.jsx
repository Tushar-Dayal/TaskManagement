import { UserProfile } from "../components/UserProfile";
import { CreateTodo } from "../components/CreateTodo";
import { TodoList } from "../components/TodoList";
import { AccountActions } from "../components/AccountActions";


export default function Dashboard() {
return (
<div className="dashboard">
<UserProfile />
<CreateTodo onCreated={() => location.reload()} />
<TodoList />
<AccountActions />
</div>
);
}