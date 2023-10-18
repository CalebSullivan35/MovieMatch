using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using MovieMatch.Models;
using Microsoft.AspNetCore.Identity;

namespace MovieMatch.Data;
public class MovieMatchDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<UserProfileMovie> UserProfileMovies { get; set; }

    public MovieMatchDbContext(DbContextOptions<MovieMatchDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
        });

    modelBuilder.Entity<Review>().HasData(new Review[]
    {
        new Review
        {
          Id =1,
          UserProfileId =1,
          MovideId = 926393,
          Rating = 4,
          Content = "Really Good Movie!"
        },
       new Review {
          Id =2,
          UserProfileId =1,
          MovideId = 968051,
          Rating = 1,
          Content = "Trash Movie!"
        },
       new Review {
          Id =3,
          UserProfileId =1,
          MovideId = 1008042,
          Rating = 2,
          Content = "Amazing! Good Movie!"
        },
       new Review {
          Id =4,
          UserProfileId =1,
          MovideId = 1151534,
          Rating = 3,
          Content = "Pooping! Good Movie!"
        },
    });

    modelBuilder.Entity<UserProfileMovie>().HasData(new UserProfileMovie[]
    {
      new UserProfileMovie
      {
        Id =1,
        MatchingMovieInteger = 926393,
        UserProfileId = 1,
      },
      new UserProfileMovie
      {
        Id =2,
        MatchingMovieInteger = 968051,
        UserProfileId = 1,
      },
      new UserProfileMovie
      {
        Id =3,
        MatchingMovieInteger = 1151534,
        UserProfileId = 1,
      }
    });
    }
}