using System.Text.Json.Serialization;

namespace TaskManagementApp.Models
{
    public class TaskItem
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public TaskStatus Status { get; set; } = TaskStatus.New;

        public bool IsDeleted { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public Guid UserId { get; set; }
        [JsonIgnore]

        public User User { get; set; }
        [JsonIgnore]
        public List<Attachment> Attachments { get; set; } = new List<Attachment>();
        [JsonIgnore]

        public List<Comment> Comments { get; set; } = new List<Comment> { };
        public void UpdateModifiedDate() => ModifiedDate = DateTime.UtcNow;
    }
}
