using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagementApp.Dto;
using TaskManagementApp.Models;
using TaskManagementApp.Repositories.Contracts;

namespace TaskManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        private string GetUserId()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedAccessException("User Id Not found in token");
            }
            return userId;
        }

        [Authorize]
        [HttpPost("add-task")]
        public async Task<IActionResult> Post([FromBody] TaskItemDto task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var UserId = Guid.Parse(userId);
            var taskItem = new TaskItem
            {
                Title = task.Title,
                Description = task.Description,
                Status = 0,
                IsDeleted = false,
                UserId = UserId
            };
            await _taskService.AddTaskAsync(taskItem);
            return Ok(new {message="Task is added successfully."});
        }


        [HttpGet("get-all-tasks")]
        public async Task<IActionResult> GetAllTask()
        {
            var allTask = await _taskService.GetAllTasks();
            return Ok(allTask);
        }

        [HttpGet("get-task")]
        [Authorize]
        public async Task<IActionResult> GetTasks()
        {
            try
            {
                var userIdClaim = GetUserId();

                Guid myGuid = Guid.Parse(userIdClaim);

                var tasks = await _taskService.GetTaskById(myGuid);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask([FromBody] TaskItem updateTask)
        {
            var userID = GetUserId();
            var task = await _taskService.UpdateTaskAsync(updateTask);
            return Ok(task);
        }

        [HttpDelete("delete-task")]
        public async Task<IActionResult> DeleteTask(Guid taskId)
        {
            var userID = GetUserId();
            await _taskService.DeleteTaskAsync(taskId);
            return Ok(new {message="Task is deleted successfully!"});
        }
    }
}
