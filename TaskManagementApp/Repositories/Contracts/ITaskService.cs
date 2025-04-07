using TaskManagementApp.Models;

namespace TaskManagementApp.Repositories.Contracts
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllTasks();
        Task<TaskItem> GetTaskById(Guid id);
        Task AddTaskAsync(TaskItem task);
        Task UpdateTaskAsync(TaskItem task);
        Task DeleteTaskAsync(Guid id);

    }
}
