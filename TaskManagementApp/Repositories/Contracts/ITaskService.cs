namespace TaskManagementApp.Repositories.Contracts
{
    public interface ITaskService
    {
        Task<IEnumerable<Task>> GetAllTasks();
        Task<Task> GetTaskById(Guid id);
        Task AddTaskAsync(Task task);
        Task UpdateTaskAsync(Task task);
        Task DeleteTaskAsync(Guid id);

    }
}
