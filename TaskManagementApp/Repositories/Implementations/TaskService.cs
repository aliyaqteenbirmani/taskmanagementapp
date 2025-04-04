using Microsoft.EntityFrameworkCore;
using TaskManagementApp.Data;
using TaskManagementApp.Repositories.Contracts;

namespace TaskManagementApp.Repositories.Implementations
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;
        public TaskService(AppDbContext context)
        {
            _context = context ?? throw new ArgumentNullException();
        }
        public async Task AddTaskAsync(Task task)
        {
            await _context.AddAsync(task);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTaskAsync(Guid id)
        {
            var task = await _context.Tasks.FindAsync(id);
            _context.Remove(task);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Task>> GetAllTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<Task> GetTaskById(Guid id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task UpdateTaskAsync(Task task)
        {
            task.ModifiedDate = DateTime.UtcNow;
            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
