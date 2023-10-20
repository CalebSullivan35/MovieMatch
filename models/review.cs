using System.ComponentModel.DataAnnotations;

namespace MovieMatch.Models;

public class Review
{
  public int Id { get; set; }
  public int UserProfileId { get; set; }
  public UserProfile UserProfile { get; set; }
  public int MatchingMovieInteger { get; set; }
  public Movie Movie { get; set; }
  
  [Range(0, 5)]
  public decimal Rating { get; set; }
  public string Content { get; set; }
  public DateTime DateAdded { get; set; }
}