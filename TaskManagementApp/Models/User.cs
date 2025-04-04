using System.ComponentModel.DataAnnotations;

namespace TaskManagementApp.Models
{

    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LasttName { get; set; }
    }
}
