﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography;
using System.Text;
using TaskManagementApp.Models;
using TaskManagementApp.Repositories.Contracts;
using TaskManagementApp.Services;

namespace TaskManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly TokenService _tokenService;
        public UserController(IUserService userService, TokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }


        [HttpPost("login-user")]
        public async Task<ActionResult<ResponseBody>> LoginUser([FromBody] LoginDto loginDto)
        {
            try
            {
                var userFromRepo = await _userService.GetUserByEmail(loginDto.Email);
                if (userFromRepo is null)
                {
                    return Unauthorized(new {message = "Invalid email or password"});
                }

                Console.WriteLine($"User ID: {userFromRepo.Id}\nUser FullName: {userFromRepo.FullName}");

                var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(userFromRepo.PasswordSalt));
                var computedHashPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password)).ToString();

                bool isPasswordValid = userFromRepo.PasswordHash.SequenceEqual(computedHashPass);
                if(!isPasswordValid)
                {
                    return Unauthorized(new { message = "Invalid Credentiala" });
                }
                var tokenString = _tokenService.GenerateToken(userFromRepo);

                Console.WriteLine($"Generated Token: {tokenString}");

                return Ok(new {name = userFromRepo.FullName,token = tokenString});

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpPost("register-user")]
        public async Task<IActionResult> UserRegistration(UserDto userDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            var exist = await _userService.IsUserAlreadyExist(userDto.Email);
            if(exist is not null)
            {
                return BadRequest("Email is Already Registered.");
            }
            var hmac = new HMACSHA256();
            var user = new User
            {
                FullName = userDto.FullName,
                Email = userDto.Email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password)).ToString(),
                PasswordSalt = hmac.Key.ToString(),
                CreatedAt = DateTime.UtcNow,
                LastModifiedAt = DateTime.UtcNow,
                IsDelete = false,
                Tasks = []
            };

            await _userService.RegisterUser(user);
            return Ok( new {message = "User is registered successfully." });
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUser()
        {
            var userFromService = await _userService.GetAllUsers();
            return Ok(userFromService);
        }

        //private async Task IsExist(string email)
        //{
        //    var isExist = await _userService.GetUserByEmail(email);

        //}
    }
}
