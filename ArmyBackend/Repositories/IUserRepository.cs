namespace ArmyBackend.Data.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task AddUserAsync(User user);
        void UpdateUser(User user);
        void DeleteUser(int id);
        Task SaveChangesAsync();
        Task<User> GetUserByUsernameAsync(string username);
    }
}
