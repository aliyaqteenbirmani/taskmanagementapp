using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
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

        [HttpPost("add-task")]
        public async Task<IActionResult> Post([FromBody] TaskItem task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _taskService.AddTaskAsync(task);
            return Ok();
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
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if(string.IsNullOrEmpty(userIdClaim))
                {
                    return Unauthorized(new { message = " User ID not found in token" });
                }

                Guid myGuid = Guid.Parse(userIdClaim);

                var tasks = await _taskService.GetTaskById(myGuid);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
