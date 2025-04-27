using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TaskManagementApp.Data;
using TaskManagementApp.Models;
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

        public async Task AddTaskAsync(TaskItem task)
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

        public async Task<IEnumerable<TaskItem>> GetAllTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<List<TaskItem>> GetTaskById(Guid id)
        {
            var taskList = await _context.Tasks.Where(t => t.UserId == id && !t.IsDeleted).ToListAsync();
            return taskList;
        }

        public async Task<TaskItem> UpdateTaskAsync(TaskItem task)
        {

            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return await _context.Tasks.FindAsync(task.Id);
        }
    }
}
