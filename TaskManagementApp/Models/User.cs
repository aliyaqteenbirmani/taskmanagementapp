using System.ComponentModel.DataAnnotations;

namespace TaskManagementApp.Models
{

    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastModifiedAt { get; set; }

        public bool IsDelete { get; set; } = false;
        public List<TaskItem> Tasks { get; set; }
    }
}
