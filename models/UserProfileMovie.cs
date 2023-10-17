namespace MovieMatch.Models;

public class UserProfileMovie
{
  public int Id { get; set; }
  public int MovieId { get; set; }

  public Movie Movie { get; set; }
  public int UserProfileId { get; set; }
}