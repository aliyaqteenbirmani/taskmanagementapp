using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using TaskManagementApp.Data;
using TaskManagementApp.Models;
using TaskManagementApp.Repositories.Contracts;

namespace TaskManagementApp.Repositories.Implementations
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task LoginUser(LoginDto loginDto)
        {
            //var userExist = await _context.Users.
        }
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
            if ( user is null)
            {
                throw new Exception($"This email {email} is not found");
            }
             return user;
        }

        public async Task<User> GetUserById(Guid id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user is null)
            {
                throw new Exception($"User not found");
            }
            return user;
        }

        public async Task RegisterUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User> IsUserAlreadyExist(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
            
        }


    }
}
