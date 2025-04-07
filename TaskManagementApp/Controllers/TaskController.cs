using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TaskItem task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _taskService.AddTaskAsync(task);
            return Ok();
        }


        [HttpGet]
        public async Task<IActionResult> GetAllTask()
        {
            var allTask = await _taskService.GetAllTasks();
            return Ok(allTask);
        }
    }
}
