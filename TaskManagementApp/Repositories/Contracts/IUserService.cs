using TaskManagementApp.Models;

namespace TaskManagementApp.Repositories.Contracts
{
    public interface IUserService
    {
        Task RegisterUser(User user);
        Task LoginUser(LoginDto user);
        Task<User> GetUserByEmail(string email);
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserById(Guid id);
        Task<User> IsUserAlreadyExist(string email);

    }
}
