namespace TaskManagementApp.Models
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid TaskitemId { get; set; }
        public TaskItem TaskItem { get; set; }
    }
}
