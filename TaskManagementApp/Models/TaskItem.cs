namespace TaskManagementApp.Models
{
    public class TaskItem
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public TaskStatus Status { get; set; } = TaskStatus.Pending;
        public int UserId { get; set; }
        public User User { get; set; }
        public List<Attachment> Attachments { get; set; } = new List<Attachment>();
        public List<Comment> Comments { get; set; } = new List<Comment> { };
        public enum TaskStatus
        {
            Pending,
            InProgress,
            Completed
        }
    }
}
