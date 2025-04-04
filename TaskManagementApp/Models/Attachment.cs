using TaskManagementApp.Models;

public class Attachment
{
    public Guid Id { get; set; }
    public string FileName { get; set; }
    public string FilePath { get; set; }
    public Guid TaskItemId { get; set; } // Foreign key

    // Navigation Property
    public TaskItem TaskItem { get; set; }
}
