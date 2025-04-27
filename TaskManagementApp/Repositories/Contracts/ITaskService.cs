using TaskManagementApp.Models;

namespace TaskManagementApp.Repositories.Contracts
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllTasks();
        Task<List<TaskItem>> GetTaskById(Guid id);
        Task AddTaskAsync(TaskItem task);
        Task<TaskItem> UpdateTaskAsync(TaskItem task);
        Task DeleteTaskAsync(Guid id);

    }
}
